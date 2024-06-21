export function formatTimestamp(isoDateString:string) {
  // Step 1: Create a Date object from the ISO 8601 string
  const date = new Date(isoDateString);

  // Step 2: Check if the date is valid


  // Step 3: Extract the day, month, and year
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Step 4: Format the month
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthName = monthNames[monthIndex];

  // Step 5: Combine the components into the desired format
  const formattedDate = `${day} ${monthName} ${year}`;

  return formattedDate;
}
