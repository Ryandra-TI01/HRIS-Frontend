import { useEffect, useState } from "react";
import { getMySalarySlip } from "../api/salary-slips";
import MySalaryCard from "../components/MySalaryCard";
import MySalaryFilter from "../components/MySalaryFilter";
import PageHeader from "../../../components/PageHeader";
import Loading from "../../../components/Loading";
import { useDebounce } from "../../../hooks/DebounceSearch";
import CustomPagination from "../../../components/PaginationCustom";

export default function MySalaryPage() {
  const [salaryList, setSalaryList] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    onPageChange: () => {},
  });

  const [filters, setFilters] = useState({
    month: "",
    year: "",
  });

  const debouncedFilters = useDebounce(filters, 500);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const fetchSalary = async (page = 1) => {
    try {
      setLoading(true);

      const params = {
        page,
        month: debouncedFilters.month,
        year: debouncedFilters.year,
      };

      const res = await getMySalarySlip(params);

      setSalaryList(res.data);

      // Bind pagination agar cocok ke CustomPagination
      setPagination({
        currentPage: res.current_page,
        lastPage: res.last_page,
        onPageChange: (newPage) => {
          fetchSalary(newPage);
        },
      });

    } catch (error) {
      console.log("Fetch Salary Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalary(1);
  }, []);

  useEffect(() => {
    fetchSalary(1);
  }, [debouncedFilters]);

  return (
    <>
      <PageHeader>My Salary</PageHeader>

      <MySalaryFilter
        selectedMonth={filters.month}
        selectedYear={filters.year}
        onFilterChange={(m, y) => setFilters({ month: m, year: y })}
        onRefresh={() => fetchSalary(1)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {loading ? (
        <Loading />
      ) : salaryList.length > 0 ? (
        <>
          {/* LISTING */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
                : "flex flex-col gap-4 mt-4"
            }
          >
            {salaryList.map((slip) => (
              <MySalaryCard key={slip.id} slip={slip} viewMode={viewMode} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="mt-8 flex justify-center">
            <CustomPagination
              currentPage={pagination.currentPage}
              lastPage={pagination.lastPage}
              onPageChange={pagination.onPageChange}
            />
          </div>
        </>
      ) : (
        <p className="text-gray-500 flex justify-center items-center h-64">
          No salary slip found.
        </p>
      )}
    </>
  );
}
