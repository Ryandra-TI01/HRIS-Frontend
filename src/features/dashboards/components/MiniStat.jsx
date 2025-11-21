import React from "react";

export default function MiniStat({ title, value, hint }) {
  return (
    <div className="bg-white/5 dark:bg-slate-800 rounded-xl p-4 border border-white/6">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </div>
  );
}
