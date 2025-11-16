// src/utils/handleApiError.js

/**
 * Standardized API error handler
 * - Extracts validation errors from backend (Laravel)
 * - Returns readable message string
 */
export default function handleApiError(error) {
  console.log("API Error:", error.response?.data);

  // --- get 2 nested objects ---
  const backendErrors =
    error?.response?.data?.errors || error?.response?.data?.error;

  // --- kalau ada object errors dari backend ---
  if (backendErrors && typeof backendErrors === "object") {
    // Gabungkan semua pesan error jadi satu string
    const allMessages = Object.values(backendErrors)
      .flat() // change nested array to flat array
      .join(", ");
    return allMessages;
  }

  // --- fallback message ---
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred. Please try again.";

  return message;
}