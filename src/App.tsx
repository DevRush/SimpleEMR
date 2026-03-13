import { useState, useCallback } from 'react';
import { useDatabase } from '@/hooks/useDatabase';
import type { Route } from '@/types/common';
import { LandingPage } from '@/pages/LandingPage';
import { Header } from '@/components/layout/Header';
import { HomeScreen } from '@/components/home/HomeScreen';
import { PatientChart } from '@/components/patient/PatientChart';
import { PatientForm } from '@/components/forms/PatientForm';
import { usePatient } from '@/hooks/usePatient';
import { exportAllData, importData } from '@/db/export';
import { clearAllData } from '@/db/seed';
import { Button } from '@/components/shared/Button';

function PatientChartHeader({ patientId, onBack }: { patientId: string; onBack: () => void }) {
  const patient = usePatient(patientId);
  return <Header onBack={onBack} title={patient ? `${patient.firstName} ${patient.lastName}` : 'Patient'} />;
}

export default function App() {
  const { mode, ready, enterDemo, enterFresh } = useDatabase();
  const [route, setRoute] = useState<Route>({ page: 'home' });
  const [showSettings, setShowSettings] = useState(false);

  const goHome = useCallback(() => setRoute({ page: 'home' }), []);
  const goPatient = useCallback((id: string) => setRoute({ page: 'patient', id }), []);

  if (mode === 'landing') {
    return <LandingPage onDemo={enterDemo} onFresh={enterFresh} />;
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {route.page === 'home' && (
        <Header title="SimpleEMR" />
      )}
      {route.page === 'patient' && (
        <PatientChartHeader patientId={route.id} onBack={goHome} />
      )}
      {route.page === 'newPatient' && (
        <Header onBack={goHome} title="New Patient" />
      )}
      {route.page === 'editPatient' && (
        <Header onBack={() => setRoute({ page: 'patient', id: route.id })} title="Edit Patient" />
      )}
      {/* Content */}
      {route.page === 'home' && (
        <>
          <HomeScreen
            onSelectPatient={goPatient}
            onNewPatient={() => setRoute({ page: 'newPatient' })}
          />
          {/* Settings gear */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="fixed bottom-4 right-4 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 shadow-sm transition-colors cursor-pointer"
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {showSettings && (
            <div className="fixed bottom-16 right-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-3 w-64 z-50">
              <h3 className="text-sm font-semibold text-gray-800">Data</h3>
              <Button variant="secondary" onClick={exportAllData} className="w-full text-xs">
                Export All Data (JSON)
              </Button>
              <label className="block">
                <span className="text-xs text-gray-500">Import Data</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (confirm('This will replace all existing data. Continue?')) {
                        importData(file);
                      }
                    }
                  }}
                  className="block w-full text-xs text-gray-500 mt-1 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
              </label>
              <hr className="border-gray-100" />
              <Button
                variant="danger"
                onClick={async () => {
                  if (confirm('Delete ALL patient data? This cannot be undone.')) {
                    await clearAllData();
                    localStorage.removeItem('simpleemr-mode');
                    window.location.reload();
                  }
                }}
                className="w-full text-xs"
              >
                Reset Everything
              </Button>
            </div>
          )}
        </>
      )}

      {route.page === 'patient' && (
        <PatientChart
          patientId={route.id}
          onEditPatient={() => setRoute({ page: 'editPatient', id: route.id })}
        />
      )}

      {route.page === 'newPatient' && (
        <PatientForm
          onSave={(id) => setRoute({ page: 'patient', id })}
          onCancel={goHome}
        />
      )}

      {route.page === 'editPatient' && (
        <EditPatientWrapper
          patientId={route.id}
          onSave={() => setRoute({ page: 'patient', id: route.id })}
          onCancel={() => setRoute({ page: 'patient', id: route.id })}
        />
      )}

    </div>
  );
}

function EditPatientWrapper({ patientId, onSave, onCancel }: { patientId: string; onSave: () => void; onCancel: () => void }) {
  const patient = usePatient(patientId);
  if (!patient) return <div className="p-8 text-center text-gray-500">Loading...</div>;
  return <PatientForm existing={patient} onSave={onSave} onCancel={onCancel} />;
}
