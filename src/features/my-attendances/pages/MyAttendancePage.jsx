import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { getMyAttendances } from "../api/attendance";
import MyAttendanceFilters from "../components/MyAttendanceFilters";
import MyColumnVisibilityMenu from "../components/MyColumnVisibilityMenu";
import MyAttendanceTable from "../components/MyAttendanceTable";

export default function MyAttendancePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    check_in_time: true,
    check_out_time: true,
    work_hour: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);

      const params = {};

      if (filters.month) {
        const year = new Date().getFullYear();
        params.month = `${year}-${filters.month}`;
      }

      if (filters.date) params.date = filters.date;

      const res = await getMyAttendances(params);
      setRecords(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/employee/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>My Attendance</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader>My Attendance</PageHeader>

      <div className="flex justify-between items-center mt-2">
        <MyAttendanceFilters filters={filters} setFilters={setFilters} />
        <MyColumnVisibilityMenu
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <MyAttendanceTable data={records} visibleColumns={visibleColumns} />
      )}
    </>
  );
}
