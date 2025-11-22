import { Input } from "@/components/ui/input";

export default function SearchInput({ value, onChange }) {
  return (
    <Input
      className="w-56"
      placeholder="Search name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
