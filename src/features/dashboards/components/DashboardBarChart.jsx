import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardBarChart({
  title = "Bar Chart",
  description = "",
  data,
  dataKey = "value",
  xKey = "label",
  color = "#A3A3A3",
}) {
  return (
    <Card className="rounded-xl border border-white/10 bg-white/5 dark:bg-neutral-900/30 p-4 md:p-6 shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-base md:text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </CardTitle>

        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </CardHeader>

      <CardContent className="h-[220px] md:h-[280px] lg:h-[320px] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

            <XAxis
              dataKey={xKey}
              stroke="#9CA3AF"
              tick={{ fontSize: 10 }}
              interval="preserveStartEnd"
            />

            <YAxis
              stroke="#9CA3AF"
              width={28}
              tick={{ fontSize: 10 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "white",
              }}
            />

            <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
