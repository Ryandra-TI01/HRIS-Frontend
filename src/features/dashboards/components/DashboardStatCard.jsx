import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardStatCard({ title, value, icon: Icon, accent }) {
  return (
    <Card
      className="
    rounded-xl 
    border border-white/10 
    bg-white/5 
    dark:bg-neutral-900/30
    p-6 
    shadow 
    relative 
    overflow-hidden
  "
    >
      {/* Gradient highlight */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/8 to-transparent dark:from-white/6" />

      <CardHeader className="relative z-10 flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {title}
        </CardTitle>
        {Icon && <Icon className={`h-5 w-5 ${accent}`} />}
      </CardHeader>

      <CardContent className="relative z-10">
        <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
