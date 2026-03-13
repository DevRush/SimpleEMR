import { useState } from 'react';
import { db } from '@/db';
import type { Vitals } from '@/types/patient';
import { generateId } from '@/utils/id';
import { todayISO, nowISO } from '@/utils/format';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { VitalsInput } from './VitalsInput';
import { DiagnosisPicker } from './DiagnosisPicker';
import { MedicationInput, type MedEntry } from './MedicationInput';

interface EncounterFormProps {
  patientId: string;
  onSave: () => void;
  onCancel: () => void;
}

export function EncounterForm({ patientId, onSave, onCancel }: EncounterFormProps) {
  const [date, setDate] = useState(todayISO());
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [vitals, setVitals] = useState<Vitals>({});
  const [clinicalNote, setClinicalNote] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [medications, setMedications] = useState<MedEntry[]>([]);
  const [followUpDate, setFollowUpDate] = useState('');
  const [saving, setSaving] = useState(false);

  const isValid = chiefComplaint.trim() || clinicalNote.trim();

  async function handleSave() {
    if (!isValid || saving) return;
    setSaving(true);

    const now = nowISO();
    const encounterId = generateId();

    // Clean vitals — remove undefined fields
    const cleanVitals: Vitals = {};
    if (vitals.temperature != null) cleanVitals.temperature = vitals.temperature;
    if (vitals.heartRate != null) cleanVitals.heartRate = vitals.heartRate;
    if (vitals.systolicBP != null) cleanVitals.systolicBP = vitals.systolicBP;
    if (vitals.diastolicBP != null) cleanVitals.diastolicBP = vitals.diastolicBP;
    if (vitals.respiratoryRate != null) cleanVitals.respiratoryRate = vitals.respiratoryRate;
    if (vitals.spO2 != null) cleanVitals.spO2 = vitals.spO2;
    if (vitals.weight != null) cleanVitals.weight = vitals.weight;

    const encounter = {
      id: encounterId,
      patientId,
      date,
      chiefComplaint: chiefComplaint.trim(),
      vitals: Object.keys(cleanVitals).length > 0 ? cleanVitals : undefined,
      clinicalNote: clinicalNote.trim(),
      diagnosis: diagnosis.trim() || undefined,
      diagnosisCode: diagnosisCode || undefined,
      followUpDate: followUpDate || undefined,
      createdAt: now,
      updatedAt: now,
    };

    const medRecords = medications
      .filter((m) => m.name.trim())
      .map((m) => ({
        id: generateId(),
        patientId,
        encounterId,
        name: m.name.trim(),
        dose: m.dose.trim(),
        frequency: m.frequency,
        duration: m.duration.trim() || undefined,
        isActive: true,
        startDate: date,
        endDate: undefined,
        createdAt: now,
      }));

    await db.transaction('rw', db.encounters, db.medications, db.patients, async () => {
      await db.encounters.add(encounter);
      if (medRecords.length > 0) {
        await db.medications.bulkAdd(medRecords);
      }
      await db.patients.update(patientId, { updatedAt: now });
    });

    onSave();
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-6">New Encounter</h2>

      <div className="space-y-5">
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Input
          label="Chief Complaint *"
          value={chiefComplaint}
          onChange={(e) => setChiefComplaint(e.target.value)}
          placeholder="e.g., Cough and fever for 3 days"
          autoFocus
        />

        <VitalsInput vitals={vitals} onChange={setVitals} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Note</label>
          <textarea
            value={clinicalNote}
            onChange={(e) => setClinicalNote(e.target.value)}
            placeholder="Free-text clinical note — history, exam findings, reasoning, plan..."
            rows={6}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-y"
          />
        </div>

        <DiagnosisPicker
          diagnosis={diagnosis}
          diagnosisCode={diagnosisCode}
          onChange={(d, c) => { setDiagnosis(d); setDiagnosisCode(c); }}
        />

        <MedicationInput medications={medications} onChange={setMedications} />

        <FollowUpPicker value={followUpDate} onChange={setFollowUpDate} encounterDate={date} />

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid || saving} className="flex-1">
            {saving ? 'Saving...' : 'Save Encounter'}
          </Button>
        </div>
      </div>
    </div>
  );
}

const FOLLOW_UP_INTERVALS = [
  { label: '2 days', days: 2 },
  { label: '3 days', days: 3 },
  { label: '5 days', days: 5 },
  { label: '1 week', days: 7 },
  { label: '2 weeks', days: 14 },
  { label: '1 month', days: 30 },
  { label: '3 months', days: 90 },
  { label: '6 months', days: 180 },
] as const;

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function FollowUpPicker({ value, onChange, encounterDate }: { value: string; onChange: (v: string) => void; encounterDate: string }) {
  const [showCustom, setShowCustom] = useState(false);

  function selectInterval(days: number) {
    onChange(addDays(encounterDate, days));
    setShowCustom(false);
  }

  function clear() {
    onChange('');
    setShowCustom(false);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up</label>
      <div className="flex flex-wrap gap-2">
        {FOLLOW_UP_INTERVALS.map((interval) => {
          const targetDate = addDays(encounterDate, interval.days);
          const isSelected = value === targetDate;
          return (
            <button
              key={interval.days}
              type="button"
              onClick={() => isSelected ? clear() : selectInterval(interval.days)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {interval.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${
            showCustom || (value && !FOLLOW_UP_INTERVALS.some((i) => addDays(encounterDate, i.days) === value))
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          Custom
        </button>
      </div>

      {showCustom && (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      )}

      {value && (
        <p className="text-xs text-gray-500 mt-1.5">
          Follow-up: {new Date(value + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      )}
    </div>
  );
}
