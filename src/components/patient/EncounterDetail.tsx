import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import type { Encounter } from '@/types/patient';
import { formatDate } from '@/utils/format';
import { printEncounter } from '@/utils/print';

interface EncounterDetailProps {
  encounter: Encounter;
}

export function EncounterDetail({ encounter }: EncounterDetailProps) {
  const medications = useLiveQuery(
    () => db.medications.where('encounterId').equals(encounter.id).toArray(),
    [encounter.id],
  );

  return (
    <div id={`encounter-${encounter.id}`} className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900">{encounter.chiefComplaint}</h3>
          {encounter.diagnosis && (
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full flex-shrink-0 mt-1">
              {encounter.diagnosis}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-0.5">{formatDate(encounter.date)}</p>
      </div>

      <hr className="border-gray-200" />

      {/* Vitals */}
      {encounter.vitals && Object.keys(encounter.vitals).length > 0 && (
        <section className="print-section">
          <h4 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-200">Vitals</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
            {encounter.vitals.temperature != null && (
              <div className="text-sm">
                <span className="text-gray-500">Temp</span>
                <span className="ml-2 text-gray-900 font-semibold">{encounter.vitals.temperature}°C</span>
              </div>
            )}
            {encounter.vitals.heartRate != null && (
              <div className="text-sm">
                <span className="text-gray-500">HR</span>
                <span className="ml-2 text-gray-900 font-semibold">{encounter.vitals.heartRate} bpm</span>
              </div>
            )}
            {(encounter.vitals.systolicBP != null || encounter.vitals.diastolicBP != null) && (
              <div className="text-sm">
                <span className="text-gray-500">BP</span>
                <span className="ml-2 text-gray-900 font-semibold">{encounter.vitals.systolicBP}/{encounter.vitals.diastolicBP}</span>
              </div>
            )}
            {encounter.vitals.respiratoryRate != null && (
              <div className="text-sm">
                <span className="text-gray-500">RR</span>
                <span className="ml-2 text-gray-900 font-semibold">{encounter.vitals.respiratoryRate}</span>
              </div>
            )}
            {encounter.vitals.spO2 != null && (
              <div className="text-sm">
                <span className="text-gray-500">SpO2</span>
                <span className="ml-2 text-gray-900 font-semibold">{encounter.vitals.spO2}%</span>
              </div>
            )}
            {encounter.vitals.weight != null && (
              <div className="text-sm">
                <span className="text-gray-500">Weight</span>
                <span className="ml-2 text-gray-900 font-semibold">{encounter.vitals.weight} kg</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Clinical Note */}
      {encounter.clinicalNote && (
        <section className="print-section">
          <h4 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-200">Clinical Note</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{encounter.clinicalNote}</p>
        </section>
      )}

      {/* Diagnosis */}
      {encounter.diagnosis && (
        <section className="print-section">
          <h4 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-200">Diagnosis</h4>
          <p className="text-sm text-gray-800">{encounter.diagnosis}</p>
        </section>
      )}

      {/* Medications */}
      {medications && medications.length > 0 && (
        <section className="print-section">
          <h4 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-200">Medications</h4>
          <div className="space-y-1.5">
            {medications.map((med) => (
              <div key={med.id} className="text-sm flex items-baseline justify-between">
                <div>
                  <span className="font-semibold text-gray-900">{med.name}</span>
                  <span className="text-gray-600 ml-1">{med.dose}</span>
                </div>
                <div className="text-right text-gray-500 text-xs">
                  {med.frequency}
                  {med.duration && <span className="ml-1">({med.duration})</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Follow-up */}
      {encounter.followUpDate && (
        <section className="print-section">
          <h4 className="text-sm font-bold text-gray-900 mb-2 pb-1 border-b-2 border-gray-200">Follow-up</h4>
          <p className="text-sm text-gray-800 font-medium">{formatDate(encounter.followUpDate)}</p>
        </section>
      )}

      {/* Print */}
      <div className="pt-3 flex justify-end border-t border-gray-100 no-print">
        <button
          onClick={() => printEncounter(encounter.id)}
          className="text-xs text-gray-400 hover:text-gray-600 active:text-gray-800 flex items-center gap-1.5 transition-colors cursor-pointer py-2 px-3 -mr-3"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
      </div>
    </div>
  );
}
