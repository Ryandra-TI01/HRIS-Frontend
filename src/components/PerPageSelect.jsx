import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function PerPageSelect({
  perPage,
  onChange,
  options = [10, 25, 50, 100],
}) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap ms-4">
      <span>Rows per page:</span>

      <Select
        value={String(perPage)}
        onValueChange={(val) => onChange(Number(val))}
      >
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {options.map((num) => (
            <SelectItem key={num} value={String(num)}>
              {num}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
