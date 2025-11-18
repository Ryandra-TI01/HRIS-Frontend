import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ColumnVisibilityMenu({
  visibleColumns,
  setVisibleColumns,
}) {
  const toggleColumn = (key) =>
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Customize Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(visibleColumns).map((key) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={visibleColumns[key]}
            onCheckedChange={() => toggleColumn(key)}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
