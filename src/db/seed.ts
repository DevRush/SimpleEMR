import { db } from './index';
import type { Patient, Encounter, Medication } from '@/types/patient';

export async function seedDemoData(): Promise<void> {
  const existingCount = await db.patients.count();
  if (existingCount > 0) return;

  const now = new Date().toISOString();

  const patients: Patient[] = [
    { id: 'p1', firstName: 'Maria', lastName: 'Santos', dob: '1994-03-15', sex: 'female', phone: '+234-812-555-0101', address: 'Village Rd, Enugu', notes: 'Penicillin allergy', createdAt: now, updatedAt: now },
    { id: 'p2', firstName: 'John', lastName: 'Okafor', dob: '1978-11-22', sex: 'male', phone: '+234-803-555-0202', address: 'Market St, Nsukka', notes: 'Hypertension - on amlodipine', createdAt: now, updatedAt: now },
    { id: 'p3', firstName: 'Priya', lastName: 'Sharma', dob: '1985-07-08', sex: 'female', phone: '+91-98765-43210', address: 'Sector 5, Jaipur', createdAt: now, updatedAt: now },
    { id: 'p4', firstName: 'Ahmed', lastName: 'Hassan', dob: '1960-01-30', sex: 'male', phone: '+254-722-555-303', address: 'Eastleigh, Nairobi', notes: 'Type 2 DM, Hypertension', createdAt: now, updatedAt: now },
    { id: 'p5', firstName: 'Fatima', lastName: 'Diallo', dob: '2000-09-12', sex: 'female', phone: '+221-77-555-4040', address: 'Medina, Dakar', createdAt: now, updatedAt: now },
    { id: 'p6', firstName: 'Samuel', lastName: 'Mensah', dob: '1972-04-05', sex: 'male', phone: '+233-24-555-5050', address: 'Kumasi Central', notes: 'Sickle cell trait', createdAt: now, updatedAt: now },
    { id: 'p7', firstName: 'Rosa', lastName: 'Gutierrez', dob: '2019-12-20', sex: 'female', phone: '+502-5555-6060', address: 'Aldea San Miguel, Quetzaltenango', notes: 'Up to date on vaccines through 3yr', createdAt: now, updatedAt: now },
    { id: 'p8', firstName: 'David', lastName: 'Kimani', dob: '1988-06-17', sex: 'male', phone: '+254-733-555-707', address: 'Nyeri Town', createdAt: now, updatedAt: now },
    { id: 'p9', firstName: 'Amina', lastName: 'Keita', dob: '1995-02-28', sex: 'female', phone: '+223-66-555-8080', address: 'Bamako Commune III', notes: 'G2P1 - currently pregnant (~28 weeks)', createdAt: now, updatedAt: now },
    { id: 'p10', firstName: 'Chen', lastName: 'Wei', dob: '1952-08-14', sex: 'male', phone: '+86-138-5555-9090', address: 'Lijiang Rural District', notes: 'COPD, ex-smoker', createdAt: now, updatedAt: now },
    { id: 'p11', firstName: 'Grace', lastName: 'Banda', dob: '2023-05-10', sex: 'female', phone: '+265-99-555-1010', address: 'Lilongwe Area 25', createdAt: now, updatedAt: now },
    { id: 'p12', firstName: 'Ibrahim', lastName: 'Toure', dob: '1968-10-03', sex: 'male', phone: '+225-07-555-1111', address: 'Bouake District', notes: 'TB treatment completed 2024. HIV negative.', createdAt: now, updatedAt: now },
  ];

  const encounters: Encounter[] = [
    // Maria Santos - 3 encounters
    { id: 'e1', patientId: 'p1', date: '2026-03-08', chiefComplaint: 'Cough and fever for 3 days', vitals: { temperature: 38.5, heartRate: 92, systolicBP: 120, diastolicBP: 80, respiratoryRate: 22, spO2: 96, weight: 58 }, clinicalNote: 'Productive cough with yellowish sputum, fever since Tuesday. No chest pain or SOB. Lungs: crackles right base. No wheezing. CXR not available. Treating empirically for community-acquired pneumonia.', diagnosis: 'Pneumonia', diagnosisCode: 'J18.9', followUpDate: '2026-03-13', createdAt: now, updatedAt: now },
    { id: 'e2', patientId: 'p1', date: '2026-02-20', chiefComplaint: 'Routine checkup', vitals: { systolicBP: 118, diastolicBP: 76, heartRate: 78, weight: 58 }, clinicalNote: 'Annual checkup. No complaints. Vitals normal. Advised on nutrition and malaria prevention.', diagnosis: 'Well visit', createdAt: now, updatedAt: now },
    { id: 'e3', patientId: 'p1', date: '2026-01-15', chiefComplaint: 'Fever and chills for 2 days', vitals: { temperature: 39.2, heartRate: 104, systolicBP: 110, diastolicBP: 70, weight: 57 }, clinicalNote: 'High fever with rigors, headache, body aches. RDT positive for P. falciparum. No signs of severe malaria. Started ACT.', diagnosis: 'Malaria, falciparum', diagnosisCode: 'B50', followUpDate: '2026-01-18', createdAt: now, updatedAt: now },

    // John Okafor - 3 encounters
    { id: 'e4', patientId: 'p2', date: '2026-03-07', chiefComplaint: 'Follow-up for hypertension', vitals: { systolicBP: 142, diastolicBP: 88, heartRate: 76, weight: 82 }, clinicalNote: 'BP still slightly elevated on amlodipine 5mg. Patient reports compliance. No headaches, no visual changes. Will increase to 10mg and recheck in 2 weeks.', diagnosis: 'Hypertension, essential', diagnosisCode: 'I10', followUpDate: '2026-03-21', createdAt: now, updatedAt: now },
    { id: 'e5', patientId: 'p2', date: '2026-02-07', chiefComplaint: 'Hypertension follow-up', vitals: { systolicBP: 148, diastolicBP: 92, heartRate: 80, weight: 83 }, clinicalNote: 'BP elevated. Started amlodipine 5mg daily. Counseled on low-salt diet, exercise, weight loss.', diagnosis: 'Hypertension, essential', diagnosisCode: 'I10', followUpDate: '2026-03-07', createdAt: now, updatedAt: now },
    { id: 'e6', patientId: 'p2', date: '2026-01-10', chiefComplaint: 'Headaches for the past month', vitals: { systolicBP: 158, diastolicBP: 96, heartRate: 82, weight: 84 }, clinicalNote: 'Frontal headaches, worse in the morning. No visual changes. Fundoscopy normal. BP significantly elevated on 3 readings. New diagnosis of hypertension. Labs requested: creatinine, electrolytes.', diagnosis: 'Hypertension, essential', diagnosisCode: 'I10', followUpDate: '2026-02-07', createdAt: now, updatedAt: now },

    // Priya Sharma - 2 encounters
    { id: 'e7', patientId: 'p3', date: '2026-03-05', chiefComplaint: 'Painful urination for 2 days', vitals: { temperature: 37.4, heartRate: 78, systolicBP: 110, diastolicBP: 72, weight: 62 }, clinicalNote: 'Dysuria with frequency and urgency. No flank pain, no fever. Urine dipstick: leukocytes positive, nitrites positive. Uncomplicated UTI. Started trimethoprim-sulfamethoxazole.', diagnosis: 'Urinary tract infection', diagnosisCode: 'N39.0', followUpDate: '2026-03-12', createdAt: now, updatedAt: now },
    { id: 'e8', patientId: 'p3', date: '2025-11-15', chiefComplaint: 'Skin rash on arms', vitals: { weight: 61 }, clinicalNote: 'Itchy papular rash on bilateral forearms for 1 week. No fever. Examination shows scabies-type lesions with burrows. Treated with permethrin 5% cream. Advised washing all bedding.', diagnosis: 'Scabies', diagnosisCode: 'B86', createdAt: now, updatedAt: now },

    // Ahmed Hassan - 3 encounters
    { id: 'e9', patientId: 'p4', date: '2026-03-03', chiefComplaint: 'Diabetes and hypertension follow-up', vitals: { systolicBP: 138, diastolicBP: 82, heartRate: 72, weight: 78 }, clinicalNote: 'DM and HTN follow-up. FBS today 142 mg/dL (target <130). BP improved on enalapril. HbA1c from last month: 7.8%. Increased metformin to 1000mg BID. Continue enalapril 10mg.', diagnosis: 'Diabetes mellitus, type 2', diagnosisCode: 'E11', followUpDate: '2026-04-03', createdAt: now, updatedAt: now },
    { id: 'e10', patientId: 'p4', date: '2026-02-01', chiefComplaint: 'Chronic disease follow-up', vitals: { systolicBP: 145, diastolicBP: 88, heartRate: 74, weight: 79 }, clinicalNote: 'Routine follow-up. BP slightly above target. Blood drawn for HbA1c. Continue current medications. Diet counseling reinforced.', diagnosis: 'Diabetes mellitus, type 2', diagnosisCode: 'E11', followUpDate: '2026-03-01', createdAt: now, updatedAt: now },
    { id: 'e11', patientId: 'p4', date: '2025-12-15', chiefComplaint: 'Numbness in feet', vitals: { systolicBP: 150, diastolicBP: 90, heartRate: 76, weight: 80 }, clinicalNote: 'Bilateral foot numbness and tingling x 2 months. Monofilament test: decreased sensation both feet. Consistent with diabetic peripheral neuropathy. Started gabapentin 300mg at bedtime. Foot care education provided.', diagnosis: 'Diabetes mellitus, type 2', diagnosisCode: 'E11', followUpDate: '2026-01-15', createdAt: now, updatedAt: now },

    // Fatima Diallo - 2 encounters
    { id: 'e12', patientId: 'p5', date: '2026-02-25', chiefComplaint: 'Severe watery diarrhea since yesterday', vitals: { temperature: 37.8, heartRate: 110, systolicBP: 95, diastolicBP: 60, weight: 52 }, clinicalNote: 'Multiple episodes of watery diarrhea and vomiting since yesterday. Signs of moderate dehydration: dry mucous membranes, reduced skin turgor, tachycardia. Started ORS therapy. If not improved in 4 hours, consider IV fluids.', diagnosis: 'Acute gastroenteritis', diagnosisCode: 'A09', followUpDate: '2026-02-26', createdAt: now, updatedAt: now },
    { id: 'e13', patientId: 'p5', date: '2026-02-26', chiefComplaint: 'Follow-up for gastroenteritis', vitals: { temperature: 37.0, heartRate: 88, systolicBP: 108, diastolicBP: 70, weight: 53 }, clinicalNote: 'Improved significantly with ORS. Diarrhea decreased to 2 episodes today. Tolerating oral fluids. Hydration status improved. Continue ORS, advance diet as tolerated.', diagnosis: 'Acute gastroenteritis', diagnosisCode: 'A09', createdAt: now, updatedAt: now },

    // Samuel Mensah - 2 encounters
    { id: 'e14', patientId: 'p6', date: '2026-03-01', chiefComplaint: 'Persistent cough for 3 weeks', vitals: { temperature: 37.2, heartRate: 84, systolicBP: 128, diastolicBP: 78, respiratoryRate: 18, weight: 70 }, clinicalNote: 'Cough x 3 weeks, productive with occasional blood-tinged sputum. Night sweats, 3kg weight loss. Known sickle cell trait (not disease). Sputum sample collected for AFB. CXR referral written. High suspicion for TB.', diagnosis: 'Tuberculosis, pulmonary', diagnosisCode: 'A15', followUpDate: '2026-03-08', createdAt: now, updatedAt: now },
    { id: 'e15', patientId: 'p6', date: '2025-09-20', chiefComplaint: 'Joint pain in knees', vitals: { systolicBP: 130, diastolicBP: 80, weight: 73 }, clinicalNote: 'Bilateral knee pain, worse with walking, improving with rest. No swelling or redness. ROM slightly limited. Likely osteoarthritis. Started paracetamol 1g TID. Advised weight management.', diagnosis: 'Arthritis', diagnosisCode: 'M13.9', createdAt: now, updatedAt: now },

    // Rosa Gutierrez (pediatric) - 2 encounters
    { id: 'e16', patientId: 'p7', date: '2026-03-02', chiefComplaint: 'Fever and ear pain', vitals: { temperature: 38.8, heartRate: 120, respiratoryRate: 28, weight: 14 }, clinicalNote: '6-year-old with fever and right ear pain x 2 days. Pulling at right ear. Otoscopy: R TM erythematous, bulging. L TM normal. No meningeal signs. Acute otitis media. Started amoxicillin 45mg/kg/day.', diagnosis: 'Otitis media', diagnosisCode: 'H66.9', followUpDate: '2026-03-09', createdAt: now, updatedAt: now },
    { id: 'e17', patientId: 'p7', date: '2025-12-20', chiefComplaint: 'Well child visit - 6 year checkup', vitals: { temperature: 36.8, heartRate: 100, weight: 13.5 }, clinicalNote: '6-year well child visit. Growth on track (50th percentile). Development appropriate. Vaccines up to date. No concerns from mother. Counseled on nutrition, hygiene, mosquito nets.', diagnosis: 'Well child visit', diagnosisCode: 'Z00.12', createdAt: now, updatedAt: now },

    // David Kimani - 1 encounter
    { id: 'e18', patientId: 'p8', date: '2026-02-14', chiefComplaint: 'Laceration on left hand from farming', vitals: { heartRate: 82, systolicBP: 122, diastolicBP: 76 }, clinicalNote: '3cm laceration on left palm from machete while clearing brush. Clean wound, no tendon or nerve involvement. Irrigated, closed with 4 sutures. Tetanus booster given (last one >5 years ago). Return in 7 days for suture removal.', diagnosis: 'Wound / laceration', diagnosisCode: 'T14.1', followUpDate: '2026-02-21', createdAt: now, updatedAt: now },

    // Amina Keita - 3 encounters (pregnancy)
    { id: 'e19', patientId: 'p9', date: '2026-03-06', chiefComplaint: 'ANC visit - 28 weeks', vitals: { systolicBP: 116, diastolicBP: 72, heartRate: 84, weight: 65 }, clinicalNote: 'ANC visit at 28 weeks. Fundal height 28cm - appropriate. FHR 142 bpm, regular. No edema, no proteinuria. Hemoglobin 10.8 g/dL (mild anemia). Started ferrous sulfate 200mg daily. Reviewed danger signs.', diagnosis: 'Pregnancy, routine visit', diagnosisCode: 'Z34', followUpDate: '2026-03-20', createdAt: now, updatedAt: now },
    { id: 'e20', patientId: 'p9', date: '2026-02-06', chiefComplaint: 'ANC visit - 24 weeks', vitals: { systolicBP: 112, diastolicBP: 70, heartRate: 80, weight: 63 }, clinicalNote: 'Routine ANC. Fundal height 24cm. FHR 148 bpm. BP normal. No complaints. Continuing folate and iron. HIV test: negative. Syphilis: negative.', diagnosis: 'Pregnancy, routine visit', diagnosisCode: 'Z34', followUpDate: '2026-03-06', createdAt: now, updatedAt: now },
    { id: 'e21', patientId: 'p9', date: '2026-01-09', chiefComplaint: 'ANC visit - 20 weeks', vitals: { systolicBP: 108, diastolicBP: 68, heartRate: 78, weight: 61 }, clinicalNote: 'First ANC visit at this facility. G2P1, previous normal vaginal delivery. LMP approximately Aug 28, 2025. Ultrasound not available. Fundal height 20cm. Started iron/folate supplementation. Birth plan discussed.', diagnosis: 'Pregnancy, routine visit', diagnosisCode: 'Z34', followUpDate: '2026-02-06', createdAt: now, updatedAt: now },

    // Chen Wei - 2 encounters
    { id: 'e22', patientId: 'p10', date: '2026-02-28', chiefComplaint: 'Worsening shortness of breath', vitals: { temperature: 36.9, heartRate: 92, systolicBP: 135, diastolicBP: 82, respiratoryRate: 24, spO2: 91, weight: 62 }, clinicalNote: 'COPD exacerbation. Increased dyspnea over past week, more sputum than usual. SpO2 91% on room air. Wheezing bilaterally. No fever. Started prednisolone 40mg x 5 days, salbutamol inhaler increased to QID. If not improved in 48h, will need referral.', diagnosis: 'COPD', diagnosisCode: 'J44.1', followUpDate: '2026-03-02', createdAt: now, updatedAt: now },
    { id: 'e23', patientId: 'p10', date: '2026-03-02', chiefComplaint: 'COPD follow-up', vitals: { heartRate: 84, systolicBP: 130, diastolicBP: 80, respiratoryRate: 20, spO2: 94, weight: 62 }, clinicalNote: 'Improved with prednisolone and increased salbutamol. SpO2 94% on room air. Less wheezing. Continue current regimen, taper prednisolone after 5 days. Reduce salbutamol to BID when stable.', diagnosis: 'COPD', diagnosisCode: 'J44.1', followUpDate: '2026-03-16', createdAt: now, updatedAt: now },

    // Grace Banda (infant) - 2 encounters
    { id: 'e24', patientId: 'p11', date: '2026-03-04', chiefComplaint: 'Diarrhea and poor feeding', vitals: { temperature: 38.1, heartRate: 150, respiratoryRate: 36, weight: 10.2 }, clinicalNote: '2.5-year-old with watery diarrhea x 3 days and decreased feeding. Mildly dehydrated. Weight on 25th percentile (previously 50th). Started ORS with zinc supplementation 20mg daily x 10 days. Mother educated on ORS preparation and danger signs.', diagnosis: 'Diarrheal disease', diagnosisCode: 'A09', followUpDate: '2026-03-06', createdAt: now, updatedAt: now },
    { id: 'e25', patientId: 'p11', date: '2025-11-10', chiefComplaint: 'Growth monitoring visit', vitals: { temperature: 36.6, heartRate: 130, weight: 10.8 }, clinicalNote: 'Growth monitoring. Weight 10.8kg (50th percentile for age). Length 85cm. Feeding well, breastfeeding continued with complementary foods. Vaccines up to date. Development normal - walking, saying several words.', diagnosis: 'Well child visit', diagnosisCode: 'Z00.12', createdAt: now, updatedAt: now },

    // Ibrahim Toure - 2 encounters
    { id: 'e26', patientId: 'p12', date: '2026-02-15', chiefComplaint: 'Chronic cough follow-up, fatigue', vitals: { temperature: 36.8, heartRate: 78, systolicBP: 118, diastolicBP: 74, weight: 65 }, clinicalNote: 'Post-TB treatment follow-up. Completed 6-month course in 2024. Cough has resolved. Mild fatigue. Weight stable at 65kg (was 58kg at TB diagnosis). Appetite good. Sputum clear. HIV test repeated - negative. No signs of TB recurrence.', diagnosis: 'Tuberculosis, pulmonary', diagnosisCode: 'A15', followUpDate: '2026-05-15', createdAt: now, updatedAt: now },
    { id: 'e27', patientId: 'p12', date: '2025-08-15', chiefComplaint: 'TB treatment month 6 - final visit', vitals: { temperature: 36.7, heartRate: 76, systolicBP: 120, diastolicBP: 76, weight: 64 }, clinicalNote: 'Final month of TB treatment. Sputum culture negative at month 5. Weight gained 6kg since diagnosis. Completing RHZE regimen today. Counseled on signs of recurrence. Follow-up in 6 months.', diagnosis: 'Tuberculosis, pulmonary', diagnosisCode: 'A15', createdAt: now, updatedAt: now },
  ];

  const medications: Medication[] = [
    // Maria - pneumonia treatment
    { id: 'm1', patientId: 'p1', encounterId: 'e1', name: 'Amoxicillin', dose: '500mg', frequency: 'TID (three times daily)', duration: '7 days', isActive: true, startDate: '2026-03-08', endDate: '2026-03-15', createdAt: now },
    { id: 'm2', patientId: 'p1', encounterId: 'e1', name: 'Paracetamol', dose: '1g', frequency: 'As needed (PRN)', duration: '3 days', isActive: true, startDate: '2026-03-08', createdAt: now },
    // Maria - malaria (completed)
    { id: 'm3', patientId: 'p1', encounterId: 'e3', name: 'Artemether-Lumefantrine', dose: '20/120mg (4 tabs)', frequency: 'BID (twice daily)', duration: '3 days', isActive: false, startDate: '2026-01-15', endDate: '2026-01-18', createdAt: now },

    // John - hypertension
    { id: 'm4', patientId: 'p2', encounterId: 'e4', name: 'Amlodipine', dose: '10mg', frequency: 'Once daily', isActive: true, startDate: '2026-03-07', createdAt: now },

    // Priya - UTI
    { id: 'm5', patientId: 'p3', encounterId: 'e7', name: 'Trimethoprim-Sulfamethoxazole', dose: '160/800mg', frequency: 'BID (twice daily)', duration: '5 days', isActive: true, startDate: '2026-03-05', endDate: '2026-03-10', createdAt: now },

    // Ahmed - diabetes + hypertension
    { id: 'm6', patientId: 'p4', encounterId: 'e9', name: 'Metformin', dose: '1000mg', frequency: 'BID (twice daily)', isActive: true, startDate: '2026-03-03', createdAt: now },
    { id: 'm7', patientId: 'p4', encounterId: 'e9', name: 'Enalapril', dose: '10mg', frequency: 'Once daily', isActive: true, startDate: '2025-12-15', createdAt: now },
    { id: 'm8', patientId: 'p4', encounterId: 'e11', name: 'Gabapentin', dose: '300mg', frequency: 'At bedtime', isActive: true, startDate: '2025-12-15', createdAt: now },

    // Fatima - ORS
    { id: 'm9', patientId: 'p5', encounterId: 'e12', name: 'ORS (Oral Rehydration Salts)', dose: '1 packet per liter', frequency: 'As needed (PRN)', duration: '3 days', isActive: false, startDate: '2026-02-25', endDate: '2026-02-28', createdAt: now },

    // Samuel - paracetamol (old)
    { id: 'm10', patientId: 'p6', encounterId: 'e15', name: 'Paracetamol', dose: '1g', frequency: 'TID (three times daily)', isActive: true, startDate: '2025-09-20', createdAt: now },

    // Rosa - otitis media
    { id: 'm11', patientId: 'p7', encounterId: 'e16', name: 'Amoxicillin', dose: '250mg', frequency: 'TID (three times daily)', duration: '7 days', isActive: true, startDate: '2026-03-02', endDate: '2026-03-09', createdAt: now },

    // David - tetanus
    { id: 'm12', patientId: 'p8', encounterId: 'e18', name: 'Tetanus Toxoid Booster', dose: '0.5mL IM', frequency: 'Once', duration: 'Single dose', isActive: false, startDate: '2026-02-14', endDate: '2026-02-14', createdAt: now },

    // Amina - pregnancy
    { id: 'm13', patientId: 'p9', encounterId: 'e19', name: 'Ferrous Sulfate', dose: '200mg', frequency: 'Once daily', isActive: true, startDate: '2026-03-06', createdAt: now },
    { id: 'm14', patientId: 'p9', encounterId: 'e21', name: 'Folic Acid', dose: '5mg', frequency: 'Once daily', isActive: true, startDate: '2026-01-09', createdAt: now },

    // Chen Wei - COPD
    { id: 'm15', patientId: 'p10', encounterId: 'e22', name: 'Salbutamol Inhaler', dose: '2 puffs', frequency: 'QID (four times daily)', isActive: true, startDate: '2026-02-28', createdAt: now },
    { id: 'm16', patientId: 'p10', encounterId: 'e22', name: 'Prednisolone', dose: '40mg', frequency: 'Once daily', duration: '5 days', isActive: false, startDate: '2026-02-28', endDate: '2026-03-05', createdAt: now },

    // Grace - zinc
    { id: 'm17', patientId: 'p11', encounterId: 'e24', name: 'Zinc Sulfate', dose: '20mg', frequency: 'Once daily', duration: '10 days', isActive: true, startDate: '2026-03-04', endDate: '2026-03-14', createdAt: now },
    { id: 'm18', patientId: 'p11', encounterId: 'e24', name: 'ORS (Oral Rehydration Salts)', dose: '1/2 packet per liter', frequency: 'As needed (PRN)', duration: '3 days', isActive: false, startDate: '2026-03-04', createdAt: now },
  ];

  await db.transaction('rw', db.patients, db.encounters, db.medications, async () => {
    await db.patients.bulkAdd(patients);
    await db.encounters.bulkAdd(encounters);
    await db.medications.bulkAdd(medications);
  });
}

export async function clearAllData(): Promise<void> {
  await db.transaction('rw', db.patients, db.encounters, db.medications, async () => {
    await db.patients.clear();
    await db.encounters.clear();
    await db.medications.clear();
  });
}
