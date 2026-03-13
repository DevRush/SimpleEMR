export function formatDate(iso: string): string {
  const date = new Date(iso + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function formatSex(sex: string): string {
  return sex === 'male' ? 'M' : sex === 'female' ? 'F' : 'O';
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function nowISO(): string {
  return new Date().toISOString();
}
