import MonthSelect from "../../../components/filters/MonthSelect";
import { Button } from "@/components/ui/button";

export default function MyAttendanceFilters({ filters, setFilters }) {
  return (
    <div className="flex gap-3">
      {/* Month Filter */}
      <MonthSelect
        value={filters.date || ""}
        onChange={(val) => setFilters((f) => ({ ...f, date: val }))}
      />

      <Button variant="outline" onClick={() => setFilters({})}>
        Reset
      </Button>
    </div>
  );
}
