import MonthSelect from "../../../components/filters/MonthSelect";
import YearSelect from "../../../components/filters/YearSelect";
import { Button } from "@/components/ui/button";
import { List, LayoutGrid, RotateCcw } from "lucide-react";

export default function MySalaryFilter({
  month,
  year,
  onMonthChange,
  onYearChange,
  onRefresh,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div
      className="
        flex flex-col gap-3 mb-6 
        sm:flex-row sm:items-center sm:justify-between
      "
    >
      {/* LEFT SIDE: Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <MonthSelect value={month} onChange={(val) => onMonthChange(val)} />

        <YearSelect
          value={year}
          onChange={(val) => onYearChange(val)}
          startYear={2010}
        />

        <Button
          variant="outline"
          className="h-8 sm:w-auto w-full"
          onClick={onRefresh}
        >
          Reset
        </Button>
      </div>

      {/* RIGHT SIDE: Buttons */}
      <div className="flex items-center gap-2 sm:ml-0 ml-auto">
        <Button
          size="icon"
          variant={viewMode === "list" ? "default" : "outline"}
          className="h-8 w-8"
          onClick={() => onViewModeChange("list")}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant={viewMode === "grid" ? "default" : "outline"}
          className="h-8 w-8"
          onClick={() => onViewModeChange("grid")}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>

        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8"
          onClick={onRefresh}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
