// REFACTORED — AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";

// API
import {
  getEmployees,
  getAllAttendances,
  getAllLeaveRequests,
} from "../api/dashboard";

// shadcn/ui
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

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
  const [loading, setLoading] = useState(false);

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [leaveChartData, setLeaveChartData] = useState([]);
  const [attendanceChartData, setAttendanceChartData] = useState([]);

  const [leaveRequestsToday, setLeaveRequestsToday] = useState([]);
  const [absentEmployees, setAbsentEmployees] = useState([]);

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
      setLoading(true);

      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10);

      // ===== EMPLOYEES =====
      const empRes = await getEmployees({ per_page: 200 });
      const employees = normalize(empRes);
      setTotalEmployees(employees.length);

      // ===== LEAVES =====
      const leaveRes = await getAllLeaveRequests();
      const allLeaves = normalize(leaveRes);

      const todayLeaves = allLeaves.filter(
        (l) => l.start_date?.slice(0, 10) === todayStr
      );

      setLeaveRequestsToday(todayLeaves);

      // MONTHLY CHART
      const monthMap = {};
      allLeaves.forEach((l) => {
        const d = new Date(l.start_date);
        if (isNaN(d)) return;
        const m = d.toLocaleString("en-US", { month: "short" });
        monthMap[m] = (monthMap[m] || 0) + 1;
      });

      setLeaveChartData(
        Object.entries(monthMap).map(([month, leaves]) => ({
          month,
          leaves,
        }))
      );

      // ===== ATTENDANCE LAST 7 DAYS =====
      const att7 = normalize(await getAllAttendances({ last_days: 7 }));

      const grouped = {};
      att7.forEach((a) => {
        const date = a.date?.slice(0, 10);
        if (!date) return;
        grouped[date] = grouped[date] || 0;
        if (a.check_in_time) grouped[date]++;
      });

      setAttendanceChartData(
        Object.entries(grouped).map(([date, checkedIn]) => ({
          date,
          checkedIn,
        }))
      );
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader>Admin Dashboard</PageHeader>

      {loading && <Loading />}

      {/* ===== TOP CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground mt-2">
              All active employees
            </p>
            <span className="inline-block px-3 py-1 mt-3 text-xs rounded-full bg-emerald-100 text-emerald-700">
              Active
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Leave Requests Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {leaveRequestsToday.length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Requests submitted today
            </p>
            <span className="inline-block px-3 py-1 mt-3 text-xs rounded-full bg-blue-100 text-blue-700">
              Requests
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {leaveRequestsToday.filter((l) => l.status === "Pending").length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Waiting for approval
            </p>
            <span className="inline-block px-3 py-1 mt-3 text-xs rounded-full bg-yellow-100 text-yellow-700">
              Pending
            </span>
          </CardContent>
        </Card>
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* LEAVE REQUESTS CHART */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Leave Requests (Monthly)</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* ATTENDANCE (7 DAYS) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              Daily Attendance (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
