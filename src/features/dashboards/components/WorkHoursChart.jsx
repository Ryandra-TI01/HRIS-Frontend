// src/features/dashboard/components/WorkHoursChart.jsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function WorkHoursChart({ data }) {
  // data: [{ date: '2025-11-01', hours: 8 }, ...]
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm mt-4">
      <div className="mb-2 font-semibold">Work Hours (daily)</div>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
