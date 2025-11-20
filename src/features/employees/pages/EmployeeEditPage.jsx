import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../../components/ui/select";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../../components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../components/ui/breadcrumb";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "../../../components/ui/alert";
import { Field, FieldLabel } from "../../../components/ui/field";
import { AlertCircleIcon } from "lucide-react";

// utils
import handleApiError from "../../../utils/handleApiError";

// components
import PageHeader from "../../../components/PageHeader";
import Loading from "../../../components/Loading";

// api
import {
  updateEmployeeRequest,
  getEmployeeByIdRequest,
  getManagersRequest,
} from "../api/employee";
import { toast } from "sonner";

export default function EmployeeEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState(null);
  const [managers, setManagers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    status_active: true,
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
      setManagers(res.data);
      
    } catch (err) {
      console.error("Failed to fetch managers", err);
    }
  };

  // ===== trigger fetch managers =====
  useEffect(() => {
    fetchManagers();
  }, []);
      console.log(managers);
  // ===== trigger fetch employee =====
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getEmployeeByIdRequest(id);
        setForm({
          name: data.data.user.name || "",
          email: data.data.user.email || "",
          password: "",
          role: data.data.user.role || "employee",
          status_active: data.data.user.status_active,
          employee_code: data.data.employee_code || "",
          position: data.data.position || "",
          department: data.data.department || "",
          join_date: data.data.join_date?.split("T")[0] || "",
          employment_status: data.data.employment_status || "permanent",
          contact: data.data.contact || "",
          manager_id: data.data.manager.id || "",
        });
      } catch (err) {
        console.error(err);
        setErrors(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  // ===== handle form submit =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors(null);

    try {
      await updateEmployeeRequest(id, form);
      toast.success("Employee updated successfully!");
      navigate("/admin/employees");
    } catch (err) {
      setErrors(handleApiError(err));
    } finally {
      setSaving(false);
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
            <BreadcrumbPage>Edit Employee</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader>Edit Employee</PageHeader>

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

      {/* Form */}
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
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
                  <FieldLabel>Password (optional)</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Leave blank to keep existing password"
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
                      value={form.status_active ? "true" : "false"}
                      onValueChange={(v) =>
                        handleChange("status_active", v === "true")
                      }
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

          {/* Employee Details */}
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
                      onChange={(e) =>
                        handleChange("join_date", e.target.value)
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Employment Status</FieldLabel>
                    <Select
                      value={form.employment_status}
                      onValueChange={(v) =>
                        handleChange("employment_status", v)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment" />
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
            <Button type="submit" className="w-40" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
