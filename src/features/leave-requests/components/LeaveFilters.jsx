import StatusSelect from "../../../components/filters/StatusSelect";
import SearchInput from "../../../components/filters/SearchInput";
import { Button } from "../../../components/ui/button";
import { useAuth } from "../../../context/AuthContext";

export default function LeaveFilters({ filters, setFilters }) {
  const { user } = useAuth();
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex gap-3">
      {/* Search */}
      {(user.role === "manager" || user.role === "admin_hr") && (
        <SearchInput
          value={filters.search || ""}
          onChange={(val) => setFilters((f) => ({ ...f, search: val }))}
        />
      )}

      {/* STATUS */}
      <StatusSelect
        value={filters.statusn || null}
        onChange={(v) => handleChange("status", v)}
      />
      <Button variant="outline" onClick={() => setFilters({})}>
        Reset
      </Button>
    </div>
  );
}
