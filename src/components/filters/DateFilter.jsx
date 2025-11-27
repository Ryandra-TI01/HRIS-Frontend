import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

/**
 * A filter component for selecting a specific date.
 *
 * @param {Object} props - Component props
 * @param {string} [props.value] - The current filter value
 * @param {Function} props.onChange - Callback function triggered when filter values change
 * @param {string} props.onChange.payload - Updated filter object with the selected date
 * 
 * @returns {React.ReactElement} A form section with a date input field
 * 
 * @example
 * const [dateFilter, setDateFilter] = useState("");
 * 
 * <DateFilter 
 *   value={dateFilter}
 *   onChange={setDateFilter}
 * />
 */
export default function DateFilter({ value, onChange }) {
  return (
    <Field className="space-y-2">
      <FieldLabel className="text-sm font-semibold">Specific Date</FieldLabel>
      <Input
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  );
}
