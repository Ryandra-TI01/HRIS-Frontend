import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";

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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import PageHeader from "../../../components/PageHeader";
import handleApiError from "../../../utils/handleApiError";

import { AlertCircleIcon, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";

import { Field, FieldLabel } from "../../../components/ui/field";
import { cn } from "@/lib/utils";
import { useDebounce } from "../../../hooks/DebounceSearch";
import { getEmployeesRequest } from "../../employees/api/employee";

import {
  getPerformanceByIdRequest,
  updatePerformanceRequest,
} from "../api/performance-reviews";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/AuthContext";

export default function PerformanceReviewEditPage() {
    const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingPage, setLoadingPage] = useState(true);
  const [open, setOpen] = useState(false);

  // SEARCH
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  // DATA
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const isFetchingRef = useRef(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  // FORM
  const [form, setForm] = useState({
    employee_id: "",
    employee_name: "",
    reviewer_id: "",
    period: "",
    total_star: "",
    review_description: "",
  });

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ------------------------------------------------------------
  // FETCH DETAIL DATA
  // ------------------------------------------------------------
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await getPerformanceByIdRequest(id);
        const data = res.data;

        setForm({
          employee_id: data.employee_id,
          employee_name: data.employee.user.name,
          reviewer_id: data.reviewer_id,
          period: data.period,
          total_star: String(data.total_star),
          review_description: data.review_description || "",
        });
      } catch (err) {
        setErrors(handleApiError(err));
      } finally {
        setLoadingPage(false);
      }
    };

    fetchDetail();
  }, [id]);

  // ------------------------------------------------------------
  // FETCH EMPLOYEES
  // ------------------------------------------------------------
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

      if (reset) setEmployees(newData);
      else setEmployees((prev) => [...prev, ...newData]);
    } catch (e) {
      console.error("Failed fetch employees", e);
    } finally {
      isFetchingRef.current = false;
    }
  };

  // SEARCH CHANGED
  useEffect(() => {
    setPage(1);
    fetchData(true);
  }, [debouncedSearch]);

  // PAGE CHANGED
  useEffect(() => {
    if (page === 1) return;
    fetchData(false);
  }, [page]);

  // ------------------------------------------------------------
  // UPDATE SUBMIT
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      await updatePerformanceRequest(id, form);
      toast.success("Performance review updated successfully!");
      navigate(`/${user.role === "admin_hr" ? "admin" : "manager"}/performance-reviews`);
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
            <BreadcrumbLink to="/admin/performance-reviews">
              Performance Reviews
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Review</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {loadingPage ? (
        <Loading />
      ) : (
        <>
          <PageHeader>
            Edit Performance Review for {form.employee_name}{" "}
          </PageHeader>
          {errors && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircleIcon />
              <AlertTitle>Please check the form.</AlertTitle>
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
                <CardTitle>Performance Review Details</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-6">
                {/* EMPLOYEE SELECT */}
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

                  {/* Stars */}
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

                {/* Review Description */}
                <Field>
                  <FieldLabel>Review Description</FieldLabel>
                  <Textarea
                    rows={10}
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
                {loading ? "Updating..." : "Update Review"}
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
