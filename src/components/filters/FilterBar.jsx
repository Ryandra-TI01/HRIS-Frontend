import { Button } from "@/components/ui/button";
import SearchInput from "./SearchInput";
import { Filter } from "lucide-react";
import ActiveFilterCount from "./ActiveFilterCount";

/**
 * FilterBar component that displays a search input, a filter button with an active-filters badge,
 * and a conditional Reset button when any filters are active.
 *
 * The component derives the number of active filters by counting truthy values on the `filters` object.
 * The search input binds to `filters.search` and updates the filters via `setFilters`.
 *
 * @example
 * <FilterBar
 *   filters={{ search: 'Alice', department: 'engineering' }}
 *   setFilters={(updater) => setFilters(updater)}
 *   openFilters={() => setIsFilterPanelOpen(true)}
 * />
 *
 * @param {Object} props
 * @param {Object<string, any>} props.filters - Map of filter keys to values. Truthy values are considered "active".
 *   Expected to optionally include a `search` string used by the SearchInput.
 * @param {(next: Object<string, any> | ((prev: Object<string, any>) => Object<string, any>)) => void} props.setFilters
 *   - Setter function for filters. Accepts either a full filters object or an updater function that receives the previous filters
 *     and returns the next filters object. The component uses this to update the `search` key and to reset all filters.
 * @param {() => void} props.openFilters - Callback invoked to open the advanced/side filter UI when the filter button is clicked.
 *
 * @returns {JSX.Element} A horizontal bar containing the search input, filter button with active count badge, and a Reset button when filters are active.
 *
 * Behavior details:
 * - activeFilterCount is computed as Object.values(filters).filter(Boolean).length.
 * - Clicking the filter button calls openFilters.
 * - Clicking Reset (shown only when activeFilterCount > 0) calls setFilters({}) to clear all filters.
 */
export default function FilterBar({ filters, setFilters, openFilters }) {
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-start sm:items-center w-full">
      <SearchInput
        value={filters.search || ""}
        onChange={(val) => setFilters((prev) => ({ ...prev, search: val }))}
        className="w-full sm:w-auto"
      />

      <Button
        variant="outline"
        onClick={openFilters}
        className="w-full sm:w-auto flex items-center gap-2"
      >
        <Filter />
        <ActiveFilterCount activeFilterCount={activeFilterCount} />
      </Button>

      {activeFilterCount > 0 && (
        <Button
          variant="outline"
          onClick={() => setFilters({})}
          className="w-full sm:w-auto"
        >
          Reset
        </Button>
      )}
    </div>
  );
}
