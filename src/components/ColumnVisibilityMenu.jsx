import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Columns } from "lucide-react";

export default function ColumnVisibilityMenu({
  visibleColumns,
  setVisibleColumns,
}) {
  const [open, setOpen] = useState(false);

  const toggleColumn = (key) =>
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Columns className="w-4 h-4" />
          Customize Columns
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
              open ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[180px]">
        {Object.keys(visibleColumns).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={visibleColumns[key]}
            onCheckedChange={() => toggleColumn(key)}
            className="flex items-center gap-2"
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
