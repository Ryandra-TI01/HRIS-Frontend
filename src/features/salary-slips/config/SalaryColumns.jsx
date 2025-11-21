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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { EllipsisVertical, PenLine, Trash } from "lucide-react";
import { formatDate } from "../../../components/FormatDateTime";
import { Spinner } from "../../../components/ui/spinner";
import { Link } from "react-router";

export const SalaryColumns = [
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
    key: "employee_name",
    label: "Employee",
    render: (row) => row.employee.name,
  },
  {
    key: "period_month",
    label: "Period Month",
    render: (row) => formatDate(row.period_month),
  },
  {
    key: "basic_salary",
    label: "Basic Salary",
    render: (row) =>
      row.basic_salary.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    key: "allowance",
    label: "Allowance",
    render: (row) =>
      row.allowance.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    key: "deduction",
    label: "Deduction",
    render: (row) =>
      row.deduction.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    key: "total_salary",
    label: "Total Salary",
    render: (row) =>
      row.total_salary.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      }),
  },
  {
    key: "created_by",
    label: "Created By",
    render: (row) => row.creator.name || "-",
  },
  {
    key: "actions",
    label: "Action",
    render: (row, index, data, { loading, setLoading, onDelete, onRefresh }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>

          <Link to={`/admin/salary-slips/edit/${row.id}`}>
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
                  {row.employee.name} salary slips".
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
  // {
  //   key: "actions",
  //   label: "Action",
  //   render: (row, index, data, { loading, setLoading, onRefresh }) => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="outline" size="icon">
  //           <EllipsisVertical />
  //         </Button>
  //       </DropdownMenuTrigger>

  //       <DropdownMenuContent>
  //         <DropdownMenuLabel>Action</DropdownMenuLabel>

  //         {/* APPROVE */}
  //         <LeaveApproveRejectDialog
  //           actionLabel="Approve"
  //           onConfirm={async (note) => {
  //             try {
  //               setLoading(true);
  //               await reviewLeaveRequest(row.id, "approve", note);
  //               toast.success("Leave approved!");
  //               onRefresh();
  //             } catch (err) {
  //               toast.error("Failed to approve leave.");
  //             } finally {
  //               setLoading(false);
  //             }
  //           }}
  //         >
  //           <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
  //             Approve
  //           </DropdownMenuItem>
  //         </LeaveApproveRejectDialog>

  //         {/* REJECT */}
  //         <LeaveApproveRejectDialog
  //           actionLabel="Reject"
  //           onConfirm={async (note) => {
  //             try {
  //               setLoading(true);
  //               await reviewLeaveRequest(row.id, "reject", note);
  //               toast.success("Leave rejected!");
  //               onRefresh();
  //             } catch (err) {
  //               toast.error("Failed to reject leave.");
  //             } finally {
  //               setLoading(false);
  //             }
  //           }}
  //         >
  //           <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
  //             Reject
  //           </DropdownMenuItem>
  //         </LeaveApproveRejectDialog>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   ),
  // },
];
