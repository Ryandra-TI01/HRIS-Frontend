import { Button } from "@/components/ui/button";
import SearchInput from "../../../components/SearchInput";
import DepartmentSelect from "../../../components/DepartmentSelect";

export default function EmployeeFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4 items-center">
      {/* Search */}
      <SearchInput
        value={filters.search || ""}
        onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
      />
      <DepartmentSelect
        value={filters.department}
        onChange={(val) =>
          setFilters((f) => ({
            ...f,
            department: val,
          }))
        }
      />

      <Button variant="outline" onClick={() => setFilters({})}>
        Reset
      </Button>
    </div>
  );
}
