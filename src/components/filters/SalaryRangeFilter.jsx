// SalaryRangeFilter.jsx
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";

/**
 * Format number to thousands format (e.g. 1000000 -> "1.000.000")
 */
function formatNumber(value) {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Convert formatted text back to raw number
 * e.g. "1.000.000" -> 1000000
 */
function unformatNumber(value) {
  if (!value) return "";
  return value.replace(/\./g, "");
}

export default function SalaryRangeFilter({ value, onChange }) {
  const {
    salary_from,
    salary_to,
    total_from,
    total_to,
  } = value || {};

  const setValue = (key, val) => {
    // remove dots -> convert to number string
    const raw = unformatNumber(val);

    onChange({
      ...value,
      [key]: raw,
    });
  };

  return (
    <div className="space-y-6">

      {/* BASIC SALARY */}
      <div>
        <label className="text-sm font-semibold block mb-2">
          Basic Salary Range (IDR)
        </label>

        <div className="grid grid-cols-2 gap-4">
          
          {/* MIN BASIC */}
          <Field>
            <FieldLabel className="block text-xs text-gray-500 mb-1">
              Min Basic Salary
            </FieldLabel>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 3.000.000"
              value={formatNumber(salary_from)}
              onChange={(e) => setValue("salary_from", e.target.value)}
            />
          </Field>

          {/* MAX BASIC */}
          <Field>
            <FieldLabel className="block text-xs text-gray-500 mb-1">
              Max Basic Salary
            </FieldLabel>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 7.000.000"
              value={formatNumber(salary_to)}
              onChange={(e) => setValue("salary_to", e.target.value)}
            />
          </Field>

        </div>
      </div>

      {/* TOTAL SALARY */}
      <div>
        <label className="text-sm font-semibold block mb-2">
          Total Salary Range (IDR)
        </label>

        <div className="grid grid-cols-2 gap-4">

          {/* MIN TOTAL */}
          <Field>
            <FieldLabel className="block text-xs text-gray-500 mb-1">
              Min Total Salary
            </FieldLabel>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 5.000.000"
              value={formatNumber(total_from)}
              onChange={(e) => setValue("total_from", e.target.value)}
            />
          </Field>

          {/* MAX TOTAL */}
          <Field>
            <FieldLabel className="block text-xs text-gray-500 mb-1">
              Max Total Salary
            </FieldLabel>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 12.000.000"
              value={formatNumber(total_to)}
              onChange={(e) => setValue("total_to", e.target.value)}
            />
          </Field>

        </div>
      </div>

    </div>
  );
}
