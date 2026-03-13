import { Button } from '@/components/shared/Button';

interface LandingPageProps {
  onDemo: () => void;
  onFresh: () => void;
}

export function LandingPage({ onDemo, onFresh }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center">
        {/* Logo / Icon */}
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          SimpleEMR
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Medical records that work offline.
        </p>
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
          A lightweight electronic medical record system designed for rural clinics and resource-limited settings. No internet required. No setup needed. Just open and start recording.
        </p>

        {/* Feature list */}
        <div className="grid grid-cols-2 gap-3 text-left mb-10 max-w-sm mx-auto">
          {[
            ['Patient records', 'Search by name or DOB'],
            ['Clinical notes', 'Structured + free text'],
            ['Medications', 'Track prescriptions'],
            ['Works offline', 'All data stored locally'],
            ['Print encounters', 'Clean formatted summaries'],
            ['Export data', 'JSON backup & restore'],
          ].map(([title, desc]) => (
            <div key={title} className="flex items-start gap-2">
              <svg className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <div className="text-sm font-medium text-gray-800">{title}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onDemo} className="px-8 py-3 text-base">
            Try Demo
          </Button>
          <Button onClick={onFresh} variant="secondary" className="px-8 py-3 text-base">
            Start Fresh
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Demo loads 12 sample patients with realistic clinical data.
          <br />
          All data is stored in your browser — nothing is sent to a server.
        </p>
      </div>
    </div>
  );
}
