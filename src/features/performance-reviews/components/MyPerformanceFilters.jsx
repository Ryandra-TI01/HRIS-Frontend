import { act } from "react";
import MonthSelect from "../../../components/filters/MonthSelect";
import { Button } from "../../../components/ui/button";

export default function MyPerformanceFilters({ filters, setFilters }) {
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="flex gap-3">
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
