export default function ManagerFilters({
  filterType,
  setFilterType,
  rangeStart,
  rangeEnd,
  setRangeStart,
  setRangeEnd,
}) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <label className="text-sm">Filter:</label>

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="px-3 py-2 rounded bg-white dark:bg-slate-800"
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="range">Custom Range</option>
      </select>

      {filterType === "range" && (
        <>
          <input
            type="date"
            value={rangeStart}
            onChange={(e) => setRangeStart(e.target.value)}
            className="px-3 py-2 rounded bg-white dark:bg-slate-800"
          />

          <input
            type="date"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(e.target.value)}
            className="px-3 py-2 rounded bg-white dark:bg-slate-800"
          />
        </>
      )}
    </div>
  );
}
