import StatusSelect from "../../../components/filters/StatusSelect";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../context/AuthContext";
import MonthSelect from "../../../components/filters/MonthSelect";

export default function LeaveFilters({ filters, setFilters }) {
  const { user } = useAuth();
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex gap-3">
      {/* Status */}
      <StatusSelect
        value={filters.status || null}
        onChange={(v) => handleChange("status", v)}
      />
      {/* Month Filter */}
      <MonthSelect
        value={filters.period || ""}
        onChange={(val) => setFilters((f) => ({ ...f, period: val }))}
      />

      <Button variant="outline" onClick={() => setFilters({})}>
        Reset
      </Button>
    </div>
  );
}
