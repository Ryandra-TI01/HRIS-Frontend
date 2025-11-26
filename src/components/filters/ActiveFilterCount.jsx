export default function ActiveFilterCount({activeFilterCount}) {
  return (
    <>
      {/* Badge */}
      {activeFilterCount > 0 && (
        <span className="rounded-full bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-0.5">
          {activeFilterCount}
        </span>
      )}
    </>
  );
}
