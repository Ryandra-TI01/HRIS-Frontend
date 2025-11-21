import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function MonthSelect({ value, onChange }) {
  const currentYear = new Date().getFullYear();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const months = monthNames.map((name, index) => ({
    label: name,
    value: `${currentYear}-${String(index + 1).padStart(2, "0")}`,
  }));

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">Month</SelectTrigger>
      <SelectContent>
        {months.map((m) => (
          <SelectItem key={m.value} value={m.value}>
            {m.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
