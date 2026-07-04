export function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// Display-friendly age: years for 2+, months for infants, days for newborns —
// so a baby reads "8m" or "12d" instead of "0y".
export function formatAge(dob: string): string {
  const years = calculateAge(dob);
  if (years >= 2) return `${years}y`;

  const birth = new Date(dob);
  const today = new Date();
  let months =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());
  if (today.getDate() < birth.getDate()) months--;
  if (months >= 1) return `${months}m`;

  const days = Math.max(0, Math.floor((today.getTime() - birth.getTime()) / 86_400_000));
  return `${days}d`;
}
