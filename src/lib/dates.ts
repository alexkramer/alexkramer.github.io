// Front-matter dates are parsed as UTC midnight, so format them in UTC too.
// Formatting in local time shows the day before anywhere west of Greenwich.
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
