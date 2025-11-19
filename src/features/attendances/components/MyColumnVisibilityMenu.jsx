import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function MyColumnVisibilityMenu({ visibleColumns, setVisibleColumns }) {
  const toggle = (c) =>
    setVisibleColumns((prev) => ({ ...prev, [c]: !prev[c] }));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Customize Columns</Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 space-y-2">
        {["date", "check_in_time", "check_out_time", "work_hour"].map((col) => (
          <label key={col} className="flex items-center gap-2">
            <Checkbox
              checked={visibleColumns[col]}
              onCheckedChange={() => toggle(col)}
            />
            <span className="capitalize">{col.replace(/_/g, " ")}</span>
          </label>
        ))}
      </PopoverContent>
    </Popover>
  );
}
