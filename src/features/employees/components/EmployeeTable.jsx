import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "../../../components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical, PenLine, Trash } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { deleteEmployeeRequest } from "../api/employee";
import { toast } from "sonner";

export default function EmployeeTable({
  data,
  visibleColumns,
  onPageChange,
  onRefresh,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const employees = data?.data || []; // <--- PAGINATED DATA
  const currentPage = data?.current_page || 1;
  const lastPage = data?.last_page || 1;

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "position", label: "Position" },
    { key: "department", label: "Department" },
    { key: "employment_status", label: "Employment Status" },
    { key: "manager", label: "Manager" },
    { key: "join_date", label: "Joined Date" },
    { key: "status_active", label: "Status" },
    { key: "contact", label: "Contact" },
    { key: "actions", label: "Action" },
  ];
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteEmployeeRequest(id);
      onRefresh(); // refresh data setelah delete
      toast.success("Employee deleted successfully.");
    } catch (error) {
      setError("Failed to delete employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            {columns
              .filter((c) => visibleColumns[c.key])
              .map((c) => (
                <TableHead key={c.key}>{c.label}</TableHead>
              ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              {visibleColumns.name && <TableCell>{emp.user.name}</TableCell>}
              {visibleColumns.email && <TableCell>{emp.user.email}</TableCell>}
              {visibleColumns.position && <TableCell>{emp.position}</TableCell>}
              {visibleColumns.department && (
                <TableCell>{emp.department}</TableCell>
              )}
              {visibleColumns.employment_status && (
                <TableCell>
                  <Badge
                    variant={
                      emp.employment_status === "permanent"
                        ? "outline"
                        : "default"
                    }
                  >
                    {emp.employment_status === "permanent"
                      ? "Permanent"
                      : "Contract"}
                  </Badge>
                </TableCell>
              )}
              {visibleColumns.manager && (
                <TableCell>{emp.manager ? emp.manager.name : "-"}</TableCell>
              )}
              {visibleColumns.join_date && (
                <TableCell>{emp.join_date.split("T")[0]}</TableCell>
              )}
              {visibleColumns.status_active && (
                <TableCell>
                  <Badge
                    variant={emp.user.status_active ? "outline" : "default"}
                  >
                    {emp.user.status_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
              )}
              {visibleColumns.contact && <TableCell>{emp.contact}</TableCell>}
              {visibleColumns.actions && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>

                      <Link to={`/admin/employees/edit/${emp.id}`}>
                        <DropdownMenuItem>
                          <PenLine className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the employee "{emp.user.name}"
                              from the database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(emp.id)}
                              disabled={loading}
                            >
                              {loading && <Spinner />}
                              {loading ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <Pagination>
        <PaginationContent>
          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            />
          </PaginationItem>

          {/* Current Page */}
          {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Ellipsis when not on last page */}
          {currentPage < lastPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              className={
                currentPage >= lastPage ? "pointer-events-none opacity-50" : ""
              }
              onClick={() =>
                currentPage < lastPage && onPageChange(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
