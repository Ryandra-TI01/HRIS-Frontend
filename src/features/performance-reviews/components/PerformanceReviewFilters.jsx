import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PerformanceReviewFilters({ filters, setFilters }) {
  const currentYear = new Date().getFullYear();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const months = monthNames.map((name, index) => ({
    label: name,
    value: `${currentYear}-${String(index + 1).padStart(2, "0")}`,
  }));
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* Filter Month */}
      <Select
        value={filters.period || ""}
        onValueChange={(val) => setFilters((f) => ({ ...f, period: val }))}
      >
        <SelectTrigger className="w-40">Month</SelectTrigger>
        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={() => setFilters({})}>
        Reset
      </Button>
    </div>
  );
}
