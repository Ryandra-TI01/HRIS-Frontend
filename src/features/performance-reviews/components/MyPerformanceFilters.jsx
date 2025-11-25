import MonthSelect from "../../../components/filters/MonthSelect";
import { Button } from "../../../components/ui/button";

export default function MyPerformanceFilters({ filters, setFilters }) {
  return (
    <div className="flex gap-3">
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
