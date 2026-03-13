export function printEncounter(encounterId: string): void {
  const el = document.getElementById(`encounter-${encounterId}`);
  if (el) {
    el.classList.add('print-target');
    window.print();
    el.classList.remove('print-target');
  }
}
