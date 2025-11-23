import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardStatCard({ title, value, icon: Icon, accent }) {
  return (
    <Card
      className="p-4 rounded-2xl"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {title}
        </CardTitle>
        {Icon && <Icon className={`h-5 w-5 ${accent}`} />}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
