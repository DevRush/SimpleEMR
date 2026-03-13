import type { Medication } from '@/types/patient';
import { Collapsible } from '@/components/shared/Collapsible';

interface MedicationListProps {
  medications: Medication[];
}

export function MedicationList({ medications }: MedicationListProps) {
  if (medications.length === 0) return null;

  return (
    <Collapsible title="Active Medications" badge={medications.length} defaultOpen>
      <div className="space-y-1.5">
        {medications.map((med) => (
          <div key={med.id} className="flex items-center justify-between text-sm">
            <div>
              <span className="font-semibold text-gray-900">{med.name}</span>
              <span className="text-gray-600 ml-1.5">{med.dose}</span>
            </div>
            <span className="text-gray-500 text-xs font-medium">{med.frequency}</span>
          </div>
        ))}
      </div>
    </Collapsible>
  );
}
