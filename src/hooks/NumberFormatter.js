
/**
 * Format a given number into a string with thousand separators.
 * @param {number} value - The number to format.
 * @returns {string} The formatted number as a string.
 * @example
 * formatNumber(1000) // "1,000"
 */
function formatNumber(value) {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


/**
 * Remove thousand separators from a given string.
 * @param {string} value - The string to unformat.
 * @returns {string} The unformatted string.
 * @example
 * unformatNumber("1,000") // "1000"
 */
function unformatNumber(value) {
  if (!value) return "";
  return value.replace(/\./g, "");
}

export { formatNumber, unformatNumber };