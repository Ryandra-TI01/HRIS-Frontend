import { Button } from "@/components/ui/button";
import MonthSelect from "../../../components/filters/MonthSelect";
import SearchInput from "../../../components/filters/SearchInput";

export default function PerformanceReviewFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* Search */}
      <SearchInput
        value={filters.search || ""}
        onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
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
