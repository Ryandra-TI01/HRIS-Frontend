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
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PenLine, Star, Trash } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { deletePerformanceRequest } from "../api/performance-reviews";
import { toast } from "sonner";
import MainLayoutWrapper from "../../../components/MainLayoutWrapper";
import { formatDate, formatDateTime } from "../../../components/FormatDateTime";
import { Spinner } from "../../../components/ui/spinner";

export default function PerformanceReviewTable({
  data,
  visibleColumns,
  onPageChange,
  onRefresh,
}) {
  const [loading, setLoading] = useState(false);
  const [setError] = useState(null);

  const performanceReview = data?.data || []; // <--- PAGINATED DATA
  const currentPage = data?.current_page || 1;
  const lastPage = data?.last_page || 1;

  const columns = [
    {
      key: "no",
      label: "No",
      render: (row, index) => {
        const perPage = data?.per_page || 20;
        const currentPage = data?.current_page || 1;

        return (currentPage - 1) * perPage + index + 1;
      },
    },
    ,
    {
      key: "employee_name",
      label: "Employee",
      render: (row) => row.employee.user.name,
    },
    {
      key: "reviewer_name",
      label: "Reviewer",
      render: (row) => row.reviewer?.name || "-",
    },
    { key: "period", label: "Period", render: (row) => formatDate(row.period) },
    {
      key: "total_star",
      label: "Total Score",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span>{row.total_star}</span>
          <Star className="ms-2 w-4 h-4 text-yellow-500" />
        </div>
      ),
    },
    {
      key: "created_at",
      label: "Creation Date",
      render: (row) => formatDateTime(row.created_at),
    },
    {
      key: "actions",
      label: "Action",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>

            <Link to={`/admin/performance-reviews/edit/${row.id}`}>
              <DropdownMenuItem>
                <PenLine className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will delete "
                    {row.employee.user.name} Review".
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.id)}
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
      ),
    },
  ];
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deletePerformanceRequest(id);
      onRefresh(); // refresh data setelah delete
      toast.success("Perfomance Review deleted successfully.");
    } catch (error) {
      setError("Failed to delete performance review.");
      toast.error("Failed to delete performance review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayoutWrapper>
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
          {performanceReview.map((row, index) => (
            <TableRow key={row.id}>
              {columns
                .filter((c) => visibleColumns[c.key])
                .map((c) => (
                  <TableCell key={c.key}>{c.render(row, index)}</TableCell>
                ))}
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
    </MainLayoutWrapper>
  );
}
