import { useState, useEffect } from "react";
import MyLeaveFilters from "../components/MyLeaveFilters";
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
import PageHeader from "../../../components/PageHeader";
import Loading from "../../../components/Loading";
import { getLeaveRequests } from "../api/leaveRequests";
import CustomTable from "../../../components/CustomTable.jsx";
export default function LeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [filters, setFilters] = useState({});
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

  const [page, setPage] = useState(1);

  // fetch performance reviews with filters and pagination
  const fetchLeaveRequest = async () => {
    try {
      setLoading(true);
      const data = await getLeaveRequests({ ...filters, page: page });
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
            <BreadcrumbPage>Leaves Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Leaves</PageHeader>

      <div className="flex justify-between items-center">
        {/* Filters */}
        <MyLeaveFilters filters={filters} setFilters={setFilters} />
        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
        </div>
      </div>

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
