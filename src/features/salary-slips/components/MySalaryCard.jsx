import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const formatRupiah = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);

const formatMonth = (period) => {
  const [year, month] = period.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};

export default function MySalaryCard({ slip, viewMode }) {
  return (
    <Card
      className={
        viewMode === "list"
          ? "border rounded-xl shadow-sm p-4 transition-colors bg-card"
          : "border rounded-xl shadow-sm p-4 transition-colors bg-card"
      }
    >
      {/* Header */}
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-xl font-semibold">
          {formatMonth(slip.period_month)}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-0 space-y-4">
        {/* Summary Box */}
        <div className="rounded-lg bg-muted/40 p-4 border dark:bg-muted/30">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Basic Salary</span>
            <span className="font-medium">{formatRupiah(slip.basic_salary)}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span className="text-muted-foreground">Allowance</span>
            <span className="font-medium">{formatRupiah(slip.allowance)}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span className="text-muted-foreground">Deduction</span>
            <span className="font-medium">{formatRupiah(slip.deduction)}</span>
          </div>
        </div>

        {/* Total Salary */}
        <div className="flex justify-between items-center pt-3 border-t">
          <span className="text-sm font-medium">Net Salary</span>
          <span className="text-base font-semibold">
            {formatRupiah(
              slip.basic_salary + slip.allowance - slip.deduction
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
