import { Button } from "@/components/ui/button";
import SearchInput from "@/components/filters/SearchInput";
import { Filter } from "lucide-react";
import ActiveFilterCount from "../../../components/filters/ActiveFilterCount";

export default function EmployeeFilterBar({
  filters,
  setFilters,
  openFilters,
}) {
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      <SearchInput
        value={filters.search || ""}
        onChange={(val) => setFilters((prev) => ({ ...prev, search: val }))}
      />

      <Button variant="outline" onClick={openFilters}>
        {/* filter icon */}
        <Filter />

        {/* Badge */}
        <ActiveFilterCount activeFilterCount={activeFilterCount} />

      </Button>
      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={() => setFilters({})}>
          Reset
        </Button>
      )}
    </div>
  );
}
