// WorkHourRangeFilter.jsx
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

/**
 * @component
 * @param {Object} props - Component props
 * @param {Object} [props.value] - The current filter value object
 * @param {number} [props.value.min_work_hour] - The minimum work hour value
 * @param {number} [props.value.max_work_hour] - The maximum work hour value
 * @param {Function} props.onChange - Callback function triggered when filter values change
 * @param {Object} props.onChange.payload - Updated filter object with min_work_hour and/or max_work_hour
 * 
 * @returns {React.ReactElement} A form section with two number input fields for work hour range
 * 
 * @example
 * const [workHourFilter, setWorkHourFilter] = useState({ min_work_hour: 1, max_work_hour: 8 });
 * 
 * <WorkHourRangeFilter 
 *   value={workHourFilter}
 *   onChange={setWorkHourFilter}
 * />
 */
export default function WorkHourRangeFilter({ value, onChange }) {
  const { min_work_hour, max_work_hour } = value || {};

  const setValue = (key, val) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold">Work Hour Range (Hours)</label>

      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel className="block text-xs text-gray-500 mb-1">Min Hours</FieldLabel>
          <Input
            type="number"
            step="0.1"
            placeholder="e.g. 1"
            value={min_work_hour ?? ""}
            onChange={(e) => setValue("min_work_hour", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel className="block text-xs text-gray-500 mb-1">Max Hours</FieldLabel>
          <Input
            type="number"
            step="0.1"
            placeholder="e.g. 8"
            value={max_work_hour ?? ""}
            onChange={(e) => setValue("max_work_hour", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
