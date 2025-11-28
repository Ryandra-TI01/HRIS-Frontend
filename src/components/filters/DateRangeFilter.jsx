import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

/**
 * DateRangeFilter component that displays a date range input field.
 *
 * @param {Object} value - The current filter value object with date_from and date_to properties
 * @param {Function} onChange - Callback function triggered when filter values change
 *
 * @returns {React.ReactElement} A form section with two date input fields for date range
 *
 * @example
 * const [dateFilter, setDateFilter] = useState({ date_from: "", date_to: "" });
 *
 * <DateRangeFilter
 *   value={dateFilter}
 *   onChange={setDateFilter}
 * />
 */
export default function DateRangeFilter({
  value,
  onChange,
  title = "Date Range",
}) {
  const { date_from, date_to } = value || {};

  const setValue = (key, val) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold">{title}</label>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel className="block text-xs text-gray-500 mb-1">
            Min Date
          </FieldLabel>
          <Input
            type="date"
            value={date_from ?? ""}
            onChange={(e) => setValue("date_from", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel className="block text-xs text-gray-500 mb-1">
            Max Date
          </FieldLabel>
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
