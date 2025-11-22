import { Button } from "@/components/ui/button";
import MonthSelect from "../../../components/filters/MonthSelect";
import SearchInput from "../../../components/filters/SearchInput";

export default function AttendanceFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      {/* Search */}
      <SearchInput
        value={filters.search || ""}
        onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
      />

      {/* Month Filter */}
      <MonthSelect
        value={filters.month || ""}
        onChange={(val) => setFilters((f) => ({ ...f, month: val }))}
      />

      <Button variant="outline" onClick={() => setFilters({})}>
        Reset
      </Button>
    </div>
  );
}
