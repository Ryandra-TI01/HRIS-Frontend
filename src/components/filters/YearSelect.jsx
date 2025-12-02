import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function YearSelect({ value, onChange, startYear = 2010 }) {
  const currentYear = new Date().getFullYear();

  const years = [];
  for (let y = startYear; y <= currentYear; y++) {
    years.push(y.toString());
  }

  return (
    <Select value={value || null} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-40">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>All Year</SelectItem>
        {years.map((y) => (
          <SelectItem key={y} value={y}>
            {y}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
