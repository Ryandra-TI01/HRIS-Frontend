import { useState, useEffect, useRef } from "react";
import { createPerformanceRequest } from "../api/performance-reviews";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

import { AlertCircleIcon, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import { Field, FieldLabel } from "../../../components/ui/field";
import { getEmployeesRequest } from "../../employees/api/employee";
import { cn } from "@/lib/utils";
import { useDebounce } from "../../../hooks/DebounceSearch";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/AuthContext";

export default function PerformanceReviewCreatePage() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // SEARCH state
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  // DATA state
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const isFetchingRef = useRef(false); // mencegah double fetch

  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    reviewer_id: "",
    period: "",
    total_star: "",
    review_description: "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // -------------------------------------------------------------------
  // FETCHING DATA
  // -------------------------------------------------------------------
  const fetchData = async (reset = false) => {
    if (isFetchingRef.current) return;

    isFetchingRef.current = true;

    try {
      const res = await getEmployeesRequest({
        search: debouncedSearch,
        page,
      });

      const newData = res.data?.data || [];

      setLastPage(res.data?.last_page || 1);

      if (reset) {
        setEmployees(newData); // replace data
      } else {
        setEmployees((prev) => [...prev, ...newData]);
      }
    } catch (e) {
      console.error("Failed to fetch employees", e);
    } finally {
      isFetchingRef.current = false;
    }
  };

  // -------------------------------------------------------------------
  // WHEN SEARCH CHANGES → RESET PAGE + FETCH NEW DATA
  // -------------------------------------------------------------------
  useEffect(() => {
    setPage(0);
    fetchData(true); // reset = true → replace data
  }, [debouncedSearch]);

  // -------------------------------------------------------------------
  // WHEN PAGE CHANGES → LOAD MORE DATA
  // -------------------------------------------------------------------
  useEffect(() => {
    if (page === 1) return; // sudah di-fetch oleh search handler
    fetchData(false);
  }, [page]);

  // -------------------------------------------------------------------
  // FORM SUBMIT
  // -------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await createPerformanceRequest(form);
      navigate(
        `/${user.role === "admin_hr" ? "admin" : "manager"}/performance-reviews`
      );
      toast.success("Performance Review created successfully!");

      setForm({
        employee_id: "",
        employee_name: "",
        reviewer_id: "",
        period: "",
        total_star: "",
        review_description: "",
      });
    } catch (err) {
      setErrors(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------
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
            <BreadcrumbLink to="/admin/performance-reviews">
              Performance Reviews
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Performance Review</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader>Create Performance Review</PageHeader>

      {/* ERROR HANDLER */}
      {errors && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircleIcon />
          <AlertTitle>Please check the form.</AlertTitle>
          <AlertDescription>
            <ul className="list-inside list-disc text-sm">
              {errors.split(", ").map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Review Details</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6">
            {/* EMPLOYEE SELECT (SEARCHABLE) */}
            <FieldLabel>Employee</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
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
                    <CommandEmpty>No results found.</CommandEmpty>

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
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Period */}
              <Field>
                <FieldLabel>Period (YYYY-MM)</FieldLabel>
                <Input
                  type="month"
                  value={form.period}
                  onChange={(e) => handleChange("period", e.target.value)}
                />
              </Field>

              {/* Star */}
              <Field>
                <FieldLabel>Total Star</FieldLabel>
                <Select
                  value={String(form.total_star)}
                  onValueChange={(v) => handleChange("total_star", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i} value={String(i + 1)}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </section>

            {/* Review */}
            <Field>
              <FieldLabel>Review Description</FieldLabel>
              <Textarea
                rows={10}
                placeholder="Write review..."
                value={form.review_description}
                onChange={(e) =>
                  handleChange("review_description", e.target.value)
                }
              />
            </Field>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="w-48" disabled={loading}>
            {loading ? "Saving..." : "Save Review"}
          </Button>
        </div>
      </form>
    </>
  );
}
