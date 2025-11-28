import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { getMyLeaveRequests } from "../api/leaveRequests";

import MyLeaveFilters from "../components/MyLeaveFilters";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useDebounce } from "../../../hooks/DebounceSearch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FilterWrapper from "../../../components/FilterWrapper";
import Loading from "../../../components/Loading";
import { leaveColumns } from "../config/leaveColumns";
import CustomTable from "../../../components/CustomTable";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu";
import { Plus } from "lucide-react";
export default function MyLeavesPage() {
  const [leaves, setLeaves] = useState([]);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    start_date: true,
    end_date: true,
    reason: false,
    status: true,
    reviewer_note: true,
  });

  const [page, setPage] = useState(1);

  const fetchLeaveRequest = async () => {
    setLoading(true);
    try {
      const data = await getMyLeaveRequests({
        ...debouncedFilters,
        page: page,
      });
      setLeaves(data.data);
      console.log(leaves);
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
            <BreadcrumbPage>My Leaves</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader>My Leave Requests</PageHeader>

      {/* TOP ACTION BAR */}
      <FilterWrapper>
        {/* Left — Filters */}
        <MyLeaveFilters filters={filters} setFilters={setFilters} />

        {/* Right — Columns + Create Button */}
        <div className="flex items-center gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />

          <Link to="/employee/leaves/create">
            <Button><Plus />Create Leave Request</Button>
          </Link>
        </div>
      </FilterWrapper>

      {/* TABLE / LOADING */}
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
