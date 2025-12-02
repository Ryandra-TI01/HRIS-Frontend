import { useState, useEffect } from "react";
import { createEmployeeRequest, getManagersRequest } from "../api/employee";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import PageHeader from "../../../components/PageHeader";
import handleApiError from "../../../utils/handleApiError";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";
import {
    Field, FieldLabel
} from "../../../components/ui/field";
import { useNavigate } from "react-router";
export default function EmployeeCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [managers, setManagers] = useState([]);
  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    status_active: "true",
    employee_code: "",
    position: "",
    department: "",
    join_date: "",
    employment_status: "permanent",
    contact: "",
    manager_id: "",
  });

  // ===== Handle input change ======
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ===== fetch Managers =====
  const fetchManagers = async () => {
    try {
      const res = await getManagersRequest();
      setManagers(res.data); // API returns {id, name, email, role}
    } catch (e) {
      console.error("Failed to fetch managers", e);
    }
  };

  // ===== trigger fetch Managers =====
  useEffect(() => {
    fetchManagers();
  }, []);
  
  // ===== Handle form submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await createEmployeeRequest(form);
      toast.success("Employee created successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        role: "employee",
        status_active: "true",
        employee_code: "",
        position: "",
        department: "",
        join_date: "",
        employment_status: "permanent",
        contact: "",
        manager_id: "",
      });
      navigate("/admin/employees");
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
            <BreadcrumbLink to="/admin/employees">Employees</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Employee</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader>Create New Employee</PageHeader>

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
        {/* USER ACCOUNT */}
        <Card>
          <CardHeader>
            <CardTitle>User Account</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </Field>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Role</FieldLabel>
                  <Select
                    value={form.role}
                    onValueChange={(v) => handleChange("role", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="admin_hr">Admin HR</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select
                    value={form.status_active}
                    onValueChange={(v) => handleChange("status_active", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </section>
          </CardContent>
        </Card>

        {/* EMPLOYEE DETAILS */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Position</FieldLabel>
                <Input
                  value={form.position}
                  onChange={(e) => handleChange("position", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel>Department</FieldLabel>
                <Input
                  value={form.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                />
              </Field>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Join Date</FieldLabel>
                  <Input
                    type="date"
                    value={form.join_date}
                    onChange={(e) => handleChange("join_date", e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel>Employment Status</FieldLabel>
                  <Select
                    value={form.employment_status}
                    onValueChange={(v) => handleChange("employment_status", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="permanent">Permanent</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Contact</FieldLabel>
                  <Input
                    value={form.contact}
                    onChange={(e) => handleChange("contact", e.target.value)}
                  />
                </Field>

                {/* Manager */}
                <Field>
                  <FieldLabel>Manager</FieldLabel>
                  <Select
                    value={String(form.manager_id)}
                    onValueChange={(v) => handleChange("manager_id", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>

                    <SelectContent>
                      {managers.map((m) => (
                        <SelectItem key={m.id} value={String(m.id)}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="w-40" disabled={loading}>
            {loading ? "Saving..." : "Save Employee"}
          </Button>
        </div>
      </form>
    </>
  );
}
