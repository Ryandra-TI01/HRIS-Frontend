import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";

const departments = ["IT", "HR", "Finance", "Marketing"];

/**
 * DepartmentSelect component
 * @param {string|null} value - selected department
 * @param {function} onChange - callback to change selected department
 * @returns {JSX.Element} - DepartmentSelect component
 * @example
 * <DepartmentSelect value="IT" onChange={(val) => console.log(val)} />
 */
export default function DepartmentSelect({ value, onChange }) {
  return (
    <Select value={value || null} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Department" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>All Department</SelectItem>
        {departments.map((dept) => (
          <SelectItem key={dept} value={dept}>
            {dept}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
