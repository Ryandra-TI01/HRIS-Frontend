import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";

export default function MyPerformanceFilters({ filters, setFilters, allRecords }) {

  // Ambil semua period unik
  const periods = [...new Set(allRecords.map((r) => r.period))];

  const handlePeriodChange = (value) => {
    setFilters({
      ...filters,
      period: value === "all" ? undefined : value,
    });
  };

  return (
    <div className="flex gap-3">
      <Select
        value={filters.period ?? "all"}
        onValueChange={handlePeriodChange}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Periods</SelectItem>

          {periods.map((p) => (
            <SelectItem key={p} value={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
