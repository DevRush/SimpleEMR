import type { Vitals } from '@/types/patient';

interface VitalsInputProps {
  vitals: Vitals;
  onChange: (vitals: Vitals) => void;
}

function VitalField({
  label,
  unit,
  value,
  onChange,
}: {
  label: string;
  unit: string;
  value: number | undefined;
  onChange: (v: number | undefined) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        {label} <span className="text-gray-400">({unit})</span>
      </label>
      <input
        type="number"
        step="any"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined)}
        className="w-full px-2 py-1.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="—"
      />
    </div>
  );
}

export function VitalsInput({ vitals, onChange }: VitalsInputProps) {
  function update(field: keyof Vitals, value: number | undefined) {
    onChange({ ...vitals, [field]: value });
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Vitals</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <VitalField label="Temp" unit="°C" value={vitals.temperature} onChange={(v) => update('temperature', v)} />
        <VitalField label="HR" unit="bpm" value={vitals.heartRate} onChange={(v) => update('heartRate', v)} />
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            BP <span className="text-gray-400">(mmHg)</span>
          </label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={vitals.systolicBP ?? ''}
              onChange={(e) => update('systolicBP', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-2 py-1.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="sys"
            />
            <span className="text-gray-400">/</span>
            <input
              type="number"
              value={vitals.diastolicBP ?? ''}
              onChange={(e) => update('diastolicBP', e.target.value ? Number(e.target.value) : undefined)}
              className="w-full px-2 py-1.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="dia"
            />
          </div>
        </div>
        <VitalField label="RR" unit="/min" value={vitals.respiratoryRate} onChange={(v) => update('respiratoryRate', v)} />
        <VitalField label="SpO2" unit="%" value={vitals.spO2} onChange={(v) => update('spO2', v)} />
        <VitalField label="Weight" unit="kg" value={vitals.weight} onChange={(v) => update('weight', v)} />
      </div>
    </div>
  );
}
