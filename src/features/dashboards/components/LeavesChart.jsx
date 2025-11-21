// src/features/dashboard/components/LeavesChart.jsx
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

export default function LeavesChart({ data }) {
  // data: [{ month: 'Jan', leaves: 3 }, ...]
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm mt-4">
      <div className="mb-2 font-semibold">Leaves (monthly)</div>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="leaves" stroke="#059669" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
