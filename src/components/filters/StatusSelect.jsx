import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function StatusSelect({ value, onChange, className }) {
  return (
    <Select
      value={value || null}
      onValueChange={(v) => onChange(v === "" ? null : v)}
    >
      <SelectTrigger className={className || "w-[180px]"}>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={null}>All Status</SelectItem>
        <SelectItem value="Pending">Pending</SelectItem>
        <SelectItem value="Approved">Approved</SelectItem>
        <SelectItem value="Rejected">Rejected</SelectItem>
      </SelectContent>
    </Select>
  );
}