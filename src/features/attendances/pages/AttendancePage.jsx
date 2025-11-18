import { useState, useEffect } from "react";
import AttadanceTable from "../components/AttendanceTable";
import AttadanceFilters from "../components/AttendanceFilters";
import ColumnVisibilityMenu from "../components/ColumnVisibilityMenu";
import { getAttendancesRequest } from "../api/attadance";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";

import PageHeader from "../../../components/PageHeader";
import { Spinner } from "../../../components/ui/spinner";
import NotFoundFilter from "../../../components/NotFoundFilter";

export default function AttadancePage() {
  const [attadances, setAttadances] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: false,
    date: true,
    check_in_time: true,
    check_out_time: true,
    work_hour: true,
  });

  // fetch attadances with filters and pagination
  const fetchAttadances = async () => {
    try {
      setLoading(true);
      const data = await getAttendancesRequest({ ...filters, page });
      setAttadances(data.data);
    } catch (err) {
      console.error("Failed to fetch attadances:", err);
    } finally {
      setLoading(false);
    }
  };
  // trgger fetch when filters or page change
  useEffect(() => {
    fetchAttadances();
  }, [filters, page]);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/admin/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Attadances</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Attadances</PageHeader>

      <div className="flex justify-between items-center">
        <AttadanceFilters filters={filters} setFilters={setFilters} />

        <ColumnVisibilityMenu
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <AttadanceTable
          data={attadances}
          visibleColumns={visibleColumns}
          onPageChange={setPage}
          onRefresh={fetchAttadances}
        />
      )}
    </>
  );
}
