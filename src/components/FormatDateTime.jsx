import { format } from "date-fns";

function formatDateTime(dateString) {
  return format(new Date(dateString), "dd MMM yyyy, HH:mm");
}

function formatDate(dateString) {
  return format(new Date(dateString), "dd MMM yyyy");
}

function formatTime(dateString) {
  return format(new Date(dateString), "HH:mm");
}

export { formatDateTime, formatDate, formatTime };