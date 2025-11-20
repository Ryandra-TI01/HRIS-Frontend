import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import PageHeader from "@/components/PageHeader";
import { getMyPerformanceReviews } from "../api/performance-reviews";

import MyPerformanceFilters from "../components/MyPerformanceFilters";
import MyPerformanceColumnMenu from "../components/MyPerformanceColumnMenu";
import MyPerformanceTable from "../components/MyPerformanceTable";

export default function MyPerformanceReviewPage() {
  const [filters, setFilters] = useState({ period: undefined });

  const [columns, setColumns] = useState({
    period: true,
    total_star: true,
    review_description: true,
    reviewer: true,
  });

  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]); // 🔥 semua data tanpa filter
  const [loading, setLoading] = useState(false);

  const loadAll = async () => {
    const res = await getMyPerformanceReviews({});
    setAllRecords(res);
  };

  const loadFiltered = async () => {
    setLoading(true);
    const res = await getMyPerformanceReviews(filters);
    setRecords(res);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    loadFiltered();
  }, [filters]);

  return (
    <>
      <PageHeader>My Performance Review</PageHeader>

      <div className="flex justify-between mb-4">
        <MyPerformanceFilters 
          filters={filters} 
          setFilters={setFilters}
          allRecords={allRecords} // 🔥 kirim semua record
        />
        <MyPerformanceColumnMenu visible={columns} setVisible={setColumns} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner />
        </div>
      ) : (
        <MyPerformanceTable data={records} visible={columns} />
      )}
    </>
  );
}
