import { useState, useEffect } from "react";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeFilters from "../components/EmployeeFilters";
import ColumnVisibilityMenu from "../components/ColumnVisibilityMenu";
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
import { Spinner } from "../../../components/ui/spinner";
export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    position: true,
    department: true,
    employment_status: true,
    manager: false,
    join_date: false,
    contact: false,
    status_active: false,
    actions: true,
  });
  const [page, setPage] = useState(1);
  
  // fetch employees with filters and pagination
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployeesRequest({ ...filters, page: page });
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
            <BreadcrumbPage>Employees</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Employees</PageHeader>

      <div className="flex justify-between items-center">
        {/* Filters */}
        <EmployeeFilters filters={filters} setFilters={setFilters} />
        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          {/* Button create */}
          <Link to="/admin/employees/create">
            <Button>Create Employee</Button>
          </Link>
        </div>
      </div>

      {/* Table employees */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Spinner />
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <EmployeeTable
          data={employees}
          visibleColumns={visibleColumns}
          onPageChange={(newPage) => setPage(newPage)}
          onRefresh={fetchEmployees}
        />
      )}
    </>
  );
}
