export default function ManagerWorkHoursCard({ avgWorkHours }) {
  return (
    <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
      <h4 className="text-sm font-semibold mb-2">Avg Work Hours</h4>
      <div className="text-3xl font-bold">{avgWorkHours}h</div>
      <p className="text-xs text-muted-foreground mt-2">
        Rata-rata jam kerja tim
      </p>
    </div>
  );
}
