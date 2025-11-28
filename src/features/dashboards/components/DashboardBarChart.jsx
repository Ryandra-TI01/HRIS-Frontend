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
    <Card className="rounded-xl border border-white/10 bg-white/5 dark:bg-neutral-900/30 p-6 shadow">

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        )}
      </CardHeader>

      <CardContent className="h-[300px] flex items-center">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />

            <XAxis dataKey={xKey} stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />

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
