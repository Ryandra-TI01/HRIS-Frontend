import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PenLine } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "@/components/FormatDateTime";

export const EmployeeColumns = [
  {
    key: "no",
    label: "No",
    render: (row, index, data) => {
      const perPage = data?.per_page || 20;
      const currentPage = data?.current_page || 1;
      return (currentPage - 1) * perPage + index + 1;
    },
  },
  {
    key: "employee_code",
    label: "Employee Code",
    render: (row) => row.employee_code
  },
  {
    key: "name",
    label: "Name",
    render: (row) => row.user.name || "-",
  },
  {
    key: "email",
    label: "Email",
    render: (row) => row.user.email || "-",
  },
  {
    key: "position",
    label: "Position",
    render: (row) => row.position || "-",
  },
  {
    key: "department",
    label: "Department",
    render: (row) => row.department || "-",
  },
  {
    key: "employment_status",
    label: "Employment Status",
    render: (row) => <Badge variant={row.employment_status === "permanent" ? "outline" : "default"}>{row.employment_status}</Badge>,
  },
  {
    key: "manager",
    label: "Manager",
    render: (row) => row.manager?.name || "-",
  },
  {
    key: "join_date",
    label: "Joined Date",
    render: (row) => (row.join_date ? formatDate(row.join_date) : "-"),
  },
  {
    key: "status_active",
    label: "Status",
    render: (row) => (
      <Badge variant={row.user.status_active ? "outline" : "default"}>
        {row.user.status_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    key: "contact",
    label: "Contact",
    render: (row) => row.contact || row.phone || "-",
  },

  {
    key: "actions",
    label: "Action",
    render: (row, index, data, { loading, onDelete, onRefresh }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>

          {/* Edit */}
          <Link to={`/admin/employees/edit/${row.id}`}>
            <DropdownMenuItem>
              <PenLine className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
          </Link>

          {/* Delete */}
          {/* <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  <span className="font-semibold">{row.name}</span>'s employee
                  data.
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
          </AlertDialog> */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
