import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { List, LayoutGrid, RotateCcw } from "lucide-react";

export default function MySalaryFilter({
    selectedMonth,
    selectedYear,
    onFilterChange,
    onRefresh,
    viewMode,
    onViewModeChange,
}) {
    const months = [
        { value: "01", label: "January" },
        { value: "02", label: "February" },
        { value: "03", label: "March" },
        { value: "04", label: "April" },
        { value: "05", label: "May" },
        { value: "06", label: "June" },
        { value: "07", label: "July" },
        { value: "08", label: "August" },
        { value: "09", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ];


    const years = ["2023", "2024", "2025", "2026"];

    return (
        <div className="flex items-center gap-3 mb-6">

            {/* BULAN */}
            <Select
                value={selectedMonth}
                onValueChange={(v) => onFilterChange(v, selectedYear)}
            >
                <SelectTrigger className="w-[140px] h-8 text-sm">
                    <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                    {months.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                            {m.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* TAHUN */}
            <Select
                value={selectedYear}
                onValueChange={(v) => onFilterChange(selectedMonth, v)}
            >
                <SelectTrigger className="w-[120px] h-8 text-sm">
                    <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                    {years.map((y) => (
                        <SelectItem key={y} value={y}>
                            {y}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* ICON BUTTONS (kanan) */}
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
