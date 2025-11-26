import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EmployementStatusSelect({ value, onChange }) {
  const statuses = ["permanent", "contract", "intern", "resigned"];
  return (
    <Select value={value || null} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Employment Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>All Status</SelectItem>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
