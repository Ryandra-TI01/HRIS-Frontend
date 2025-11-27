import { useState, useEffect } from "react";
import LeaveFilters from "../components/LeaveFilters.jsx";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu";
import { leaveColumns } from "../config/leaveColumns.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Field, FieldLabel } from "@/components/ui/field";

import PageHeader from "../../../components/PageHeader";
import Loading from "../../../components/Loading";
import { getLeaveRequests } from "../api/leaveRequests";
import CustomTable from "../../../components/CustomTable.jsx";
import { useDebounce } from "../../../hooks/DebounceSearch.js";
import FilterWrapper from "../../../components/FilterWrapper.jsx";
import FilterBar from "../../../components/filters/FilterBar.jsx";
import FilterModal from "../../../components/filters/FilterModal.jsx";
import StatusSelect from "../../../components/filters/StatusSelect.jsx";
import MonthSelect from "../../../components/filters/MonthSelect.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import DepartmentSelect from "../../../components/filters/DepartmentSelect.jsx";
import DateRangeFilter from "../../../components/filters/DateRangeFilter.jsx";
export default function LeavesPage() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    employee_name: true,
    start_date: true,
    end_date: true,
    reviewer_name: true,
    status: true,
    reviewer_note: false,
    actions: true,
  });
  const [openFilters, setOpenFilters] = useState(false);
  const [page, setPage] = useState(1);

  // fetch performance reviews with filters and pagination
  const fetchLeaveRequest = async () => {
    try {
      setLoading(true);
      const data = await getLeaveRequests({ ...debouncedFilters, page: page });
      setLeaves(data.data);
      console.log(leaves);
    } catch (err) {
      console.error("Failed to fetch leave requests:", err);
    } finally {
      setLoading(false);
    }
  };

  // trigger fetch when filters or page change
  useEffect(() => {
    fetchLeaveRequest();
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
            <BreadcrumbPage>Leaves Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Leaves</PageHeader>

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
              {/* STATUS */}
              <Field>
                <FieldLabel>Leave Status</FieldLabel>
                <StatusSelect
                  value={localFilters.status || null}
                  onChange={(val) =>
                    setLocalFilters((prev) => ({ ...prev, status: val }))
                  }
                />
              </Field>
              {/* Month Filter */}
              <Field>
                <FieldLabel>Month</FieldLabel>
                <MonthSelect
                  value={localFilters.period || ""}
                  onChange={(val) =>
                    setLocalFilters((prev) => ({ ...prev, period: val }))
                  }
                />
              </Field>
              {/* Date Range Filter */}
              <DateRangeFilter
                value={{
                  date_from: localFilters.date_from,
                  date_to: localFilters.date_to,
                }}
                onChange={(updated) =>
                  setLocalFilters((prev) => ({ ...prev, ...updated }))
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
            </>
          )}
        </FilterModal>

        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
        </div>
      </FilterWrapper>

      {/* Table Leaves */}
      {loading ? (
        <Loading />
      ) : (
        <CustomTable
          data={leaves}
          visibleColumns={visibleColumns}
          onPageChange={(newPage) => setPage(newPage)}
          onRefresh={fetchLeaveRequest}
          columns={leaveColumns}
        />
      )}
    </>
  );
}
