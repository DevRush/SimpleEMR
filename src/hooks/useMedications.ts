import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import type { Medication } from '@/types/patient';

export function useMedications(patientId: string): Medication[] | undefined {
  return useLiveQuery(
    () =>
      db.medications
        .where('patientId')
        .equals(patientId)
        .toArray(),
    [patientId],
  );
}

export function useActiveMedications(patientId: string): Medication[] | undefined {
  return useLiveQuery(
    () =>
      db.medications
        .where('patientId')
        .equals(patientId)
        .filter((m) => m.isActive)
        .toArray(),
    [patientId],
  );
}
