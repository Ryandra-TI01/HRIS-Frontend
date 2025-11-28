import { useState, useEffect } from "react";
import SalarySlipFilters from "../components/SalarySlipFilters.jsx";
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

  const [page, setPage] = useState(1);

  // fetch performance reviews with filters and pagination
  const fetchSalaryRequest = async () => {
    try {
      setLoading(true);
      const data = await getSalarySlipsRequest({ ...debouncedFilters, page: page });
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
  }, [debouncedFilters, page]);

  // handle delete salary slip
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteSalarySlipRequest(id);
      toast.success("Salary slip deleted successfully.");
      onRefresh(); // refresh data after delete
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
        <SalarySlipFilters filters={filters} setFilters={setFilters} />
        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          {/* Button Create */}
          <Link to="/admin/salary-slips/create">
            <Button><Plus />Create Salary Slip</Button>
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
          onPageChange={(newPage) => setPage(newPage)}
          onRefresh={fetchSalaryRequest}
          onDelete={handleDelete}
          columns={SalaryColumns}
        />
      )}
    </>
  );
}
