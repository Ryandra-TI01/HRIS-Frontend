/**
 * A component that displays a summary of a table's data.
 * It takes three props: `from`, `to`, and `total`.
 * `from` and `to` are the start and end range of the data being displayed.
 * `total` is the total number of records in the table.
 * If `total` is undefined, the component does not render anything.
 *
 * @example
 * <TableSummary from={1} to={10} total={50} />
 *
 * @returns A JSX element containing a summary of the table's data.
 */
export default function TableSummary({ from, to, total }) {
  return (
    <>
      {total !== undefined && (
        <div className="mb-4 mt-6 text-sm font-medium text-muted-foreground dark:text-muted-foreground">
          Showing <span className="font-semibold text-foreground me-1">{from}</span>–
          <span className="font-semibold text-foreground ms-1">{to}</span> of{" "}
          <span className="font-semibold text-foreground">{total}</span> records
        </div>
      )}
    </>
  );
}
