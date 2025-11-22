import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ManagerAttendanceChart({ data }) {
  return (
    <div className="border rounded-xl p-5 bg-white dark:bg-slate-900 shadow-sm">
      <h4 className="text-sm font-semibold mb-2">
        Team Attendance — Avg Work Hours
      </h4>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="avgHours"
            stroke="#10b981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
