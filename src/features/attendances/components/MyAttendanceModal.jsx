import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { checkIn, checkOut } from "../api/attadance";
import { toast } from "sonner";
import { Loader2, LogIn, LogOut, CheckCircle2, Clock } from "lucide-react";

// Helpers
const formatTime = (date) =>
  date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function MyAttendanceModal({
  open,
  setOpen,
  todayRecord,
  reload,
}) {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const hasCheckedIn = !!todayRecord?.check_in_time;
  const hasCheckedOut = !!todayRecord?.check_out_time;

  const closeModal = () => setOpen(false);

  // Update time when modal opened
  useEffect(() => {
    if (!open) return;
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [open]);

  const handleAction = useCallback(
    async (fn, msg) => {
      try {
        setLoading(true);
        const res = await fn();
        toast.success(res?.message || msg);
        closeModal();
        await reload();
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [reload]
  );

  const handleCheckIn = () => handleAction(checkIn, "Check-in success!");
  const handleCheckOut = () => handleAction(checkOut, "Check-out success!");

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && closeModal()}>
      <DialogContent
        className="
          max-w-sm pt-6 pb-8 px-6 rounded-3xl text-center
          bg-gradient-to-b from-[rgba(30,30,40,0.85)] to-[rgba(10,10,14,0.9)]
          backdrop-blur-2xl border border-white/10 shadow-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white tracking-wide">
            Daily Attendance
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-sm">
            {formatDate(time)}
          </DialogDescription>
        </DialogHeader>

        {/* TIME PULSE DISPLAY */}
        <div className="relative my-6 text-6xl font-bold text-white tracking-widest drop-shadow-xl">
          {formatTime(time)}
        </div>

        {/* STATUS CARD */}
        <div className="bg-white/10 rounded-xl py-3 px-4 mb-6 text-left text-sm text-gray-200 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Clock size={16} />
            <span className="font-medium">Today's Status</span>
          </div>

          <div className="flex justify-between text-gray-300 mt-2">
            <span>Check-in:</span>
            <span>{todayRecord?.check_in_time ?? "—"}</span>
          </div>

          <div className="flex justify-between text-gray-300 mt-1">
            <span>Check-out:</span>
            <span>{todayRecord?.check_out_time ?? "—"}</span>
          </div>
        </div>

        {/* ACTION BUTTON */}
        {!hasCheckedIn ? (
          <Button
            size="lg"
            className="w-full py-5 text-lg font-semibold rounded-xl bg-green-500 hover:bg-green-600 shadow-lg"
            onClick={handleCheckIn}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                <LogIn /> Check In
              </span>
            )}
          </Button>
        ) : !hasCheckedOut ? (
          <Button
            size="lg"
            className="w-full py-5 text-lg font-semibold rounded-xl bg-green-500 hover:bg-green-600 shadow-lg"
            onClick={handleCheckOut}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                <LogOut /> Check Out
              </span>
            )}
          </Button>
        ) : (
          <Button
            disabled
            className="w-full py-5 text-lg font-semibold rounded-xl bg-gray-500/40 text-white/80"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 /> You are done for today
            </span>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
