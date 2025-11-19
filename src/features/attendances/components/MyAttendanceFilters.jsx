import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function MyAttendanceFilters({ filters, setFilters }) {
  const update = (key, val) => setFilters((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="flex gap-3">

      {/* Month */}
      <Select onValueChange={(v) => update("month", v)}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => {
            const m = String(i + 1).padStart(2, "0");
            return <SelectItem key={m} value={m}>{m}</SelectItem>;
          })}
        </SelectContent>
      </Select>

      {/* Exact Date */}
      <Input
        type="date"
        className="w-[150px]"
        value={filters.date || ""}
        onChange={(e) => update("date", e.target.value)}
      />

    </div>
  );
}
