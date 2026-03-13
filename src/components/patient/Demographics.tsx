import type { Patient } from '@/types/patient';
import { calculateAge } from '@/utils/age';
import { formatDate, formatSex } from '@/utils/format';

interface DemographicsProps {
  patient: Patient;
  onEdit: () => void;
}

export function Demographics({ patient, onEdit }: DemographicsProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-bold text-gray-900">
            {patient.firstName} {patient.lastName}
          </h1>
          <span className="text-sm font-medium text-gray-500">
            {formatSex(patient.sex)} {calculateAge(patient.dob)}y
          </span>
          <span className="text-sm text-gray-400">
            DOB: {formatDate(patient.dob)}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
          {patient.phone && <span>Phone: {patient.phone}</span>}
          {patient.address && <span>Address: {patient.address}</span>}
        </div>
        {patient.notes && (
          <div className="mt-2 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5">
            {patient.notes}
          </div>
        )}
      </div>
      <button
        onClick={onEdit}
        className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 cursor-pointer"
        title="Edit patient"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      </button>
    </div>
  );
}
