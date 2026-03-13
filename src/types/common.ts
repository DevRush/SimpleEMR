export type Sex = 'male' | 'female' | 'other';

export type Route =
  | { page: 'landing' }
  | { page: 'home' }
  | { page: 'patient'; id: string }
  | { page: 'newPatient' }
  | { page: 'editPatient'; id: string };
