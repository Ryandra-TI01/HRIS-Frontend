import { useState, useEffect } from "react";
import PerformanceReviewTable from "../components/PerformanceReviewTable";
import PerformanceReviewFilters from "../components/PerformanceReviewFilters";
import ColumnVisibilityMenu from "../components/ColumnVisibilityMenu";
import { getPerformancesRequest } from "../api/performance-reviews";
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
export default function PerformanceReviewPage() {
  const [performanceReview, setPerformanceReview] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
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
      const data = await getPerformancesRequest({ ...filters, page: page });
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
            <BreadcrumbPage>Performance Review</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>List of Performance Review</PageHeader>

      <div className="flex justify-between items-center">
        {/* Filters */}
        <PerformanceReviewFilters filters={filters} setFilters={setFilters} />
        {/* Button filter */}
        <div className="flex gap-2">
          <ColumnVisibilityMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
          {/* Button create */}
          <Link to="/admin/performance-reviews/create">
            <Button>Create Review</Button>
          </Link>
        </div>
      </div>

      {/* Table Performance Review */}
      {loading ? (
        <Loading />
      ) : (
        <PerformanceReviewTable
          data={performanceReview}
          visibleColumns={visibleColumns}
          onPageChange={(newPage) => setPage(newPage)}
          onRefresh={fetchPerformanceReview}
        />
      )}
    </>
  );
}
