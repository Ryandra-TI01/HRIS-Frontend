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
import { EllipsisVertical, PenLine, Trash } from "lucide-react";
import { formatDate, formatDateTime } from "../../../components/FormatDateTime";
import { Star } from "lucide-react";
import { Link } from "react-router";
export const PerformanceReviewColumns = [
  {
    key: "no",
    label: "No",
    render: (row, index, data) => {
      const perPage = data?.per_page || 20;
      const currentPage = data?.current_page || 1;

      return (currentPage - 1) * perPage + index + 1;
    },
  },
  ,
  {
    key: "employee_name",
    label: "Employee",
    render: (row) => row.employee.name,
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
    render: (
      row,
      index,
      data,
      { loading, setLoading, onDelete, onRefresh, userRole }
    ) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>

          <Link to={`/${ userRole === "admin_hr" ? "admin" : "manager"}/performance-reviews/edit/${row.id}`}>
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
                  {row.employee.name} Review".
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(row.id)}
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
