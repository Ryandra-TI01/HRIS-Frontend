import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { getMyPerformanceReviews } from "../api/performance-reviews";

import MyPerformanceFilters from "../components/MyPerformanceFilters";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FilterWrapper from "../../../components/FilterWrapper";
import ColumnVisibilityMenu from "../../../components/ColumnVisibilityMenu";
import Loading from "../../../components/Loading";
import CustomTable from "../../../components/CustomTable";
import { PerformanceReviewColumns } from "../config/PerformanceReviewColumns";
import { useDebounce } from "../../../hooks/DebounceSearch";
export default function MyPerformanceReviewPage() {
  const [performanceReview, setPerformanceReview] = useState([]);
  const [filters, setFilters] = useState({ period: undefined });
  const debouncedFilters = useDebounce(filters, 600);
  const [loading, setLoading] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    no: true,
    reviewer_name: true,
    period: true,
    total_star: true,
    created_at: false,
    review_description: true,
  });
  const [page, setPage] = useState(1);

  const fetchPerformanceReview = async () => {
    setLoading(true);
    try {
      const data = await getMyPerformanceReviews({
        ...debouncedFilters,
        page: page,
      });
      setPerformanceReview(data.data);
    } catch (error) {
      console.error("Failed to fetch performance reviews:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log(performanceReview);

  useEffect(() => {
    fetchPerformanceReview();
  }, [debouncedFilters, page]);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/employee/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Performance Review</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader>My Performance Review</PageHeader>

      <FilterWrapper>
        <MyPerformanceFilters filters={filters} setFilters={setFilters} />
        <ColumnVisibilityMenu
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
        />
      </FilterWrapper>

      {loading ? (
        <Loading />
      ) : (
        <CustomTable
          data={performanceReview}
          visibleColumns={visibleColumns}
          onPageChange={(newPage) => setPage(newPage)}
          onRefresh={fetchPerformanceReview}
          columns={PerformanceReviewColumns}
        />
      )}
    </>
  );
}
