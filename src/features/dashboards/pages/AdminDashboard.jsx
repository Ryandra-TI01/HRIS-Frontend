// REFACTORED — AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";

// API
import {
  getEmployees,
  getAllAttendances,
  getAllLeaveRequests,
} from "../api/dashboard";

// Charts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);

  const [leaveChartData, setLeaveChartData] = useState([]);
  const [attendanceChartData, setAttendanceChartData] = useState([]);

  const [leaveRequestsToday, setLeaveRequestsToday] = useState([]);
  const [absentEmployees, setAbsentEmployees] = useState([]);

  // normalize API responses
  const normalize = (res) => {
    if (!res) return [];
    return Array.isArray(res?.data?.data)
      ? res.data.data
      : Array.isArray(res?.data)
      ? res.data
      : [];
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10);

      // ================= EMPLOYEES =================
      const empRes = await getEmployees({ per_page: 200 });
      const employees = normalize(empRes);

      setTotalEmployees(employees.length);

      // ================= LEAVES =================
      const leaveRes = await getAllLeaveRequests();
      const allLeaves = normalize(leaveRes);

      // Leave Requests Today
      const todayLeaves = allLeaves.filter((l) => {
        const start = l.start_date?.slice(0, 10);
        return start === todayStr;
      });

      setLeaveRequestsToday(todayLeaves);

      // Monthly Leave Chart
      const monthMap = {};
      allLeaves.forEach((l) => {
        const d = new Date(l.start_date);
        if (isNaN(d)) return;
        const m = d.toLocaleString("en-US", { month: "short" });
        monthMap[m] = (monthMap[m] || 0) + 1;
      });

      const leaveChart = Object.entries(monthMap).map(([month, leaves]) => ({
        month,
        leaves,
      }));

      setLeaveChartData(leaveChart);

      // ================= ATTENDANCE LAST 7 DAYS =================
      const att7 = normalize(await getAllAttendances({ last_days: 7 }));

      const grouped = {};

      att7.forEach((a) => {
        const date = a.date?.slice(0, 10);
        if (!date) return;
        grouped[date] = grouped[date] || 0;
        if (a.check_in_time) grouped[date] += 1;
      });

      const attendanceChart = Object.entries(grouped).map(
        ([date, checkedIn]) => ({
          date,
          checkedIn,
        })
      );

      setAttendanceChartData(attendanceChart);

      // ================= ABSENT EMPLOYEES TODAY =================
      const todayAttendance = normalize(
        await getAllAttendances({ date: todayStr })
      );

      const presentIDs = todayAttendance
        .filter((a) => a.check_in_time)
        .map((a) => a.employee_id);

      const absents = employees.filter((e) => !presentIDs.includes(e.id));

      setAbsentEmployees(absents);
    } catch (err) {
      console.error("Dashboard load error:", err);
    }
  };

  return (
    <div>
      <PageHeader>Admin Dashboard</PageHeader>

      {/* === DASHBOARD CARDS === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* Total Employees */}
        <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
          <h2 className="font-semibold text-sm mb-2">Total Employees</h2>
          <div className="text-4xl font-bold">{totalEmployees}</div>
          <p className="text-xs mt-2 text-muted-foreground">
            All active employees
          </p>
          <span className="inline-block px-3 py-1 mt-3 text-xs rounded-full bg-emerald-100 text-emerald-600">
            Active
          </span>
        </div>

        {/* Total Leave Requests */}
        <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
          <h2 className="font-semibold text-sm mb-2">Total Leave Requests</h2>
          <div className="text-4xl font-bold">{leaveRequestsToday.length}</div>
          <p className="text-xs mt-2 text-muted-foreground">
            All requests submitted today
          </p>
          <span className="inline-block px-3 py-1 mt-3 text-xs rounded-full bg-blue-100 text-blue-600">
            Requests
          </span>
        </div>

        {/* Pending Leave Requests */}
        <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
          <h2 className="font-semibold text-sm mb-2">Pending Leave Requests</h2>
          <div className="text-4xl font-bold">
            {leaveRequestsToday.filter((l) => l.status === "Pending").length}
          </div>
          <p className="text-xs mt-2 text-muted-foreground">
            Need your approval
          </p>
          <span className="inline-block px-3 py-1 mt-3 text-xs rounded-full bg-yellow-100 text-yellow-700">
            Pending
          </span>
        </div>
      </div>

      {/* ================== CHARTS ================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Monthly Leaves Chart */}
        <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
          <h3 className="font-semibold text-sm mb-2">
            Leave Requests (Monthly)
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={leaveChartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="leaves"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance (Last 7 Days) */}
        <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
          <h3 className="font-semibold text-sm mb-2">
            Daily Attendance (Last 7 Days)
          </h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={attendanceChartData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="checkedIn"
                stroke="#6366f1"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
