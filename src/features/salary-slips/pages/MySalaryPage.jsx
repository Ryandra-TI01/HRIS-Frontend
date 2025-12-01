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

  // FILTER STATES
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // AUTO BUILD PERIOD sesuai backend
  const period = filterMonth || filterYear || "";

  const debouncedPeriod = useDebounce(period, 500);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    onPageChange: () => {},
  });

  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");

  const fetchSalary = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getMySalarySlip({
        page,
        period: debouncedPeriod,
      });

      setSalaryList(res.data);

      setPagination({
        currentPage: res.current_page,
        lastPage: res.last_page,
        onPageChange: (newPage) => fetchSalary(newPage),
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
  }, [debouncedPeriod]);  

  const resetAll = () => {
    setFilterMonth("");
    setFilterYear("");
    fetchSalary(1);
  };
  console.log(salaryList);

  return (
    <>
      <PageHeader>My Salary</PageHeader>

      <MySalaryFilter
        month={filterMonth}
        year={filterYear}
        onMonthChange={setFilterMonth}
        onYearChange={setFilterYear}
        onRefresh={resetAll}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {loading ? (
        <Loading />
      ) : salaryList.length > 0 ? (
        <>
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
        </>
      ) : (
        <div className="mt-4 flex items-center justify-center">
          <p className="text-muted-foreground">No salary slip found.</p>
        </div>
      )}
      {/* PAGINATION */}
      <CustomPagination
        currentPage={pagination.currentPage}
        lastPage={pagination.lastPage}
        onPageChange={pagination.onPageChange}
      />
    </>
  );
}
