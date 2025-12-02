import MonthSelect from "../../../components/filters/MonthSelect";
import { Button } from "@/components/ui/button";

export default function MyAttendanceFilters({ filters, setFilters }) {
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
        {/* Month Filter */}
      <MonthSelect
        value={filters.date || ""}
        onChange={(val) => setFilters((f) => ({ ...f, date: val }))}
      />

      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={() => setFilters({})}>
          Reset
        </Button>
      )}
    </div>
  );
}
