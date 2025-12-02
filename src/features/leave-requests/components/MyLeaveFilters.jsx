import StatusSelect from "../../../components/filters/StatusSelect";
import { Button } from "../../../components/ui/button";
import MonthSelect from "../../../components/filters/MonthSelect";

export default function LeaveFilters({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Status */}
      <StatusSelect
        className="w-full sm:w-[180px]"
        value={filters.status || null}
        onChange={(v) => handleChange("status", v)}
      />
      {/* Month Filter */}
      <MonthSelect
        value={filters.period || ""}
        onChange={(val) => setFilters((f) => ({ ...f, period: val }))}
      />
      {activeFilterCount > 0 && (        
        <Button variant="outline" onClick={() => setFilters({})}>
          Reset
        </Button>
      )}
    </div>
  );
}
