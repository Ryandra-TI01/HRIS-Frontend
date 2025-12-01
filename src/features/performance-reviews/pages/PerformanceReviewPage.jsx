import { useState, useEffect } from "react";
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
import { Plus } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import FilterBar from "../../../components/filters/FilterBar";
import FilterModal from "../../../components/filters/FilterModal";
import MonthSelect from "../../../components/filters/MonthSelect";
import DepartmentSelect from "../../../components/filters/DepartmentSelect";
import DateRangeFilter from "../../../components/filters/DateRangeFilter";
import RatingRangeFilter from "../../../components/filters/RatingRangeFilter";
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
    review_description: false,
    actions: true,
  });
  const [openFilters, setOpenFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // fetch performance reviews with filters and pagination
  const fetchPerformanceReview = async () => {
    try {
      setLoading(true);
      const data = await getPerformancesRequest({
        ...debouncedFilters,
        page: page,
        per_page: perPage,
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
  }, [debouncedFilters, page, perPage]);

  // trigger fetch when filters or page change
  const handlePerPageChange = (value) => {
    setPerPage(value);
    setPage(1); // reset page ke 1 untuk UX yang benar
  };

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
              {/* Month Filter */}
              <Field>
                <FieldLabel>Month</FieldLabel>
                <MonthSelect
                  value={localFilters.period || ""}
                  onChange={(val) =>
                    setLocalFilters((prev) => ({ ...prev, period: val }))
                  }
                />
              </Field>
              {/* Date Range Filter */}
              <Field>
                <DateRangeFilter
                  title="Date Range by Created At"
                  value={{
                    date_from: localFilters.date_from,
                    date_to: localFilters.date_to,
                  }}
                  onChange={(updated) =>
                    setLocalFilters((prev) => ({ ...prev, ...updated }))
                  }
                />
              </Field>
              {/* Rate Range Filter */}
              <Field>
                <RatingRangeFilter
                  title="Rating Range"
                  value={{
                    min_rating: localFilters.min_rating,
                    max_rating: localFilters.max_rating,
                  }}
                  onChange={(updated) =>
                    setLocalFilters((prev) => ({ ...prev, ...updated }))
                  }
                />
              </Field>

              {/* Department Filter */}
              <Field>
                <FieldLabel>Department</FieldLabel>
                <DepartmentSelect
                  value={localFilters.department || ""}
                  onChange={(val) =>
                    setLocalFilters((prev) => ({ ...prev, department: val }))
                  }
                />
              </Field>
            </>
          )}
        </FilterModal>

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
            <Button>
              <Plus />
              Create Review
            </Button>
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
          onPageChange={setPage}
          onRefresh={fetchPerformanceReview}
          columns={PerformanceReviewColumns}
          onDelete={handleDelete}
          userRole={user.role}
          onPerPageChange={handlePerPageChange}
          perPage={perPage}
        />
      )}
    </>
  );
}
