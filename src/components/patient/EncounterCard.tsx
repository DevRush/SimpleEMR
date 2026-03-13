import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/db';
import type { Encounter } from '@/types/patient';
import { formatDate } from '@/utils/format';
import { printEncounter } from '@/utils/print';

interface EncounterCardProps {
  encounter: Encounter;
}

export function EncounterCard({ encounter }: EncounterCardProps) {
  const [expanded, setExpanded] = useState(false);

  const medications = useLiveQuery(
    () => db.medications.where('encounterId').equals(encounter.id).toArray(),
    [encounter.id],
  );

  return (
    <div
      id={`encounter-${encounter.id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${expanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <div>
            <span className="text-sm font-medium text-gray-800">
              {formatDate(encounter.date)}
            </span>
            <span className="text-sm text-gray-500 ml-2">
              {encounter.chiefComplaint}
            </span>
          </div>
        </div>
        {encounter.diagnosis && (
          <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
            {encounter.diagnosis}
          </span>
        )}
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-3">
          {/* Vitals */}
          {encounter.vitals && Object.keys(encounter.vitals).length > 0 && (
            <div className="print-section">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Vitals</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                {encounter.vitals.temperature != null && (
                  <div><span className="text-gray-500">Temp:</span> <span className="text-gray-800">{encounter.vitals.temperature}°C</span></div>
                )}
                {encounter.vitals.heartRate != null && (
                  <div><span className="text-gray-500">HR:</span> <span className="text-gray-800">{encounter.vitals.heartRate} bpm</span></div>
                )}
                {(encounter.vitals.systolicBP != null || encounter.vitals.diastolicBP != null) && (
                  <div><span className="text-gray-500">BP:</span> <span className="text-gray-800">{encounter.vitals.systolicBP}/{encounter.vitals.diastolicBP}</span></div>
                )}
                {encounter.vitals.respiratoryRate != null && (
                  <div><span className="text-gray-500">RR:</span> <span className="text-gray-800">{encounter.vitals.respiratoryRate}</span></div>
                )}
                {encounter.vitals.spO2 != null && (
                  <div><span className="text-gray-500">SpO2:</span> <span className="text-gray-800">{encounter.vitals.spO2}%</span></div>
                )}
                {encounter.vitals.weight != null && (
                  <div><span className="text-gray-500">Wt:</span> <span className="text-gray-800">{encounter.vitals.weight} kg</span></div>
                )}
              </div>
            </div>
          )}

          {/* Clinical Note */}
          {encounter.clinicalNote && (
            <div className="print-section">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Clinical Note</h4>
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{encounter.clinicalNote}</p>
            </div>
          )}

          {/* Diagnosis */}
          {encounter.diagnosis && (
            <div className="print-section">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Diagnosis</h4>
              <p className="text-sm text-gray-800">
                {encounter.diagnosis}
                {encounter.diagnosisCode && (
                  <span className="text-gray-400 ml-1">({encounter.diagnosisCode})</span>
                )}
              </p>
            </div>
          )}

          {/* Medications prescribed */}
          {medications && medications.length > 0 && (
            <div className="print-section">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Medications Prescribed</h4>
              <div className="space-y-1">
                {medications.map((med) => (
                  <div key={med.id} className="text-sm text-gray-800">
                    <span className="font-medium">{med.name}</span> {med.dose} — {med.frequency}
                    {med.duration && <span className="text-gray-500"> ({med.duration})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Follow-up */}
          {encounter.followUpDate && (
            <div className="print-section">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Follow-up</h4>
              <p className="text-sm text-gray-800">{formatDate(encounter.followUpDate)}</p>
            </div>
          )}

          {/* Print button */}
          <div className="pt-2 flex justify-end no-print">
            <button
              onClick={() => printEncounter(encounter.id)}
              className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
