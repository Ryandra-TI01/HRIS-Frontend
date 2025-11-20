import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function MyPerformanceColumnMenu({ visible, setVisible }) {
  const toggle = (key) => {
    setVisible({ ...visible, [key]: !visible[key] });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Columns</Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-3 space-y-3">
        {Object.keys(visible).map((colKey) => (
          <div key={colKey} className="flex items-center gap-2">
            <Checkbox
              checked={visible[colKey]}
              onCheckedChange={() => toggle(colKey)}
            />
            <span className="capitalize">
              {colKey.replace("_", " ")}
            </span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
