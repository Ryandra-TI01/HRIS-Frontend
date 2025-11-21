import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function DepartmentSelect({ value, onChange }) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="w-40">Department</SelectTrigger>
      <SelectContent>
        <SelectItem value="IT">IT</SelectItem>
        <SelectItem value="HR">HR</SelectItem>
        <SelectItem value="finance">Finance</SelectItem>
      </SelectContent>
    </Select>
  );
}
