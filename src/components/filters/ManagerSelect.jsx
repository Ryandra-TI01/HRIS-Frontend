import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import API from "../../lib/https";
import { Spinner } from "../ui/spinner";

export default function ManagerSelect({ value, onChange }) {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getManagersRequest = async () => {
    const res = await API.get("/employees/managers");
    return res.data;
  };
  const fetchManagers = async () => {
    try {
      setLoading(true);
      const res = await getManagersRequest();
      setManagers(res.data);
    } catch (e) {
      console.error("Failed to fetch managers", e);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <Select value={value || null} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select Manager" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>All Manager {loading && <Spinner /> }</SelectItem>
        {managers.map((mgr) => (
          <SelectItem key={mgr.id} value={mgr.id}>
            {mgr.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
