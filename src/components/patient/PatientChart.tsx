import { useState } from 'react';
import { usePatient } from '@/hooks/usePatient';
import { useEncounters } from '@/hooks/useEncounters';
import { useActiveMedications } from '@/hooks/useMedications';
import { EncounterDetail } from './EncounterDetail';
import { EncounterForm } from '@/components/encounter/EncounterForm';
import { Button } from '@/components/shared/Button';
import { formatDate, formatSex } from '@/utils/format';
import { calculateAge } from '@/utils/age';

interface PatientChartProps {
  patientId: string;
  onEditPatient: () => void;
}

export function PatientChart({ patientId, onEditPatient }: PatientChartProps) {
  const patient = usePatient(patientId);
  const encounters = useEncounters(patientId);
  const activeMeds = useActiveMedications(patientId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composing, setComposing] = useState(false);

  const selectedEncounter = composing ? null : (encounters?.find((e) => e.id === selectedId) || encounters?.[0] || null);
  const mobileSplitOpen = selectedId !== null && !composing && !!selectedEncounter;

  if (!patient) {
    return <div className="p-8 text-center text-gray-500">Loading patient...</div>;
  }

  function handleNewEncounter() {
    setComposing(true);
    setSelectedId(null);
  }

  function handleEncounterSaved() {
    setComposing(false);
    // The new encounter will appear at the top of the list via useLiveQuery
  }

  function handleCancelCompose() {
    setComposing(false);
  }

  function handleSelectEncounter(id: string) {
    setComposing(false);
    setSelectedId(id);
  }

  return (
    <div className="h-[calc(100dvh-57px)] flex flex-col overflow-hidden">
      {/* Compact patient bar */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2 min-w-0">
            <h2 className="text-base font-bold text-gray-900 truncate">
              {patient.firstName} {patient.lastName}
            </h2>
            <span className="text-sm text-gray-500 flex-shrink-0">
              {calculateAge(patient.dob)}y {formatSex(patient.sex)}
            </span>
            <span className="text-sm text-gray-400 flex-shrink-0 hidden sm:inline">
              DOB {formatDate(patient.dob)}
            </span>
            {patient.phone && (
              <span className="text-sm text-gray-400 flex-shrink-0 hidden md:inline">
                {patient.phone}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {activeMeds && activeMeds.length > 0 && (
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hidden sm:inline-block">
                {activeMeds.length} active med{activeMeds.length > 1 ? 's' : ''}
              </span>
            )}
            {patient.notes && (
              <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full hidden sm:inline-block" title={patient.notes}>
                Note
              </span>
            )}
            <button
              onClick={onEditPatient}
              className="text-gray-400 hover:text-gray-700 active:text-gray-900 transition-colors p-2.5 -mr-2 cursor-pointer"
              title="Edit patient"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Two-panel encounters */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 max-w-6xl mx-auto w-full">
        {/* Mobile: encounter detail (top of split view) */}
        {mobileSplitOpen && selectedEncounter && (
          <div className="md:hidden flex-1 flex flex-col min-h-0 order-1 bg-gray-50">
            <div className="flex-shrink-0 bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-3">
              <button
                onClick={() => setSelectedId(null)}
                className="p-2 -ml-2 text-gray-500 hover:text-gray-800 active:text-gray-900 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-800 truncate">
                {formatDate(selectedEncounter.date)} — {selectedEncounter.chiefComplaint}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 min-h-0">
              <EncounterDetail encounter={selectedEncounter} />
            </div>
          </div>
        )}

        {/* Encounter list panel */}
        <div className={`w-full md:w-72 lg:w-80 flex-shrink-0 border-r border-gray-200 bg-white flex flex-col ${
          mobileSplitOpen ? 'order-2 md:order-none h-44 md:h-auto border-t md:border-t-0 rounded-t-xl md:rounded-none shadow-[0_-2px_8px_rgba(0,0,0,0.06)] md:shadow-none' : ''
        }`}>
          <div className={`flex items-center justify-between px-3 border-b border-gray-100 ${mobileSplitOpen ? 'py-1.5' : 'py-2.5'}`}>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Encounters
              {encounters && encounters.length > 0 && (
                <span className="ml-1 text-gray-400">({encounters.length})</span>
              )}
            </span>
            <Button onClick={handleNewEncounter} className="text-xs px-2.5 py-1">
              + New
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {encounters && encounters.length === 0 && !composing && (
              <div className="p-6 text-center text-gray-400 text-sm">
                No encounters yet.
              </div>
            )}

            {encounters?.map((enc) => {
              const isSelected = !composing && enc.id === selectedEncounter?.id;
              return (
                <button
                  key={enc.id}
                  onClick={() => handleSelectEncounter(enc.id)}
                  className={`w-full text-left px-3 border-b border-gray-50 transition-colors cursor-pointer ${
                    mobileSplitOpen ? 'py-1.5 flex items-center gap-2' : 'py-3'
                  } ${
                    isSelected
                      ? 'bg-blue-50 border-l-[3px] border-l-blue-600'
                      : 'hover:bg-gray-50 border-l-[3px] border-l-transparent'
                  }`}
                >
                  <span className={`text-xs flex-shrink-0 ${isSelected ? 'text-blue-600 font-semibold' : 'text-gray-400 font-medium'}`}>
                    {formatDate(enc.date)}
                  </span>
                  {mobileSplitOpen ? (
                    <span className={`text-xs truncate ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                      {enc.chiefComplaint}
                    </span>
                  ) : (
                    <>
                      <p className={`text-sm mt-0.5 truncate ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                        {enc.chiefComplaint}
                      </p>
                      {enc.diagnosis && (
                        <span className="text-[11px] text-gray-400 mt-0.5 block truncate">
                          {enc.diagnosis}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right panel: detail or compose */}
        <div className="hidden md:flex flex-1 flex-col min-w-0 bg-gray-50">
          {composing ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-xl">
                <EncounterForm
                  patientId={patientId}
                  onSave={handleEncounterSaved}
                  onCancel={handleCancelCompose}
                />
              </div>
            </div>
          ) : selectedEncounter ? (
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-xl">
                <EncounterDetail encounter={selectedEncounter} />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              {encounters && encounters.length > 0
                ? 'Select an encounter to view details'
                : 'Create an encounter to get started'}
            </div>
          )}
        </div>

        {/* Mobile: full-screen overlay for composing only */}
        {composing && (
          <div className="md:hidden fixed inset-0 z-30 bg-gray-50">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
              <button
                onClick={() => { setSelectedId(null); setComposing(false); }}
                className="p-2 -ml-2 text-gray-500 hover:text-gray-800 active:text-gray-900 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-800 truncate">
                New Encounter
              </span>
            </div>
            <div className="overflow-y-auto p-4 h-[calc(100dvh-57px)]">
              <EncounterForm
                patientId={patientId}
                onSave={handleEncounterSaved}
                onCancel={handleCancelCompose}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
