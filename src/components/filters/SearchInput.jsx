import { Input } from "@/components/ui/input";

/**
 * SearchInput component that displays a search input field.
 *
 * @example
 * <SearchInput
 *   value={searchFilter}
 *   onChange={(val) => setSearchFilter(val)}
 *   placeholder="Search by name or email..."
 * />
 */
export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <Input
      className="w-full sm:w-56"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
