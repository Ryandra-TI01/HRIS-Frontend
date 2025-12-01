import { format } from "date-fns";

/**
 * Format a date string into a human-readable format.
 *
 * @example
 * const dateString = "2022-01-01T12:00:00.000Z";
 * const formattedDateTime = formatDateTime(dateString);
 * console.log(formattedDateTime); // Output: "01 Jan 2022, 12:00"
 *
 * @param {string} dateString - The date string to be formatted
 * @returns {string} The formatted date string
 */
function formatDateTime(dateString) {
  return format(new Date(dateString), "dd MMM yyyy, HH:mm");
}

/**
 * Format a date string into a human-readable format.
 *
 * @example
 * const dateString = "2022-01-01T12:00:00.000Z";
 * const formattedDate = formatDate(dateString);
 * console.log(formattedDate); // Output: "01 Jan 2022"
 *
 * @param {string} dateString - The date string to be formatted
 * @returns {string} The formatted date string
 */
function formatDate(dateString) {
  return format(new Date(dateString), "dd MMM yyyy");
}

/**
 * Format a date string into a human-readable time format.
 *
 * @example
 * const dateString = "2022-01-01T12:00:00.000Z";
 * const formattedTime = formatTime(dateString);
 * console.log(formattedTime); // Output: "12:00"
 *
 * @param {string} dateString - The date string to be formatted
 * @returns {string} The formatted time string
 */
function formatTime(dateString) {
  return format(new Date(dateString), "HH:mm");
}

export { formatDateTime, formatDate, formatTime };