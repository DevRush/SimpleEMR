import type { Patient } from '@/types/patient';
import { calculateAge } from '@/utils/age';
import { formatDate, formatSex } from '@/utils/format';

interface SearchResultsProps {
  results: Patient[];
  onSelect: (id: string) => void;
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center text-sm text-gray-500">
        No patients found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {results.map((patient, i) => (
        <button
          key={patient.id}
          onClick={() => onSelect(patient.id)}
          className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between cursor-pointer ${
            i > 0 ? 'border-t border-gray-100' : ''
          }`}
        >
          <div>
            <span className="font-medium text-gray-800">
              {patient.firstName} {patient.lastName}
            </span>
            <span className="ml-2 text-sm text-gray-500">
              {formatSex(patient.sex)} {calculateAge(patient.dob)}y
            </span>
          </div>
          <span className="text-xs text-gray-400">
            DOB: {formatDate(patient.dob)}
          </span>
        </button>
      ))}
    </div>
  );
}
