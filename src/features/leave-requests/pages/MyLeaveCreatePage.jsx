import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/PageHeader";
import { createLeaveRequest } from "../api/leaveRequests";

export default function MyLeaveCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.start_date || !form.end_date || !form.reason.trim()) {
      return setError("All fields are required.");
    }

    if (form.end_date < form.start_date) {
      return setError("End date cannot be earlier than start date.");
    }

    try {
      setLoading(true);
      await createLeaveRequest(form);

      navigate("/employee/leave-requests"); // Redirect back
    } catch (err) {
      console.error("Create leave request failed:", err);
      setError("Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader>Create Leave Request</PageHeader>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mt-6 space-y-4 bg-card p-6 rounded-lg border"
      >
        {error && (
          <p className="text-red-500 text-sm font-medium">{error}</p>
        )}

        <div>
          <label className="block mb-1 font-medium">Start Date</label>
          <Input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">End Date</label>
          <Input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Reason</label>
          <Textarea
            name="reason"
            placeholder="Explain your leave reason..."
            value={form.reason}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Submitting..." : "Submit Leave Request"}
        </Button>
      </form>
    </div>
  );
}
