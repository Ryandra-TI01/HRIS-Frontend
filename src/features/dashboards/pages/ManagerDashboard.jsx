import React, { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Loading from "@/components/Loading";

// API
import {
  getAllAttendances,
  getAllPerformanceReviews,
} from "../api/dashboard";

// shadcn ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// utils
const normalize = (res) => {
  if (!res) return [];
  if (Array.isArray(res?.data?.data)) return res.data.data;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
};

const hhmmToDecimal = (val) => {
  if (!val || typeof val !== "string") return 0;
  const [h, m] = val.split(":").map(Number);
  return h + m / 60;
};

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(false);

  const [attendanceChartData, setAttendanceChartData] = useState([]);
  const [avgWorkHours, setAvgWorkHours] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [avgStars, setAvgStars] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      // ===== ATTENDANCES =====
      const attRes = await getAllAttendances();
      const allAtt = normalize(attRes);

      const hoursArray = allAtt.map(a =>
        hhmmToDecimal(a.work_hour || "0:00")
      );

      const avg =
        hoursArray.length === 0
          ? 0
          : Number(
              (
                hoursArray.reduce((sum, v) => sum + v, 0) /
                hoursArray.length
              ).toFixed(2)
            );

      setAvgWorkHours(avg);

      // GROUPED FOR CHART
      const grouped = {};
      allAtt.forEach((a) => {
        const date = a.date?.slice(0, 10);
        if (!date) return;

        grouped[date] = grouped[date] || [];
        grouped[date].push(hhmmToDecimal(a.work_hour || "0:00"));
      });

      const chart = Object.entries(grouped).map(([date, arr]) => ({
        date,
        avgHours: Number(
          (arr.reduce((s, v) => s + v, 0) / arr.length).toFixed(2)
        ),
      }));

      setAttendanceChartData(chart);

      // ===== PERFORMANCE REVIEWS =====
      const rvRes = await getAllPerformanceReviews();
      const allRv = normalize(rvRes);

      const mapped = allRv.map((r) => ({
        id: r.id,
        employeeName: r.employee?.name || "-",
        reviewerName: r.reviewer?.name || "-",
        period: r.period,
        total_star: r.total_star || 0,
      }));

      setReviews(mapped);

      const starArr = mapped.map(r => Number(r.total_star));
      const avgStar =
        starArr.length === 0
          ? 0
          : Number(
              (starArr.reduce((a, b) => a + b, 0) / starArr.length).toFixed(2)
            );

      setAvgStars(avgStar);
    } catch (err) {
      console.error("Manager Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader>Manager Dashboard</PageHeader>

      {loading && <Loading />}

      {/* =========================== */}
      {/* AVG WORK HOURS */}
      {/* =========================== */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg Work Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgWorkHours}h</div>
            <p className="text-xs text-muted-foreground mt-2">
              Rata-rata jam kerja seluruh karyawan
            </p>
          </CardContent>
        </Card>

        {/* CHART */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm">
              Attendance — Avg Work Hours per Day
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      {/* =========================== */}
      {/* PERFORMANCE REVIEW */}
      {/* =========================== */}
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-sm">Performance Reviews</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            <span className="text-lg font-semibold">Average Rating: </span>
            <span className="text-emerald-500">{avgStars} ★</span>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Total Star</TableHead>
                <TableHead>Reviewer</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-4"
                  >
                    No performance review data
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.employeeName}</TableCell>
                    <TableCell>{r.period}</TableCell>
                    <TableCell>{r.total_star} ★</TableCell>
                    <TableCell>{r.reviewerName}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
