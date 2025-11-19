export default function MyAttendanceTable({ data, visibleColumns }) {
  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {visibleColumns.date && <th className="p-3 text-left">Date</th>}
            {visibleColumns.check_in_time && (
              <th className="p-3 text-left">Check-in</th>
            )}
            {visibleColumns.check_out_time && (
              <th className="p-3 text-left">Check-out</th>
            )}
            {visibleColumns.work_hour && (
              <th className="p-3 text-left">Work Hours</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No attendance records found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-b">
                {visibleColumns.date && (
                  <td className="p-3">{item.date?.slice(0, 10)}</td>
                )}

                {visibleColumns.check_in_time && (
                  <td className="p-3">
                    {item.check_in_time
                      ? item.check_in_time.slice(11, 16)
                      : "-"}
                  </td>
                )}

                {visibleColumns.check_out_time && (
                  <td className="p-3">
                    {item.check_out_time
                      ? item.check_out_time.slice(11, 16)
                      : "-"}
                  </td>
                )}

                {visibleColumns.work_hour && (
                  <td className="p-3">{item.work_hour ?? "-"}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
