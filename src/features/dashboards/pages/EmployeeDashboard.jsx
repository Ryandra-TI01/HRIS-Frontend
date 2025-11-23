import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import { useEffect, useState } from "react";
import { getEmployeeDashboard } from "../api/dashboard";

import { DashboardStatCard } from "../components/DashboardStatCard";
import { DashboardAreaChart } from "../components/DashboardAreaChart";

import Loading from "../../../components/Loading";
import PageHeader from "../../../components/PageHeader";

import { Building2, User, Clock, Calendar } from "lucide-react";

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [attendanceSummary, setAttendanceSummary] = useState(null);

  const fetchData = async () => {
    try {
      const res = await getEmployeeDashboard();
      const data = res.data;

      setPersonalInfo(data.personal_info);
      setAttendanceSummary(data.attendance_summary);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/employee/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* CONTENT */}
      <section className="space-y-10">
        {/* SECTION 1 – PERSONAL INFO */}
        <section>
          <PageHeader>Personal Info</PageHeader>

          <div className="grid grid-cols-2 gap-4">
            <DashboardStatCard
              title="My Department"
              value={personalInfo.my_department}
              icon={Building2}
              accent="text-blue-500"
            />

            <DashboardStatCard
              title="My Manager"
              value={personalInfo.my_manager}
              icon={User}
              accent="text-emerald-500"
            />
          </div>
        </section>

        {/* SECTION 2 – ATTENDANCE SUMMARY */}
        <section>
          <PageHeader>Attendance Summary</PageHeader>

          <div className="grid grid-cols-2 gap-4">
            <DashboardStatCard
              title="Total Work Hours (This Month)"
              value={attendanceSummary.cards.total_work_hours_this_month}
              icon={Clock}
              accent="text-indigo-500"
            />

            <DashboardStatCard
              title="Days Present (This Month)"
              value={attendanceSummary.cards.days_present_this_month}
              icon={Calendar}
              accent="text-orange-500"
            />
          </div>

          <div className="mt-6">
            <DashboardAreaChart
              title="Work Hours Trend"
              description="Daily work hours trend for this month"
              data={attendanceSummary.chart_work_hours_daily}
              xKey="date"
              dataKey="work_hours"
              color="#3B82F6"
            />
          </div>
        </section>
      </section>
    </>
  );
}
