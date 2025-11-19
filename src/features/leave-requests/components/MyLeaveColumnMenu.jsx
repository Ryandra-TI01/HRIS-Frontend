import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function MyLeaveColumnMenu({ visibleColumns, setVisibleColumns }) {
  const toggle = (key) => {
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Columns</Button>
      </PopoverTrigger>

      <PopoverContent className="w-48 p-3">
        {Object.keys(visibleColumns).map((column) => (
          <div key={column} className="flex items-center gap-2 mb-2">
            <Checkbox
              checked={visibleColumns[column]}
              onCheckedChange={() => toggle(column)}
            />
            <label className="text-sm capitalize">{column.replace("_", " ")}</label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
