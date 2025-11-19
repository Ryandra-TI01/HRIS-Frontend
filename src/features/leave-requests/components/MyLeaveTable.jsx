import { Button } from "@/components/ui/button";

export default function MyLeaveTable({ data, visibleColumns }) {
  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {visibleColumns.start_date && <th className="p-3 text-left">Start</th>}
            {visibleColumns.end_date && <th className="p-3 text-left">End</th>}
            {visibleColumns.reason && <th className="p-3 text-left">Reason</th>}
            {visibleColumns.status && <th className="p-3 text-left">Status</th>}
            {visibleColumns.reviewer_note && (
              <th className="p-3 text-left">Reviewer Note</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No leave requests found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-b">
                {visibleColumns.start_date && (
                  <td className="p-3">{item.start_date?.slice(0, 10)}</td>
                )}
                {visibleColumns.end_date && (
                  <td className="p-3">{item.end_date?.slice(0, 10)}</td>
                )}
                {visibleColumns.reason && <td className="p-3">{item.reason}</td>}
                {visibleColumns.status && <td className="p-3">{item.status}</td>}
                {visibleColumns.reviewer_note && (
                  <td className="p-3">{item.reviewer_note ?? "-"}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
