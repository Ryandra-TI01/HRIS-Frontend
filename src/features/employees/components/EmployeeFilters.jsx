import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function EmployeeFilters({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Select
        value={filters.employment_status || ""}
        onValueChange={(val) => setFilters(f => ({ ...f, employment_status: val }))}
      >
        <SelectTrigger className="w-40">Status Employee</SelectTrigger>
        <SelectContent>
          <SelectItem value="permanent">Permananet</SelectItem>
          <SelectItem value="contract">Contract</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.department || ""}
        onValueChange={(val) => setFilters(f => ({ ...f, department: val }))}
      >
        <SelectTrigger className="w-40">Department</SelectTrigger>
        <SelectContent>
          <SelectItem value="IT">IT</SelectItem>
          <SelectItem value="HR">HR</SelectItem>
          <SelectItem value="finance">Finance</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={() => setFilters({})}>
        Reset
      </Button>
    </div>
  );
}
