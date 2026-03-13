import { FREQUENCIES } from '@/data/frequencies';

export interface MedEntry {
  name: string;
  dose: string;
  frequency: string;
  duration: string;
}

interface MedicationInputProps {
  medications: MedEntry[];
  onChange: (meds: MedEntry[]) => void;
}

export function MedicationInput({ medications, onChange }: MedicationInputProps) {
  function addMed() {
    onChange([...medications, { name: '', dose: '', frequency: 'Once daily', duration: '' }]);
  }

  function updateMed(index: number, field: keyof MedEntry, value: string) {
    const updated = medications.map((m, i) =>
      i === index ? { ...m, [field]: value } : m,
    );
    onChange(updated);
  }

  function removeMed(index: number) {
    onChange(medications.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Medications</h3>
        <button
          type="button"
          onClick={addMed}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
        >
          + Add Medication
        </button>
      </div>

      {medications.length === 0 && (
        <p className="text-xs text-gray-400">No medications added</p>
      )}

      <div className="space-y-3">
        {medications.map((med, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">Medication {i + 1}</span>
              <button
                type="button"
                onClick={() => removeMed(i)}
                className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={med.name}
                onChange={(e) => updateMed(i, 'name', e.target.value)}
                placeholder="Name (e.g., Amoxicillin)"
                className="col-span-2 px-2 py-1.5 rounded border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={med.dose}
                onChange={(e) => updateMed(i, 'dose', e.target.value)}
                placeholder="Dose (e.g., 500mg)"
                className="px-2 py-1.5 rounded border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={med.frequency}
                onChange={(e) => updateMed(i, 'frequency', e.target.value)}
                className="px-2 py-1.5 rounded border border-gray-300 bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {FREQUENCIES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <input
                type="text"
                value={med.duration}
                onChange={(e) => updateMed(i, 'duration', e.target.value)}
                placeholder="Duration (e.g., 7 days)"
                className="col-span-2 px-2 py-1.5 rounded border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
