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
  title,
  description,
  data,
  dataKey = "value",
  xKey = "label",
  color = "#A3A3A3",
}) {
  return (
    <Card className="rounded-xl border border-white/10 bg-white/5 dark:bg-neutral-900/30 p-6 shadow">
      {title && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-slate-300">{title}</h3>
          {description && (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          )}
        </div>
      )}

      <div className="w-full h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                <stop offset="80%" stopColor={color} stopOpacity={0.05} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeOpacity={0.08} vertical={false} />

            <XAxis
              dataKey={xKey}
              stroke="#A3A3A3"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#A3A3A3"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15,15,15,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />

            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
