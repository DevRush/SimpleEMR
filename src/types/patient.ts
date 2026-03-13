export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dob: string; // ISO 'YYYY-MM-DD'
  sex: 'male' | 'female' | 'other';
  phone?: string;
  address?: string;
  notes?: string; // allergies, chronic conditions, etc.
  createdAt: string;
  updatedAt: string;
}

export interface Encounter {
  id: string;
  patientId: string;
  date: string; // ISO 'YYYY-MM-DD'
  chiefComplaint: string;
  vitals?: Vitals;
  clinicalNote: string;
  diagnosis?: string;
  diagnosisCode?: string; // ICD-10
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vitals {
  temperature?: number; // Celsius
  heartRate?: number; // bpm
  systolicBP?: number; // mmHg
  diastolicBP?: number; // mmHg
  respiratoryRate?: number; // breaths/min
  spO2?: number; // percentage
  weight?: number; // kg
}

export interface Medication {
  id: string;
  patientId: string;
  encounterId: string;
  name: string;
  dose: string; // e.g. "500mg"
  frequency: string; // e.g. "BID", "TID"
  duration?: string; // e.g. "7 days", "Ongoing"
  isActive: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
}
