export default function MyPerformanceTable({ data, visible }) {
  return (
    <div className="mt-4 border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {visible.period && <th className="p-3 text-left">Period</th>}
            {visible.total_star && <th className="p-3 text-left">Stars</th>}
            {visible.review_description && (
              <th className="p-3 text-left">Description</th>
            )}
            {visible.reviewer && <th className="p-3 text-left">Reviewer</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan={4}>
                No performance reviews found.
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="border-b">
                {visible.period && <td className="p-3">{item.period}</td>}

                {visible.total_star && (
                  <td className="p-3">{item.total_star} ⭐</td>
                )}

                {visible.review_description && (
                  <td className="p-3">{item.review_description}</td>
                )}

                {visible.reviewer && (
                  <td className="p-3">{item.reviewer?.name || "-"}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
