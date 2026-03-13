import { COMMON_DIAGNOSES } from '@/data/commonDiagnoses';

interface DiagnosisPickerProps {
  diagnosis: string;
  diagnosisCode: string;
  onChange: (diagnosis: string, code: string) => void;
}

export function DiagnosisPicker({ diagnosis, diagnosisCode, onChange }: DiagnosisPickerProps) {
  function handleChange(value: string) {
    const match = COMMON_DIAGNOSES.find(
      (d) => d.label.toLowerCase() === value.toLowerCase(),
    );
    onChange(value, match?.code || diagnosisCode);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
      <input
        type="text"
        list="diagnosis-options"
        value={diagnosis}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Type or select a diagnosis"
        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
      />
      <datalist id="diagnosis-options">
        {COMMON_DIAGNOSES.map((d) => (
          <option key={d.code + d.label} value={d.label} />
        ))}
      </datalist>
    </div>
  );
}
