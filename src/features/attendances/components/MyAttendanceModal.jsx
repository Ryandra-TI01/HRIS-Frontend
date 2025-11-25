import { useEffect, useState } from "react";
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
import { LucideCheckCheck } from "lucide-react";

export default function MyAttendanceModal({ open, setOpen, todayRecord, reload }) {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  // Update clock
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

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

  const hasCheckedIn = !!todayRecord?.check_in_time;
  const hasCheckedOut = !!todayRecord?.check_out_time;

  const closeModal = () => setOpen(false);

  const handleCheckIn = async () => {
    try {
      setLoading(true);
      const res = await checkIn();
      toast.success(res?.message || "Check-in success!");
      closeModal();
      setTimeout(() => reload(), 150);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to check in");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setLoading(true);
      const res = await checkOut();
      toast.success(res?.message || "Check-out success!");
      closeModal();
      setTimeout(() => reload(), 150);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to check out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) closeModal();
      }}
    >
      <DialogContent
        className="
        max-w-sm text-center py-7 rounded-2xl 
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        shadow-[0_8px_30px_rgb(0,0,0,0.25)]
        animate-in fade-in slide-in-from-bottom-4
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-white drop-shadow-sm">
            Your Daily Attendance
          </DialogTitle>

          <DialogDescription className="text-gray-200 text-sm mt-1">
            {formatDate(time)}
          </DialogDescription>
        </DialogHeader>

        {/* Divider */}
        <div className="h-px w-full bg-white/20 my-4" />

        {/* Clock */}
        <div className="text-5xl font-extrabold text-white tracking-[0.15em] drop-shadow-lg">
          {formatTime(time)}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/20 my-6" />

        {/* Buttons */}
        {!hasCheckedIn ? (
          <Button
            className="w-full py-5 text-md font-medium shadow-md rounded-xl bg-white text-black hover:bg-gray-200 transition-all"
            onClick={handleCheckIn}
            disabled={loading}
          >
            Check In
          </Button>
        ) : !hasCheckedOut ? (
          <Button
            className="w-full py-5 text-md font-medium shadow-md rounded-xl bg-green-500 hover:bg-green-600 transition-all"
            onClick={handleCheckOut}
            disabled={loading}
          >
            Check Out
          </Button>
        ) : (
          <Button
            disabled
            className="w-full py-5 text-md font-medium rounded-xl bg-gray-500/40 text-white/80"
          >
            You are done for today <LucideCheckCheck/>
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
