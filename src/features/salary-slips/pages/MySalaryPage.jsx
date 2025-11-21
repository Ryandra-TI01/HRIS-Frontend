import { useEffect, useState } from "react";
import { getMySalarySlip } from "../api/salary-slips";
import MySalaryCard from "../components/MySalaryCard";
import MySalaryFilter from "../components/MySalaryFilter";

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

export default function MySalaryPage() {
  const [salaryList, setSalaryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  // Filter
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // View mode
  const [viewMode, setViewMode] = useState("grid");

  const [loading, setLoading] = useState(true);

  const fetchSalary = async () => {
    try {
      setLoading(true);
      const data = await getMySalarySlip();
      setSalaryList(data);
      setFilteredList(data);
    } catch (err) {
      console.log("Error Fetching Salary Slip:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  // Filtering
  const handleFilterChange = (selectedMonth, selectedYear) => {
    setMonth(selectedMonth);
    setYear(selectedYear);

    const filtered = salaryList.filter((item) => {
      const [itemYear, itemMonth] = item.period_month.split("-");
      const matchMonth = selectedMonth ? itemMonth === selectedMonth : true;
      const matchYear = selectedYear ? itemYear === selectedYear : true;
      return matchMonth && matchYear;
    });

    setFilteredList(filtered);
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/employee/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>My Salary</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>My Salary</PageHeader>

      {/* Filter */}
      <MySalaryFilter
        selectedMonth={month}
        selectedYear={year}
        onFilterChange={handleFilterChange}
        onRefresh={fetchSalary}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        setFilteredList={setFilteredList}
      />

      {/* LISTING */}
      {loading ? (
        <Loading />
      ) : filteredList.length > 0 ? (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4"
              : "flex flex-col gap-4 mt-4"
          }
        >
          {filteredList.map((slip) => (
            <MySalaryCard key={slip.id} slip={slip} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 flex justify-center items-center h-64">
          No salary slip found.
        </p>
      )}
    </>
  );
}
