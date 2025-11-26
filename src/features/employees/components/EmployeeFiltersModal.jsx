import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import DepartmentSelect from "@/components/filters/DepartmentSelect";
import EmployementStatusSelect from "@/components/filters/EmployementStatusSelect";
import ManagerSelect from "@/components/filters/ManagerSelect";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function EmployeeFiltersModal({
  open,
  onClose,
  filters,
  setFilters,
}) {
  const { user } = useAuth();
  const [localFilters, setLocalFilters] = useState(filters);

  // Sync when modal open
  useEffect(() => {
    if (open) setLocalFilters(filters);
  }, [open]);

  const applyFilters = () => {
    setFilters(localFilters); // Sync filters
    onClose();
  };

  const resetFilters = () => {
    setLocalFilters({});
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Employee Filters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-3">
          {user.role === "admin_hr" && (
            <Field>
              <FieldLabel>Department</FieldLabel>
              <DepartmentSelect
                value={localFilters.department || ""}
                onChange={(val) =>
                  setLocalFilters((f) => ({ ...f, department: val }))
                }
              />
            </Field>
          )}

          <Field>
            <FieldLabel>Employment Status</FieldLabel>
            <EmployementStatusSelect
              value={localFilters.employment_status || ""}
              onChange={(val) =>
                setLocalFilters((f) => ({ ...f, employment_status: val }))
              }
            />
          </Field>
          {user.role === "admin_hr" && (
            <Field>
              <FieldLabel>Manager</FieldLabel>
              <ManagerSelect
                value={localFilters.manager_id || ""}
                onChange={(val) =>
                  setLocalFilters((f) => ({ ...f, manager_id: val }))
                }
              />
            </Field>
          )}
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6 flex justify-between">
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
          <Button onClick={applyFilters}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
