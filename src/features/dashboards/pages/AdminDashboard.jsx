import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { useEffect, useState } from "react";
import { getAdminDashboard } from "../api/dashboard";

import { DashboardStatCard } from "../components/DashboardStatCard";
import { DashboardBarChart } from "../components/DashboardBarChart";
import { DashboardAreaChart } from "../components/DashboardAreaChart";

import Loading from "../../../components/Loading";
import PageHeader from "../../../components/PageHeader";

import { Users, UserCheck, Clock, CalendarDays } from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [employeeOverview, setEmployeeOverview] = useState(null);
  const [attendanceOverview, setAttendanceOverview] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getAdminDashboard();
      const data = res.data;

      setEmployeeOverview(data.employee_overview);
      setAttendanceOverview(data.attendance_overview);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/admin/dashboard">Admin Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Content */}
      {loading ? (
        <Loading />
      ) : (
        <section className="space-y-12">
          {/* SECTION 1 — EMPLOYEE OVERVIEW */}
          <section>
            <PageHeader>Employee Overview</PageHeader>

            <div className="grid grid-cols-2 gap-4">
              <DashboardStatCard
                title="Total Employees"
                value={employeeOverview?.cards?.total_employees}
                icon={Users}
                accent="text-indigo-500"
              />

              <DashboardStatCard
                title="Active Users"
                value={employeeOverview?.cards?.active_users}
                icon={UserCheck}
                accent="text-emerald-500"
              />
            </div>

            <div className="mt-6">
              <DashboardBarChart
                title="Employee Growth"
                description="Total employees per month"
                data={employeeOverview?.chart_employees_per_month}
                xKey="month"
                dataKey="count"
                color="#6366F1"
              />
            </div>
          </section>

          {/* SECTION 2 — ATTENDANCE OVERVIEW */}
          <section>
            <PageHeader>Attendance Overview</PageHeader>

            <div className="grid grid-cols-2 gap-4">
              <DashboardStatCard
                title="Attendance Records Today"
                value={attendanceOverview?.cards?.attendance_records_today}
                icon={CalendarDays}
                accent="text-blue-500"
              />

              <DashboardStatCard
                title="Average Work Hours (This Month)"
                value={attendanceOverview?.cards?.average_work_hours_this_month}
                icon={Clock}
                accent="text-purple-500"
              />
            </div>

            <div className="mt-6">
              <DashboardAreaChart
                title="Attendance Trend"
                description="Daily attendance count trend"
                data={attendanceOverview?.chart_attendance_per_day}
                xKey="date"
                dataKey="attendance_count"
                color="#6366F1"
              />
            </div>
          </section>
        </section>
      )}
    </>
  );
}
