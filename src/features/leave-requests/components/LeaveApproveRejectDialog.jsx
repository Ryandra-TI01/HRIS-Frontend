import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

export default function LeaveApproveRejectDialog({
  actionLabel,
  onConfirm,
  children,
}) {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await onConfirm(note);
    setLoading(false);
    setNote("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{actionLabel} Leave Request</AlertDialogTitle>

          <AlertDialogDescription>
            Add a reviewer note (optional):
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Textarea
          rows={5}
          placeholder="Write reviewer note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleSubmit} disabled={loading} >
            {loading && <Spinner className="mr-2" />}
            {loading ? `${actionLabel}...` : actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
