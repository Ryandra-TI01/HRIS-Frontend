import { useState, useEffect } from "react";
import PerformanceReviewFilters from "../components/PerformanceReviewFilters";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu";
import {
  deletePerformanceRequest,
  getPerformancesRequest,
} from "../api/performance-reviews";
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
import Loading from "../../../components/Loading";
import { useDebounce } from "../../../hooks/DebounceSearch";
import FilterWrapper from "../../../components/FilterWrapper";
import CustomTable from "../../../components/CustomTable";
import { PerformanceReviewColumns } from "../config/PerformanceReviewColumns";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";
export default function PerformanceReviewPage() {
  const { user } = useAuth();
  const [performanceReview, setPerformanceReview] = useState([]);
  const [filters, setFilters] = useState({});
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    employee_name: true,
    reviewer_name: true,
    period: true,
    total_star: true,
    created_at: false,
    actions: true,
  });

  const [page, setPage] = useState(1);

  // fetch performance reviews with filters and pagination
  const fetchPerformanceReview = async () => {
    try {
      setLoading(true);
      const data = await getPerformancesRequest({
        ...debouncedFilters,
        page: page,
      });
      setPerformanceReview(data.data);
    } catch (err) {
      console.error("Failed to fetch performance reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  // trigger fetch when filters or page change
  useEffect(() => {
    fetchPerformanceReview();
  }, [debouncedFilters, page]);

  // handle delete
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deletePerformanceRequest(id);
      onRefresh(); // refresh data setelah delete
      toast.success("Perfomance Review deleted successfully.");
    } catch (error) {
      setError("Failed to delete performance review.");
      toast.error("Failed to delete performance review.");
      console.log(error);
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
            <BreadcrumbPage>Performance Review</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Performance Review</PageHeader>

      <FilterWrapper>
        {/* Filters */}
        <PerformanceReviewFilters filters={filters} setFilters={setFilters} />
        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          {/* Button create */}
          <Link
            to={`/${
              user.role === "admin_hr" ? "admin" : "manager"
            }/performance-reviews/create`}
          >
            <Button>Create Review</Button>
          </Link>
        </div>
      </FilterWrapper>

      {/* Table Performance Review */}
      {loading ? (
        <Loading />
      ) : (
        <CustomTable
          data={performanceReview}
          visibleColumns={visibleColumns}
          onPageChange={(newPage) => setPage(newPage)}
          onRefresh={fetchPerformanceReview}
          columns={PerformanceReviewColumns}
          onDelete={handleDelete}
          userRole={user.role}
        />
      )}
    </>
  );
}
