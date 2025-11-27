import { useState, useEffect } from "react";
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
import { Field, FieldLabel } from "@/components/ui/field";

import PageHeader from "../../../components/PageHeader";
import CustomTable from "../../../components/CustomTable";
import { AttendanceColumns } from "../config/AttendanceColumns";
import Loading from "../../../components/Loading";
import FilterWrapper from "../../../components/FilterWrapper";
import { useDebounce } from "../../../hooks/DebounceSearch";
import FilterBar from "../../../components/filters/FilterBar";
import FilterModal from "../../../components/filters/FilterModal";
import MonthSelect from "../../../components/filters/MonthSelect";
import DepartmentSelect from "../../../components/filters/DepartmentSelect";
import WorkHourRangeFilter from "../../../components/filters/WorkHourRangeFilter";
import DateFilter from "../../../components/filters/DateFilter";
import { useAuth } from "../../../context/AuthContext";

export default function AttadancePage() {
  const { user } = useAuth();
  const [attadances, setAttadances] = useState(null);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    name: true,
    email: false,
    date: true,
    check_in_time: true,
    check_out_time: true,
    work_hour: true,
  });
  const [page, setPage] = useState(1);

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
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          openFilters={() => setOpenFilters(true)}
        />

        <FilterModal
          open={openFilters}
          onOpenChange={setOpenFilters}
          filters={filters}
          setFilters={setFilters}
        >
          {/* render-prop function: receives localFilters, setLocalFilters */}
          {(localFilters, setLocalFilters) => (
            <>
              {/* Month */}
              <Field>
                <FieldLabel className="block text-sm font-medium mb-2">
                  Month
                </FieldLabel>
                {/* Month Filter */}
                <MonthSelect
                  value={localFilters.month || ""}
                  onChange={(val) =>
                    setLocalFilters((f) => ({ ...f, month: val }))
                  }
                />
              </Field>
              {/* Date */}
              <DateFilter
                value={localFilters.date || ""}
                onChange={(v) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    date: v,
                  }))
                }
              />
              {/* Department */}
              {user.role === "admin_hr" && (
                <Field>
                  <FieldLabel className="block text-sm font-medium mb-2">
                    Department
                  </FieldLabel>
                  {/* Month Filter */}
                  <DepartmentSelect
                    value={localFilters.department || ""}
                    onChange={(val) =>
                      setLocalFilters((f) => ({ ...f, department: val }))
                    }
                  />
                </Field>
              )}
              {/* WorkHourRangeFilter */}
              <WorkHourRangeFilter
                value={{
                  min_work_hour: localFilters.min_work_hour,
                  max_work_hour: localFilters.max_work_hour,
                }}
                onChange={(updated) =>
                  setLocalFilters((prev) => ({ ...prev, ...updated }))
                }
              />
            </>
          )}
        </FilterModal>

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
