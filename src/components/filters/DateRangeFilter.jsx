import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

export default function DateRangeFilter({ value, onChange }) {
  const { date_from, date_to } = value || {};

  const setValue = (key, val) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold">Date Range</label>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel className="block text-xs text-gray-500 mb-1">Min Date</FieldLabel>
          <Input
            type="date"
            value={date_from ?? ""}
            onChange={(e) => setValue("date_from", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel className="block text-xs text-gray-500 mb-1">Max Date</FieldLabel>
          <Input
            type="date"
            value={date_to ?? ""}
            onChange={(e) => setValue("date_to", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
