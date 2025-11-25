import { Button } from "@/components/ui/button";
import MonthSelect from "../../../components/filters/MonthSelect";

export default function SalarySlipFilters({ filters, setFilters }) {

  return (
    <div className="flex flex-wrap gap-3 mb-4">
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
