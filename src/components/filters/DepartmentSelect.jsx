import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

export default function DepartmentSelect({ value, onChange }) {
  return (
    <Select value={value || null} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>All Department</SelectItem>
        <SelectItem value="IT">IT</SelectItem>
        <SelectItem value="HR">HR</SelectItem>
        <SelectItem value="finance">Finance</SelectItem>
      </SelectContent>
    </Select>
  );
}
