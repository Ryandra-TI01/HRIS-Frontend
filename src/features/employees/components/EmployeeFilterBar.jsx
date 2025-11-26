import { Button } from "@/components/ui/button";
import SearchInput from "@/components/filters/SearchInput";
import { Filter } from "lucide-react";

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
        <Filter />
        {/* Badge */}
        {activeFilterCount > 0 && (
          <span className="rounded-full bg-white text-black text-xs px-2 py-0.5">
            {activeFilterCount}
          </span>
        )}
      </Button>
      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={() => setFilters({})}>
          Reset
        </Button>
      )}
    </div>
  );
}
