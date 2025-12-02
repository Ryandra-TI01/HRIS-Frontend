import { useState, useEffect } from "react";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu.jsx";
import { SalaryColumns } from "../config/SalaryColumns.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageHeader from "../../../components/PageHeader.jsx";
import Loading from "../../../components/Loading.jsx";
import CustomTable from "../../../components/CustomTable.jsx";
import {
  deleteSalarySlipRequest,
  getSalarySlipsRequest,
} from "../api/salary-slips.js";
import { Link } from "react-router";
import { Button } from "../../../components/ui/button.js";
import { toast } from "sonner";
import FilterWrapper from "../../../components/FilterWrapper";
import { useDebounce } from "../../../hooks/DebounceSearch.js";
import { Plus } from "lucide-react";
import FilterBar from "../../../components/filters/FilterBar.jsx";
import FilterModal from "../../../components/filters/FilterModal.jsx";
import { Field, FieldLabel } from "@/components/ui/field";
import MonthSelect from "../../../components/filters/MonthSelect.jsx";
import SalaryRangeFilter from "../../../components/filters/SalaryRangeFilter.jsx";

export default function SalarySlipsPage() {
  const [error, setError] = useState(null);
  const [salary, setSalary] = useState([]);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    employee_name: true,
    period_month: true,
    basic_salary: true,
    allowance: false,
    deduction: false,
    total_salary: true,
    created_by: false,
    actions: true,
  });
  const [openFilters, setOpenFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // fetch performance reviews with filters and pagination
  const fetchSalaryRequest = async () => {
    try {
      setLoading(true);
      const data = await getSalarySlipsRequest({
        ...debouncedFilters,
        page: page,
        per_page: perPage,
      });
      setSalary(data.data);
      console.log(salary);
    } catch (err) {
      console.error("Failed to fetch leave requests:", err);
    } finally {
      setLoading(false);
    }
  };

  // trigger fetch when filters or page change
  useEffect(() => {
    fetchSalaryRequest();
  }, [debouncedFilters, page, perPage]);

  // trigger fetch when filters or page change
  const handlePerPageChange = (value) => {
    setPerPage(value);
    setPage(1); // reset page ke 1 untuk UX yang benar
  };

  // handle delete salary slip
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteSalarySlipRequest(id);
      toast.success("Salary slip deleted successfully.");
      fetchSalaryRequest();
    } catch (error) {
      setError("Failed to delete salary slip.");
    } finally {
      setLoading(false);
    }
  };

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
            <BreadcrumbPage>Salary Slips Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Salary Slips</PageHeader>

      <FilterWrapper>
        {/* Filters */}
        {/* <SalarySlipFilters filters={filters} setFilters={setFilters} /> */}
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
              <Field>
                <SalaryRangeFilter
                  value={{
                    salary_from: localFilters.salary_from,
                    salary_to: localFilters.salary_to,
                    total_from: localFilters.total_from,
                    total_to: localFilters.total_to,
                  }}
                  onChange={(updated) =>
                    setLocalFilters((prev) => ({ ...prev, ...updated }))
                  }
                />
              </Field>
            </>
          )}
        </FilterModal>

        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          {/* Button Create */}
          <Link to="/admin/salary-slips/create">
            <Button>
              <Plus />
              Create Salary Slip
            </Button>
          </Link>
        </div>
      </FilterWrapper>

      {/* Table Leaves */}
      {loading ? (
        <Loading />
      ) : (
        <CustomTable
          data={salary}
          visibleColumns={visibleColumns}
          onPageChange={setPage}
          onRefresh={fetchSalaryRequest}
          onDelete={handleDelete}
          columns={SalaryColumns}
          onPerPageChange={handlePerPageChange}
          perPage={perPage}
        />
      )}
    </>
  );
}
