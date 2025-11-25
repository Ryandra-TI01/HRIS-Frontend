import { useEffect, useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
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
import MyAttendanceModal from "../components/MyAttendanceModal";
import { useDebounce } from "../../../hooks/DebounceSearch";
import FilterWrapper from "../../../components/FilterWrapper";
import MyAttendanceFilters from "../components/MyAttendanceFilters";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu";
import Loading from "../../../components/Loading";
import CustomTable from "../../../components/CustomTable";
import { AttendanceColumns } from "../config/AttendanceColumns";

export default function MyAttendancePage() {
  const [attadances, setAttadances] = useState([]);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    date: true,
    check_in_time: true,
    check_out_time: true,
    work_hour: true,
  });

  const fetchMyAttadances = async () => {
    setLoading(true);
    try {
      const data = await getMyAttendances({ ...debouncedFilters, page: page });
      setAttadances(data?.data || []);
    } catch (error) {
      console.error("Failed to fetch attadances:", error);
    } finally {
      setLoading(false);
    }
  };

  // trigger fetch when filters or page change
  useEffect(() => {
    fetchMyAttadances();
  }, [debouncedFilters, page]);

  const todayRecord = useMemo(() => {
    if (!Array.isArray(attadances.data)) return null;

    const today = new Date().toISOString().slice(0, 10);
    return (
      attadances.data.find((i) => (i.date ?? "").slice(0, 10) === today) || null
    );
  }, [attadances]);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/employee/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>My Attendance</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>My Attendance</PageHeader>

      <FilterWrapper>
        <MyAttendanceFilters filters={filters} setFilters={setFilters} />

        <div className="flex gap-3">
          <Button onClick={() => setModalOpen(true)}>Attendance</Button>

          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
        </div>
      </FilterWrapper>

      {loading ? (
        <Loading />
      ) : (
        <CustomTable
          data={attadances}
          visibleColumns={visibleColumns}
          onPageChange={setPage}
          onRefresh={fetchMyAttadances}
          columns={AttendanceColumns}
        />
      )}

      {/* MODAL */}
      <MyAttendanceModal
        open={modalOpen}
        setOpen={setModalOpen}
        todayRecord={todayRecord}
        reload={fetchMyAttadances}
      />
    </>
  );
}
