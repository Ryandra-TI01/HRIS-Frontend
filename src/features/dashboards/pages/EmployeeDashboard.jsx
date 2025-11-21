// src/features/dashboard/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import SummaryCards from "../components/SummaryCard";
import WorkHoursChart from "../components/WorkHoursChart";
import LeavesChart from "../components/LeavesChart";
import {
  getMyAttendances,
  getMyLeaveRequests,
  getMyPerformanceReviews,
  getEmployees,
} from "../api/dashboard";

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(false);
  const [attendances, setAttendances] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [aRes, lRes, rRes, eRes] = await Promise.allSettled([
        getMyAttendances(),
        getMyLeaveRequests(),
        getMyPerformanceReviews(),
        getEmployees({ per_page: 1 }),
      ]);

      if (aRes.status === "fulfilled") {
        // normalize response: backend shapes vary
        const payload = aRes.value?.data ?? aRes.value ?? [];
        const arr = Array.isArray(payload) ? payload : payload.data ?? payload;
        setAttendances(arr);
      }

      if (lRes.status === "fulfilled") {
        const payload = lRes.value?.data ?? lRes.value ?? [];
        const arr = Array.isArray(payload) ? payload : payload.data ?? payload;
        setLeaves(arr);
      }

      if (rRes.status === "fulfilled") {
        const payload = rRes.value?.data ?? rRes.value ?? [];
        const arr = Array.isArray(payload) ? payload : payload.data ?? payload;
        setReviews(arr);
      }

      if (eRes.status === "fulfilled") {
        const payload = eRes.value?.data ?? eRes.value ?? {};
        const arr = Array.isArray(payload) ? payload : payload.data ?? payload.data ?? [];
        setEmployees(arr);
      }
    } catch (err) {
      console.error("Failed loading dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  // compute simple stats
  const totalHoursMonth = attendances.reduce((sum, item) => {
    // item.work_hour might be "07:22" or numeric; try numeric parse
    const w = typeof item.work_hour === "number" ? item.work_hour : parseFloat(String(item.work_hour).replace(",", "."));
    return sum + (isNaN(w) ? 0 : w);
  }, 0);

  const avgHours = attendances.length ? (totalHoursMonth / attendances.length).toFixed(2) : null;

  const leavesTaken = leaves.filter(l => l.status === "Approved" || l.status === "accepted" || l.status === "approved").length;
  const leavesPending = leaves.filter(l => l.status === "Pending" || l.status === "pending").length;

  // prepare chart data
  const workChartData = (attendances || []).map(a => ({
    date: (a.date || "").slice(0,10),
    hours: Number(Number(typeof a.work_hour === "string" ? a.work_hour.replace(":", ".") : a.work_hour) || 0)
  })).slice(-20); // last 20

  // leaves by month
  const leavesByMonth = {};
  (leaves || []).forEach(l => {
    const d = new Date(l.start_date || l.created_at || l.start || null);
    if (isNaN(d)) return;
    const m = d.toLocaleString("en-US", { month: "short" });
    leavesByMonth[m] = (leavesByMonth[m] || 0) + 1;
  });
  const leavesChartData = Object.keys(leavesByMonth).map(k => ({ month: k, leaves: leavesByMonth[k] }));

  const stats = {
    totalHoursMonth: totalHoursMonth.toFixed(2),
    avgHours,
    leavesTaken,
    leavesPending,
    lastUpdated: attendances.length ? (attendances[0].updated_at || attendances[0].created_at || "") : "",
  };

  return (
    <div>
      <PageHeader>Employee Dashboard</PageHeader>

      <div className="mt-4">
        <SummaryCards stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <WorkHoursChart data={workChartData} />
        <LeavesChart data={leavesChartData} />
      </div>

      <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <h3 className="font-semibold mb-2">Quick stats</h3>
        <div>Performance reviews (mine): {reviews?.length ?? 0}</div>
      </div>
    </div>
  );
}
