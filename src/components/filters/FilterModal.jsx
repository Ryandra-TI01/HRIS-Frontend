import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

/**
 * FilterModal component that displays a dialog with a local copy of filters and children.
 * Children can access the local filters and setLocalFilters via render props.
 *
 * @example
 * <FilterModal
 *   open={isOpen}
 *   onOpenChange={(isOpen) => setIsOpen(isOpen)}
 *   filters={filters}
 *   setFilters={(nextFilters) => setFilters(nextFilters)}
 * >
 *   {(localFilters, setLocalFilters) => (
 *     <div>
 *       <SearchInput
 *         value={localFilters.search || ""}
 *         onChange={(val) => setLocalFilters((f) => ({ ...f, search: val }))}
 *       />
 *     </div>
 *   )}
 * </FilterModal>
 */
export default function FilterModal({
  open,
  onOpenChange,
  filters,
  setFilters,
  children,
}) {
  // local copy of filters — changes here won't affect parent until Apply
  const [localFilters, setLocalFilters] = useState(filters || {});

  // when modal opens, sync the parent filters into local state
  useEffect(() => {
    if (open) setLocalFilters(filters || {});
  }, [open, filters]);

  const handleApply = () => {
    setFilters(localFilters || {});
    onOpenChange(false);
  };

  return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="
            w-[90%]            /* mobile almost full width */
            max-w-md           /* default desktop width */
            sm:max-w-lg        /* bigger on larger screens */
            p-4 sm:p-6         /* responsive padding */
          "
        >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Filters</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-3">
          {/* children is a render prop that gets localFilters & setLocalFilters,
              if children is a function we call it, otherwise we render children directly
           */}
          {typeof children === "function"
            ? children(localFilters, setLocalFilters)
            : children}
        </div>

        <DialogFooter className="mt-6 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Apply</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
