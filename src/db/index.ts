import Dexie, { type EntityTable } from 'dexie';
import type { Patient, Encounter, Medication } from '@/types/patient';

const db = new Dexie('SimpleEMR') as Dexie & {
  patients: EntityTable<Patient, 'id'>;
  encounters: EntityTable<Encounter, 'id'>;
  medications: EntityTable<Medication, 'id'>;
};

db.version(1).stores({
  patients: '&id, firstName, lastName, dob, [lastName+firstName], [firstName+lastName]',
  encounters: '&id, patientId, date, [patientId+date]',
  medications: '&id, patientId, encounterId, isActive',
});

export { db };
