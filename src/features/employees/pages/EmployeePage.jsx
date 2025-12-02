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
import { Field, FieldLabel } from "@/components/ui/field";
import PageHeader from "../../../components/PageHeader";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../components/Loading";
import CustomTable from "../../../components/CustomTable";
import { EmployeeColumns } from "../config/EmployeeColumns";
import FilterWrapper from "../../../components/FilterWrapper";
import { useDebounce } from "../../../hooks/DebounceSearch";
import { Plus } from "lucide-react";
import FilterBar from "../../../components/filters/FilterBar";
import FilterModal from "../../../components/filters/FilterModal";
import DepartmentSelect from "../../../components/filters/DepartmentSelect";
import EmployementStatusSelect from "../../../components/filters/EmployementStatusSelect";
import ManagerSelect from "../../../components/filters/ManagerSelect";
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
  const [perPage, setPerPage] = useState(10);

  // fetch employees with filters and pagination
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployeesRequest({
        ...debouncedFilters,
        page: page,
        per_page: perPage,
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
  }, [debouncedFilters, page, perPage]);

  // trigger fetch when filters or page change
  const handlePerPageChange = (value) => {
    setPerPage(value);
    setPage(1); // reset page ke 1 untuk UX yang benar
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
            <BreadcrumbPage>Employees</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Employees</PageHeader>

      {/* Filter Wrapper */}
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
              {user.role === "admin_hr" && (
                <Field>
                  <FieldLabel>Department</FieldLabel>
                  <DepartmentSelect
                    value={localFilters.department || ""}
                    onChange={(val) =>
                      setLocalFilters((f) => ({ ...f, department: val }))
                    }
                  />
                </Field>
              )}

              <Field>
                <FieldLabel>Employment Status</FieldLabel>
                <EmployementStatusSelect
                  value={localFilters.employment_status || ""}
                  onChange={(val) =>
                    setLocalFilters((f) => ({ ...f, employment_status: val }))
                  }
                />
              </Field>

              {/* Button create */}
              {user.role === "admin_hr" && (
                <Field>
                  <FieldLabel>Manager</FieldLabel>
                  <ManagerSelect
                    value={localFilters.manager_id || ""}
                    onChange={(val) =>
                      setLocalFilters((f) => ({ ...f, manager_id: val }))
                    }
                  />
                </Field>
              )}
            </>
          )}
        </FilterModal>
        <div className="flex md:flex-row gap-2 sm:justify-end">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />

          {user.role === "admin_hr" && (
            <Link to="/admin/employees/create">
              <Button>
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
          onPageChange={setPage}
          onRefresh={fetchEmployees}
          columns={EmployeeColumns}
          userRole={user.role}
          onPerPageChange={handlePerPageChange}
          perPage={perPage}
        />
      )}
    </>
  );
}
