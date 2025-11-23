import { useState, useEffect } from "react";
import EmployeeFilters from "../components/EmployeeFilters";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu";
import { getEmployeesRequest } from "../api/employee";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PageHeader from "../../../components/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";
import CustomTable from "../../../components/CustomTable";
import { EmployeeColumns } from "../config/EmployeeColumns";
import FilterWrapper from "../../../components/FilterWrapper";
import { useDebounce } from "../../../hooks/DebounceSearch";
export default function EmployeePage() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    name: true,
    email: true,
    position: true,
    department: true,
    employment_status: true,
    manager: false,
    join_date: false,
    contact: false,
    status_active: false,
    ...(user.role === "admin" && { actions: true }),
  });
  const [page, setPage] = useState(1);

  // fetch employees with filters and pagination
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployeesRequest({
        ...debouncedFilters,
        page: page,
      });
      setEmployees(data.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    } finally {
      setLoading(false);
    }
  };

  // trigger fetch when filters or page change
  useEffect(() => {
    fetchEmployees();
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
            <BreadcrumbPage>Employees</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Employees</PageHeader>

      {/* Filter Wrapper */}
      <FilterWrapper>
        {/* Filters */}
        <EmployeeFilters filters={filters} setFilters={setFilters} />
        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          {/* Button create */}
          {user.role === "admin_hr" && (
            <Link to="/admin/employees/create">
              <Button>Create Employee</Button>
            </Link>
          )}
        </div>
      </FilterWrapper>

      {/* Table employees */}
      {loading ? (
        <Loading />
      ) : (
        <CustomTable
          data={employees}
          visibleColumns={visibleColumns}
          onPageChange={(newPage) => setPage(newPage)}
          onRefresh={fetchEmployees}
          columns={EmployeeColumns}
          userRole={user.role}
        />
      )}
    </>
  );
}
