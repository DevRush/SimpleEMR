import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import type { Patient } from '@/types/patient';

export function usePatientSearch(query: string): Patient[] | undefined {
  return useLiveQuery(async () => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    // DOB search: if query has digits and separators
    if (/^\d{1,4}[-/]\d{1,2}([-/]\d{0,4})?$/.test(trimmed)) {
      const normalized = trimmed.replace(/\//g, '-');
      return db.patients.where('dob').startsWith(normalized).limit(20).toArray();
    }

    // Name search
    const tokens = trimmed.toLowerCase().split(/\s+/);
    const firstToken = tokens[0];

    const candidates = await db.patients
      .where('firstName').startsWithIgnoreCase(firstToken)
      .or('lastName').startsWithIgnoreCase(firstToken)
      .limit(50)
      .toArray();

    if (tokens.length > 1) {
      return candidates.filter((p) => {
        const full = `${p.firstName} ${p.lastName}`.toLowerCase();
        return tokens.every((t) => full.includes(t));
      });
    }

    return candidates;
  }, [query]);
}
