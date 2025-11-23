import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import PageHeader from "@/components/PageHeader";
import { getMyLeaveRequests } from "../api/leaveRequests";

import MyLeaveFilters from "../components/LeaveFilters";
import MyLeaveColumnMenu from "../components/MyLeaveColumnMenu";
import MyLeaveTable from "../components/MyLeaveTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function MyLeavesPage() {
  const [filters, setFilters] = useState({
    status: "all", // default all status
  });

  const [visibleColumns, setVisibleColumns] = useState({
    start_date: true,
    end_date: true,
    reason: true,
    status: true,
    reviewer_note: true,
  });

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getMyLeaveRequests(filters);
      setRecords(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filters]);

  return (
    <>
      <PageHeader>My Leave Requests</PageHeader>

      {/* TOP ACTION BAR */}
      <div className="flex justify-between items-center mb-4">
        {/* Left — Filters */}
        <MyLeaveFilters filters={filters} setFilters={setFilters} />

        {/* Right — Columns + Create Button */}
        <div className="flex items-center gap-2">
          <MyLeaveColumnMenu
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />

          <Link to="/employee/leaves/create">
            <Button>Create Leave Request</Button>
          </Link>
        </div>
      </div>

      {/* TABLE / LOADING */}
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Spinner />
        </div>
      ) : (
        <MyLeaveTable data={records} visibleColumns={visibleColumns} />
      )}
    </>
  );
}
