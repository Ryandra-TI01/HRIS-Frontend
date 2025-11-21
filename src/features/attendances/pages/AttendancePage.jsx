import { useState, useEffect } from "react";
import AttadanceFilters from "../components/AttendanceFilters";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu";
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
import CustomTable from "../../../components/CustomTable";
import { AttendanceColumns } from "../config/AttendanceColumns";
import Loading from "../../../components/Loading";
import FilterWrapper from "../../../components/FilterWrapper";
import { useDebounce } from "../../../hooks/DebounceSearch";

export default function AttadancePage() {
  const [attadances, setAttadances] = useState(null);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
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
      const data = await getAttendancesRequest({ ...debouncedFilters, page });
      setAttadances(data.data);
    } catch (err) {
      console.error("Failed to fetch attadances:", err);
    } finally {
      setLoading(false);
    }
  };

  // trigger fetch when filters or page change
  useEffect(() => {
    fetchAttadances();
  }, [debouncedFilters, page]);

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

      <FilterWrapper>
        {/* Filters */}
        <AttadanceFilters filters={filters} setFilters={setFilters} />
        {/* Button filter */}
        <ColumnVisibilityMenu
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      </FilterWrapper>

      {/* Table */}
      {loading ? (
        <Loading />
      ) : (
        <CustomTable
          data={attadances}
          visibleColumns={visibleColumns}
          onPageChange={setPage}
          onRefresh={fetchAttadances}
          columns={AttendanceColumns}
        />
      )}
    </>
  );
}
