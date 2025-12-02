/**
 * A wrapper component for filters.
 *
 * It renders a full-width flex container that is vertically stacked on small screens and horizontally stacked on larger screens.
 * The container is centered horizontally and has a gap of 4 units between elements.
 *
 * The component is designed to be used as a container for filters, such as SearchInput, MonthSelect, YearSelect, etc.
 *
 * @example
 * <FilterWrapper>
 *   <SearchInput />
 *   <MonthSelect />
 *   <YearSelect />
 * </FilterWrapper>
 */
export default function FilterWrapper({ children }) {
  return (
    <div
      className="
        w-full 
        flex flex-col 
        gap-4 
        sm:flex-row 
        sm:items-center 
        sm:justify-between
      "
    >
      {children}
    </div>
  );
}
