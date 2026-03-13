import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import type { Encounter } from '@/types/patient';

export function useEncounters(patientId: string): Encounter[] | undefined {
  return useLiveQuery(
    () =>
      db.encounters
        .where('patientId')
        .equals(patientId)
        .reverse()
        .sortBy('date'),
    [patientId],
  );
}
