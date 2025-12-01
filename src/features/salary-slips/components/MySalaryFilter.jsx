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
    <div className="flex items-center gap-3 mb-6">
      
      {/* MONTH SELECT */}
      <MonthSelect
        value={month}
        onChange={(val) => onMonthChange(val)}
      />

      {/* YEAR SELECT */}
      <YearSelect
        value={year}
        onChange={(val) => onYearChange(val)}
        startYear={2010}
      />

      {/* RESET */}
      <Button variant="outline" className="h-8" onClick={onRefresh}>
        Reset
      </Button>

      {/* MODE + REFRESH */}
      <div className="flex items-center gap-2 ml-auto">
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

        <Button size="icon" variant="outline" className="h-8 w-8" onClick={onRefresh}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
