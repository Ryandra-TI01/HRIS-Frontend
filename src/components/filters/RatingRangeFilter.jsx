import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

/**
 * RatingRangeFilter component that displays a range input field for rating (0-10).
 *
 * @param {Object} props - Component props
 * @param {Object} props.value - The current filter value object with min_rating and max_rating properties
 * @param {Function} props.onChange - Callback function triggered when filter values change
 * @param {string} [props.title] - The title to display above the input fields
 *
 * @returns {React.ReactElement} A form section with two number input fields for rating range
 * 
 * @example
 * const [ratingFilter, setRatingFilter] = useState({ min_rating: 0, max_rating: 10 });
 * 
 * <RatingRangeFilter 
 *   value={ratingFilter}
 *   onChange={setRatingFilter}
 * />
*/
export default function RatingRangeFilter({
  value,
  onChange,
  title = "Rating Range",
}) {
  const { min_rating, max_rating } = value || {};

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
            Min Rate
          </FieldLabel>
          <Input
            type="number"
            min="0"
            max="10"
            value={min_rating ?? 0}
            onChange={(e) => setValue("min_rating", e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel className="block text-xs text-gray-500 mb-1">
            Max Rate
          </FieldLabel>
          <Input
            type="number"
            min="0"
            max="10"
            value={max_rating ?? 0}
            onChange={(e) => setValue("max_rating", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}
