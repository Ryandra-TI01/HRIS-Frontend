import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { formatDate } from "../../../components/FormatDateTime";
import LeaveApproveRejectDialog from "../components/LeaveApproveRejectDialog";
import { reviewLeaveRequest } from "../api/leaveRequests";
import { toast } from "sonner";

export const leaveColumns = [
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
    key: "start_date",
    label: "Start Date",
    render: (row) => formatDate(row.start_date),
  },
  {
    key: "end_date",
    label: "End Date",
    render: (row) => formatDate(row.end_date),
  },
  {
    key: "reviewer_name",
    label: "Reviewer",
    render: (row) => row.reviewer?.name || "-",
  },

  {
    key: "status",
    label: "Status",
    render: (row) => {
      return (
        <Badge
          variant={
            row.status === "Approved"
              ? "secondary"
              : row.status === "Rejected"
              ? "destructive"
              : "outline"
          }
        >
          {row.status}
        </Badge>
      );
    },
  },
  {
    key: "reviewer_note",
    label: "Reviewer Note",
    render: (row) => row.reviewer_note || "-",
  },
  {
    key: "actions",
    label: "Action",
    render: (row, index, data, { loading, setLoading, onRefresh }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>

          {/* APPROVE */}
          <LeaveApproveRejectDialog
            actionLabel="Approve"
            onConfirm={async (note) => {
              try {
                setLoading(true);
                await reviewLeaveRequest(row.id, "approve", note);
                toast.success("Leave approved!");
                onRefresh();
              } catch (err) {
                toast.error("Failed to approve leave.");
              } finally {
                setLoading(false);
              }
            }}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Approve
            </DropdownMenuItem>
          </LeaveApproveRejectDialog>

          {/* REJECT */}
          <LeaveApproveRejectDialog
            actionLabel="Reject"
            onConfirm={async (note) => {
              try {
                setLoading(true);
                await reviewLeaveRequest(row.id, "reject", note);
                toast.success("Leave rejected!");
                onRefresh();
              } catch (err) {
                toast.error("Failed to reject leave.");
              } finally {
                setLoading(false);
              }
            }}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Reject
            </DropdownMenuItem>
          </LeaveApproveRejectDialog>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
