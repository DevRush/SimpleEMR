import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import { usePatientSearch } from '@/hooks/usePatientSearch';
import { SearchResults } from './SearchResults';
import { Button } from '@/components/shared/Button';
import { calculateAge } from '@/utils/age';
import { formatSex } from '@/utils/format';

interface HomeScreenProps {
  onSelectPatient: (id: string) => void;
  onNewPatient: () => void;
}

export function HomeScreen({ onSelectPatient, onNewPatient }: HomeScreenProps) {
  const [query, setQuery] = useState('');
  const results = usePatientSearch(query);
  const recentPatients = useLiveQuery(async () => {
    const all = await db.patients.toArray();
    return all.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);
  });

  return (
    <div className="min-h-[calc(100dvh-57px)] flex flex-col items-center justify-start pt-[15dvh] px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">SimpleEMR</h2>
          <p className="text-sm text-gray-500">Search for a patient to get started</p>
        </div>

        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or date of birth..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
            autoFocus
          />
        </div>

        {query.trim() && results && (
          <SearchResults results={results} onSelect={onSelectPatient} />
        )}

        <div className="mt-6 text-center">
          <Button onClick={onNewPatient} variant="secondary">
            + New Patient
          </Button>
        </div>

        {/* Recent patients — shown when not searching */}
        {!query.trim() && recentPatients && recentPatients.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">
              Recent Patients
            </h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              {recentPatients.map((patient, i) => (
                <button
                  key={patient.id}
                  onClick={() => onSelectPatient(patient.id)}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors flex items-center justify-between cursor-pointer ${
                    i > 0 ? 'border-t border-gray-100' : ''
                  }`}
                >
                  <span className="font-medium text-gray-800 italic">
                    {patient.firstName} {patient.lastName}
                  </span>
                  <span className="text-sm text-gray-400">
                    {calculateAge(patient.dob)}y {formatSex(patient.sex)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
