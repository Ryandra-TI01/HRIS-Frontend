import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

export function DashboardAreaChart({
  title = "Area Chart",
  description = "Showing total visitors for the last 3 months",
  data,
  dataKey = "value",
  xKey = "label",
  color = "#3B82F6", // tailwind blue-500
}) {
  return (
    <Card className="
      p-6 rounded-2xl
     
      shadow-sm dark:shadow-lg
    ">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {description}
          </p>
        )}
      </div>

      {/* CHART */}
      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* grid */}
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#9CA3AF22"
            />

            {/* x axis */}
            <XAxis
              dataKey={xKey}
              tick={{ fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            {/* y axis */}
            <YAxis
              tick={{ fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            {/* tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E1E1E",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "white",
              }}
            />

            {/* area */}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill="url(#areaColor)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
