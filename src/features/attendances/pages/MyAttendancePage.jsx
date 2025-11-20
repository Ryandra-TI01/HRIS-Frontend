import { useEffect, useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getMyAttendances } from "../api/attadance";
import MyAttendanceFilters from "../components/MyAttendanceFilters";
import MyColumnVisibilityMenu from "../components/MyColumnVisibilityMenu";
import MyAttendanceTable from "../components/MyAttendanceTable";
import MyAttendanceModal from "../components/MyAttendanceModal";
import { toast } from "sonner";

export default function MyAttendancePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    month: null,
    date: null,
  });

  const [visibleColumns, setVisibleColumns] = useState({
    date: true,
    check_in_time: true,
    check_out_time: true,
    work_hour: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const params = {};

      if (filters.month) {
        const year = new Date().getFullYear();
        params.month = `${year}-${filters.month}`;
      }

      if (filters.date) {
        params.date = filters.date;
      }

      const res = await getMyAttendances(params);
      const arr = res?.data || res;
      setRecords(Array.isArray(arr) ? arr : arr?.data || []);
    } catch (e) {
      console.error(e);
      toast.error("Gagal memuat attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const todayRecord = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return records.find((i) => (i.date ?? "").slice(0, 10) === today) || null;
  }, [records]);

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

        <div className="flex gap-3">
          <Button onClick={() => setModalOpen(true)}>Attendance</Button>

          <MyColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spinner />
        </div>
      ) : (
        <MyAttendanceTable data={records} visibleColumns={visibleColumns} />
      )}

      {/* MODAL */}
      <MyAttendanceModal
        open={modalOpen}
        setOpen={setModalOpen}
        todayRecord={todayRecord}
        reload={loadData}
      />
    </>
  );
}
