import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import { getEmployeesRequest } from "../../employees/api/employee";
import {
  getSalarySlipRequest,
  updateSalarySlipRequest,
} from "../api/salary-slips";

import { useDebounce } from "../../../hooks/DebounceSearch";
import handleApiError from "../../../utils/handleApiError";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { Check, ChevronsUpDown, AlertCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Loading from "../../../components/Loading";
import PageHeader from "../../../components/PageHeader";

export default function SalarySlipEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  // Search employee
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const isFetchingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [errors, setErrors] = useState(null);

  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    period_month: "",
    basic_salary: "",
    allowance: "",
    deduction: "",
    remarks: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ------------------- FETCH SALARY SLIP -------------------
  const fetchSalarySlip = async () => {
    try {
      const res = await getSalarySlipRequest(id);
      const data = res.data;

      setForm({
        employee_id: data.employee.id,
        employee_name: data.employee.name,
        period_month: data.period_month,
        basic_salary: data.basic_salary,
        allowance: data.allowance,
        deduction: data.deduction,
        remarks: data.remarks,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load salary slip data");
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchSalarySlip();
  }, [id]);

  // ------------------- FETCH EMPLOYEES -------------------
  const fetchEmployees = async (reset = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      const res = await getEmployeesRequest({
        search: debouncedSearch,
        page,
      });

      const data = res.data.data || [];
      setLastPage(res.data.last_page || 1);

      if (reset) {
        setEmployees(data);
      } else {
        setEmployees((prev) => [...prev, ...data]);
      }
    } catch (e) {
      console.error("Employee fetch failed", e);
    } finally {
      isFetchingRef.current = false;
    }
  };

  // when search changes
  useEffect(() => {
    setPage(1);
    fetchEmployees(true);
  }, [debouncedSearch]);

  // when page increases
  useEffect(() => {
    if (page !== 1) fetchEmployees(false);
  }, [page]);

  // ------------------- UPDATE FORM -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await updateSalarySlipRequest(id, form);
      toast.success("Salary slip updated successfully!");
      navigate("/admin/salary-slips");
    } catch (err) {
      setErrors(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // ------------------- UI -------------------
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
            <BreadcrumbLink to="/admin/salary-slips">
              Salary Slips
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Salary Slip</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {loadingPage ? (
        <Loading />
      ) : (
        <>
          {/* page header */}
          <PageHeader>
            Edit Salary Slip for {form.employee_name}
          </PageHeader>

          {errors && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircleIcon />
              <AlertTitle>Please fix the errors</AlertTitle>
              <AlertDescription>
                <ul className="list-disc list-inside text-sm">
                  {errors.split(", ").map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Salary Slip Details</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-6">
                {/* EMPLOYEE SELECT */}
                <FieldLabel>Employee</FieldLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {form.employee_name || "Select employee"}
                      <ChevronsUpDown className="opacity-50 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[300px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search employee..."
                        value={search}
                        onValueChange={setSearch}
                        className="h-9"
                      />

                      <CommandList
                        className="max-h-60"
                        onScroll={(e) => {
                          const bottom =
                            e.target.scrollTop + e.target.clientHeight >=
                            e.target.scrollHeight - 5;
                          if (bottom && page < lastPage) {
                            setPage((prev) => prev + 1);
                          }
                        }}
                      >
                        <CommandEmpty>No employees found.</CommandEmpty>

                        <CommandGroup>
                          {employees.map((emp) => (
                            <CommandItem
                              key={emp.id}
                              onSelect={() => {
                                handleChange("employee_id", emp.id);
                                handleChange("employee_name", emp.user.name);
                                setOpen(false);
                              }}
                            >
                              {emp.user.name}
                              <Check
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  form.employee_id === emp.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* PERIOD */}
                <Field>
                  <FieldLabel>Period (YYYY-MM)</FieldLabel>
                  <Input
                    type="month"
                    value={form.period_month}
                    onChange={(e) =>
                      handleChange("period_month", e.target.value)
                    }
                  />
                </Field>

                {/* SALARY NUMBERS */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel>Basic Salary</FieldLabel>
                    <Input
                      type="number"
                      value={form.basic_salary}
                      onChange={(e) =>
                        handleChange("basic_salary", Number(e.target.value))
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Allowance</FieldLabel>
                    <Input
                      type="number"
                      value={form.allowance}
                      onChange={(e) =>
                        handleChange("allowance", Number(e.target.value))
                      }
                    />
                  </Field>

                  <Field>
                    <FieldLabel>Deduction</FieldLabel>
                    <Input
                      type="number"
                      value={form.deduction}
                      onChange={(e) =>
                        handleChange("deduction", Number(e.target.value))
                      }
                    />
                  </Field>
                </section>

                {/* REMARKS */}
                <Field>
                  <FieldLabel>Remarks</FieldLabel>
                  <Textarea
                    rows={5}
                    value={form.remarks || ""}
                    onChange={(e) => handleChange("remarks", e.target.value)}
                  />
                </Field>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" className="w-48" disabled={loading}>
                {loading ? "Saving..." : "Update Salary Slip"}
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
