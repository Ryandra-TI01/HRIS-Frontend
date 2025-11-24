import { Input } from "@/components/ui/input";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <Input
      className="w-56"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
