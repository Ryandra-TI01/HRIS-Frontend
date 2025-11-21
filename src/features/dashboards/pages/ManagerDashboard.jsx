import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";

import {
  getEmployees,
  getAllAttendances,
  getAllPerformanceReviews,
} from "../api/dashboard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const normalizeArray = (res) => {
  if (!res) return [];

  if (Array.isArray(res?.data?.data)) return res.data.data;

  if (Array.isArray(res?.data)) return res.data;

  if (Array.isArray(res)) return res;
  return [];
};

const hhmmToDecimal = (val) => {
  if (!val) return 0;
  if (typeof val === "number") return val;
  const s = String(val).trim();
  if (!s) return 0;

  if (s.includes(":")) {
    const parts = s.split(":").map(Number);
    const h = parts[0] || 0;
    const m = parts[1] || 0;
    return h + m / 60;
  }

  const n = Number(s);
  return isNaN(n) ? 0 : n;
};

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(false);

  // filters
  const [filterType, setFilterType] = useState("weekly");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");

  // data
  const [teamMembers, setTeamMembers] = useState([]);
  const [attendanceChartData, setAttendanceChartData] = useState([]);
  const [avgWorkHours, setAvgWorkHours] = useState(0);

  const [teamReviews, setTeamReviews] = useState([]);
  const [avgTeamStars, setAvgTeamStars] = useState(0);

  // debugging logs in console to help trace issues
  useEffect(() => {
    console.log("ManagerDashboard mounted, filterType:", filterType);
  }, []);

  // derive params for attendances endpoint based on filter
  const attendanceParams = useMemo(() => {
    const params = {};
    if (filterType === "weekly") {
      params.last_days = 7;
    } else if (filterType === "monthly") {
      params.last_days = 30;
    } else if (filterType === "range") {
      if (rangeStart) params.start_date = rangeStart;
      if (rangeEnd) params.end_date = rangeEnd;
    }
    return params;
  }, [filterType, rangeStart, rangeEnd]);

  useEffect(() => {
    loadDashboard();
  }, [filterType, rangeStart, rangeEnd]);

  async function loadDashboard() {
    setLoading(true);
    try {
      console.log("LOADING MANAGER DASHBOARD...");

      const empRes = await getEmployees({ per_page: 500 });
      const allEmployees = normalizeArray(empRes);
      console.log("RAW EMPLOYEES FROM API:", allEmployees);

      const user = (() => {
        try {
          return JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          return null;
        }
      })();
      console.log("DETECTED USER:", user);

      const myEmployeeRecord = allEmployees.find(
        (e) => e.user && user && e.user.id === user.id
      );
      console.log("DETECTED MANAGER EMPLOYEE ROW:", myEmployeeRecord);

      let managerEmployeeId = myEmployeeRecord?.id;
      if (!managerEmployeeId && user?.email) {
        const alt = allEmployees.find((e) => e.user?.email === user.email);
        managerEmployeeId = alt?.id;
        if (alt) console.log("Found manager employee by email:", alt);
      }

      if (!managerEmployeeId) {
        console.warn(
          "⚠️ Manager employee id not found — dashboard will show global/filterless results for debugging."
        );
      }

      const team = managerEmployeeId
        ? allEmployees.filter(
            (e) => e.manager && e.manager.id === managerEmployeeId
          )
        : allEmployees.slice(0, 50);

      console.log("TEAM MEMBERS:", team);
      setTeamMembers(team);

      const teamEmployeeIds = team.map((t) => t.id);
      console.log("TEAM EMPLOYEE IDS:", teamEmployeeIds);

      const attRes = await getAllAttendances(attendanceParams);
      const allAtt = normalizeArray(attRes);
      console.log("RAW ATTENDANCES API RESPONSE:", allAtt);

      const teamAtt = allAtt.filter((a) => {
        const empId =
          a.employee?.id ?? a.employee_id ?? a.employee_id_raw ?? null;
        return managerEmployeeId ? teamEmployeeIds.includes(empId) : true;
      });

      console.log("FILTERED TEAM ATTENDANCES:", teamAtt);

      const grouped = {};
      teamAtt.forEach((a) => {
        const rawDate = String(a.date || a.attendance_date || "").slice(0, 10);
        if (!rawDate) return;
        const hours = hhmmToDecimal(
          a.work_hour || a.work_hours || a.workHour || "0:00"
        );
        grouped[rawDate] = grouped[rawDate] || [];
        grouped[rawDate].push(hours);
      });

      const chart = Object.entries(grouped)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .map(([date, arr]) => ({
          date,
          avgHours: Number(
            (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(2)
          ),
        }));

      setAttendanceChartData(chart);
      console.log("ATTENDANCE CHART DATA:", chart);

      const weeklyAllHours = teamAtt.map((a) =>
        hhmmToDecimal(a.work_hour || a.work_hours || "0:00")
      );
      const avgWeekly =
        weeklyAllHours.length === 0
          ? 0
          : Number(
              (
                weeklyAllHours.reduce((s, v) => s + v, 0) /
                weeklyAllHours.length
              ).toFixed(2)
            );
      setAvgWorkHours(avgWeekly);
      console.log("AVG WORK HOURS:", avgWeekly);

      const rvRes = await getAllPerformanceReviews();
      const allRv = normalizeArray(rvRes);
      console.log("RAW REVIEWS:", allRv);

      const teamRv = allRv.filter((r) => {
        const empId = r.employee?.id ?? r.employee_id ?? null;
        return managerEmployeeId ? teamEmployeeIds.includes(empId) : true;
      });

      const mapped = teamRv.map((r) => ({
        id: r.id,
        employeeName:
          r.employee?.name ||
          r.employee?.user?.name ||
          r.employee_name ||
          r.employee_name_raw ||
          "-",
        period: r.period,
        total_star: r.total_star || 0,
        reviewerName: r.reviewer?.name || r.reviewer_name || "-",
      }));

      setTeamReviews(mapped);

      // avg rating
      const stars = mapped.map((m) => Number(m.total_star || 0));
      const avgStars =
        stars.length === 0
          ? 0
          : Number(
              (stars.reduce((a, b) => a + b, 0) / stars.length).toFixed(2)
            );
      setAvgTeamStars(avgStars);
      console.log("AVG TEAM STARS:", avgStars);

      console.log("Manager dashboard load complete.");
    } catch (err) {
      console.error("Manager Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader>Manager Dashboard</PageHeader>
      Filters
      <div className="mt-6 flex items-center gap-3">
        <label className="text-sm">Filter:</label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 rounded bg-white dark:bg-slate-800"
        >
          <option value="weekly">Weekly (default)</option>
          <option value="monthly">Monthly (30 days)</option>
          <option value="range">Custom range</option>
        </select>

        {filterType === "range" && (
          <>
            <input
              type="date"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              className="px-3 py-2 rounded bg-white dark:bg-slate-800"
            />
            <input
              type="date"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              className="px-3 py-2 rounded bg-white dark:bg-slate-800"
            />
          </>
        )}

        <div className="ml-auto text-sm text-muted-foreground">
          {loading ? "Loading..." : "Ready"}
        </div>
      </div>
      {/* Stats + Chart */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
          <h4 className="text-sm font-semibold mb-2">Avg Work Hours</h4>
          <div className="text-3xl font-bold">{avgWorkHours}h</div>
          <div className="text-xs text-muted-foreground mt-2">
            Rata-rata jam kerja tim
          </div>
        </div>

        <div className="md:col-span-2 border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
          <h4 className="text-sm font-semibold mb-2">
            Team Attendance — Avg Work Hours
          </h4>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.06} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgHours"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Team Performance */}
      <div className="mt-10 border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
        <h4 className="text-sm font-semibold mb-3">Team Performance</h4>

        <div className="mb-4">
          <span className="text-lg">Average Team Rating: </span>
          <span className="text-emerald-500 font-semibold">
            {avgTeamStars} ★
          </span>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Employee</th>
              <th className="py-2 text-left">Period</th>
              <th className="py-2 text-left">Total Star</th>
              <th className="py-2 text-left">Reviewer</th>
            </tr>
          </thead>
          <tbody>
            {teamReviews.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 text-muted-foreground"
                >
                  No performance review data
                </td>
              </tr>
            ) : (
              teamReviews.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-2">{r.employeeName}</td>
                  <td className="py-2">{r.period}</td>
                  <td className="py-2">{r.total_star} ★</td>
                  <td className="py-2">{r.reviewerName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
