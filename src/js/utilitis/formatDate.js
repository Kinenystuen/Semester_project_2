/**
 * Functionn to transform date data to be readable for user
 * This formatData
 * @param {string} dateString Sends dateString example to be transformed into date display
 * @returns {string} formatted date
 * @example
 * ``` js
 * // post.created = "2024-05-13T07:27:24.702Z"
 * const formattedDate = formatDateMMDDYYHT(post.created);
 * // Formatted date value returns as "5/13/2024, 09:27"
 */
export function formatDateDDMMYYHT(dateString) {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const formattedDateParts = formatter.formatToParts(date);

  // Reconstruct the formatted date string
  const formattedDate = `${formattedDateParts.find((part) => part.type === 'day').value}.${formattedDateParts.find((part) => part.type === 'month').value}.${formattedDateParts.find((part) => part.type === 'year').value}, ${formattedDateParts.find((part) => part.type === 'hour').value}:${formattedDateParts.find((part) => part.type === 'minute').value}`;

  return formattedDate;
}
