import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/PageHeader";
import { createLeaveRequest } from "../api/leaveRequests";
import { toast } from "sonner";
import handleApiError from "../../../utils/handleApiError";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AlertCircleIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Field, FieldLabel } from "../../../components/ui/field";

export default function MyLeaveCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    reason: "",
  });

  // ===== Handle input change ======
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await createLeaveRequest(form);
      toast.success("Leave request created successfully!");
      navigate("/employee/leave-requests");
    } catch (err) {
      setErrors(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink to="/admin/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink to="/employee/leave-requests">My Leaves</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Leave Request</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>Create Leave Request</PageHeader>

      {/* BE Error */}
      {errors && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon />
          <AlertTitle>Please check the form and try again.</AlertTitle>
          <AlertDescription>
            <ul className="list-inside list-disc text-sm">
              {errors.split(", ").map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Leave Details</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel className="block mb-1 font-medium">
                  Start Date
                </FieldLabel>
                <Input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={(e) => handleChange("start_date", e.target.value)}

                />
              </Field>

              <Field>
                <FieldLabel className="block mb-1 font-medium">
                  End Date
                </FieldLabel>
                <Input
                  type="date"
                  name="end_date"
                  value={form.end_date}
                  onChange={(e) => handleChange("end_date", e.target.value)}

                />
              </Field>
            </section>

            <Field>
              <FieldLabel className="block mb-1 font-medium">Reason</FieldLabel>
              <Textarea
                name="reason"
                placeholder="Explain your leave reason..."
                value={form.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
              />
            </Field>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Leave Request"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}
