import { useState, useEffect } from "react";
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
import EmployeeFiltersModal from "../components/EmployeeFiltersModal";
import EmployeeFilterBar from "../components/EmployeeFilterBar";
import { Plus } from "lucide-react";
export default function EmployeePage() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    employee_code: true,
    name: true,
    email: false,
    position: true,
    department: true,
    employment_status: true,
    manager: false,
    join_date: false,
    contact: false,
    status_active: false,
    ...(user.role === "admin_hr" && { actions: true }),
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
        <EmployeeFilterBar
          filters={filters}
          setFilters={setFilters}
          openFilters={() => setOpenFilters(true)}
        />

        {/* modal */}
        <EmployeeFiltersModal
          open={openFilters}
          onClose={() => setOpenFilters(false)}
          filters={filters}
          setFilters={setFilters}
        />

        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          {/* Button create */}
          {user.role === "admin_hr" && (
            <Link to="/admin/employees/create">
              <Button>
                {" "}
                <Plus /> Create Employee
              </Button>
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
