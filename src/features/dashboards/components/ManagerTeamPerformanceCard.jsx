export default function ManagerTeamPerformanceCard({
  avgTeamStars,
  reviews,
}) {
  return (
    <div className="mt-10 border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
      <h4 className="text-sm font-semibold mb-3">Team Performance</h4>

      <div className="mb-4 text-lg">
        Average Team Rating:{" "}
        <span className="text-emerald-500 font-semibold">
          {avgTeamStars} ★
        </span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Employee</th>
            <th className="py-2 text-left">Period</th>
            <th className="py-2 text-left">Total Star</th>
            <th className="py-2 text-left">Reviewer</th>
          </tr>
        </thead>

        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-4 text-muted-foreground"
              >
                No performance review data
              </td>
            </tr>
          ) : (
            reviews.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2">{r.employeeName}</td>
                <td className="py-2">{r.period}</td>
                <td className="py-2">{r.total_star} ★</td>
                <td className="py-2">{r.reviewerName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
