import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { getManagerDashboard } from "../api/dashboard";

import { DashboardStatCard } from "../components/DashboardStatCard";
import { DashboardBarChart } from "../components/DashboardBarChart";
import { DashboardAreaChart } from "../components/DashboardAreaChart";

import Loading from "../../../components/Loading";
import { Users, Clock, Star, FileText } from "lucide-react";
import PageHeader from "../../../components/PageHeader";

export default function ManagerDashboard() {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getManagerDashboard();
      console.log(res);
      setAttendanceData(res.data?.attendance_overview);
      setPerformanceData(res.data?.performance_overview);
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
            <BreadcrumbLink to="/admin/dashboard">Manager Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Content */}
      {loading ? (
        <Loading/>
      ) : (
        <>
          {/* SECTION 1 */}
          <section>
            <PageHeader>Attendance Overview</PageHeader>

            <div className="grid grid-cols-2 gap-4">
              <DashboardStatCard
                title="Total Attendance Records"
                value={attendanceData?.cards?.total_attendance_records_team}
                icon={Users}
                accent="text-emerald-500"
              />

              <DashboardStatCard
                title="Average Work Hours"
                value={attendanceData?.cards?.average_work_hours_team}
                icon={Clock}
                accent="text-blue-500"
              />
            </div>

            <div className="mt-6">
              <DashboardBarChart
                title="Work Hours Overview"
                description="Total hours worked by each employee"
                data={attendanceData?.chart_work_hours_per_employee}
                dataKey="total_hours"
                xKey="employee_name"
                color="#6366F1"
              />
            </div>
          </section>

          {/* SECTION 2 */}
          <section>
            <PageHeader>Performance Overview</PageHeader>

            <div className="grid grid-cols-2 gap-4">
              <DashboardStatCard
                title="Average Team Rating"
                value={performanceData?.cards?.average_team_rating}
                icon={Star}
                accent="text-purple-500"
              />

              <DashboardStatCard
                title="Total Reviews This Period"
                value={performanceData?.cards?.total_reviews_current_period}
                icon={FileText}
                accent="text-orange-500"
              />
            </div>

            <div className="mt-6">
              <DashboardAreaChart
                title="Performance Trend"
                description="Average rating trend over last quarters"
                data={performanceData?.chart_rating_trend_over_periods}
                dataKey="avg_rating"
                xKey="period"
                color="#6366F1"
              />
            </div>
          </section>
        </>
      )}
    </>
  );
}
