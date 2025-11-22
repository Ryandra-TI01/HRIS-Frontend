// src/features/dashboard/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";

import SummaryCards from "../components/SummaryCard";
import WorkHoursChart from "../components/WorkHoursChart";
import LeavesChart from "../components/LeavesChart";

import {
  getMyAttendances,
  getMyLeaveRequests,
  getMyPerformanceReviews,
  getEmployees,
} from "../api/dashboard";

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
        const payload = aRes.value?.data ?? aRes.value ?? [];
        setAttendances(
          Array.isArray(payload) ? payload : payload.data ?? []
        );
      }

      if (lRes.status === "fulfilled") {
        const payload = lRes.value?.data ?? lRes.value ?? [];
        setLeaves(Array.isArray(payload) ? payload : payload.data ?? []);
      }

      if (rRes.status === "fulfilled") {
        const payload = rRes.value?.data ?? rRes.value ?? [];
        setReviews(Array.isArray(payload) ? payload : payload.data ?? []);
      }

      if (eRes.status === "fulfilled") {
        const payload = eRes.value?.data ?? eRes.value ?? {};
        setEmployees(
          Array.isArray(payload) ? payload : payload.data ?? []
        );
      }
    } catch (err) {
      console.error("Failed loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== STATS COMPUTATION =====
  const totalHoursMonth = attendances.reduce((sum, item) => {
    const numericHour =
      typeof item.work_hour === "number"
        ? item.work_hour
        : parseFloat(String(item.work_hour).replace(":", "."));
    return sum + (isNaN(numericHour) ? 0 : numericHour);
  }, 0);

  const avgHours =
    attendances.length > 0
      ? (totalHoursMonth / attendances.length).toFixed(2)
      : null;

  const leavesTaken = leaves.filter(
    (l) =>
      l.status === "Approved" ||
      l.status === "accepted" ||
      l.status === "approved"
  ).length;

  const leavesPending = leaves.filter(
    (l) => l.status === "Pending" || l.status === "pending"
  ).length;

  // Work chart
  const workChartData = attendances.map((a) => ({
    date: (a.date || "").slice(0, 10),
    hours: Number(
      Number(
        typeof a.work_hour === "string"
          ? a.work_hour.replace(":", ".")
          : a.work_hour
      ) || 0
    ),
  })).slice(-20);

  // Leaves chart
  const leavesByMonth = {};
  leaves.forEach((l) => {
    const d = new Date(l.start_date || l.created_at || null);
    if (!isNaN(d)) {
      const m = d.toLocaleString("en-US", { month: "short" });
      leavesByMonth[m] = (leavesByMonth[m] || 0) + 1;
    }
  });

  const leavesChartData = Object.keys(leavesByMonth).map((month) => ({
    month,
    leaves: leavesByMonth[month],
  }));

  const stats = {
    totalHoursMonth: totalHoursMonth.toFixed(2),
    avgHours,
    leavesTaken,
    leavesPending,
    lastUpdated:
      attendances.length > 0
        ? attendances[0].updated_at ||
          attendances[0].created_at ||
          ""
        : "",
  };

  return (
    <div>
      <PageHeader>Employee Dashboard</PageHeader>
      {loading && <Loading />}

      {/* SUMMARY CARDS */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Monthly Summary</CardTitle>
            <CardDescription>
              Ringkasan performa dan kehadiran bulan ini
            </CardDescription>
          </CardHeader>

          <CardContent>
            <SummaryCards stats={stats} />
          </CardContent>
        </Card>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Work Hours (Last 20 days)</CardTitle>
            <CardDescription>Hours logged each day</CardDescription>
          </CardHeader>
          <CardContent>
            <WorkHoursChart data={workChartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leaves (Monthly)</CardTitle>
            <CardDescription>
              Distribution of leave requests by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeavesChart data={leavesChartData} />
          </CardContent>
        </Card>
      </div>

      {/* PERFORMANCE STATS */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Your performance record summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            Performance reviews (mine):{" "}
            <span className="font-semibold">
              {reviews?.length ?? 0}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
