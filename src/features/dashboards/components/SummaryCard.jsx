// src/features/dashboard/components/SummaryCards.jsx
import React from "react";

export default function SummaryCards({ stats = {} }) {
  const {
    totalHoursMonth = 0,
    avgHours = 0,
    leavesTaken = 0,
    leavesPending = 0,
    employeesTotal = 0,
    lastUpdated = "",
  } = stats;
  // stats: { totalHoursMonth, avgHours, leavesPending, leavesTaken, lastUpdated }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div className="text-sm text-muted-foreground">
          Total Working Hours (This Month)
        </div>
        <div className="mt-2 text-2xl font-semibold">
          {stats.totalHoursMonth ?? "-"} hrs
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Last updated: {stats.lastUpdated ?? "-"}
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div className="text-sm text-muted-foreground">Average Work Hours</div>
        <div className="mt-2 text-2xl font-semibold">
          {stats.avgHours ?? "-"} hrs
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Period: {stats.periodLabel ?? "This month"}
        </div>
      </div>

      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
        <div className="text-sm text-muted-foreground">Leaves</div>
        <div className="mt-2 text-2xl font-semibold">
          {stats.leavesTaken ?? 0} taken
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {stats.leavesPending ?? 0} pending
        </div>
      </div>
    </div>
  );
}
