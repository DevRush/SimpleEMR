import { exportDB, importDB } from 'dexie-export-import';
import { db } from './index';

export async function exportAllData(): Promise<void> {
  const blob = await exportDB(db);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `simpleemr-backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function importData(file: File): Promise<void> {
  await db.delete();
  await importDB(file);
  window.location.reload();
}
