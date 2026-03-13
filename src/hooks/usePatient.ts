import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import type { Patient } from '@/types/patient';

export function usePatient(id: string): Patient | undefined {
  return useLiveQuery(() => db.patients.get(id), [id]);
}
