import { useState, useEffect } from 'react';

interface HeaderProps {
  onBack?: () => void;
  title?: string;
}

export function Header({ onBack, title }: HeaderProps) {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  return (
    <header className="bg-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-40" style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}>
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 -ml-2 text-gray-400 hover:text-white active:text-gray-200 transition-colors cursor-pointer"
            aria-label="Go back"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-bold text-white">
          {title || 'SimpleEMR'}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${online ? 'bg-emerald-400' : 'bg-amber-400'}`}
          title={online ? 'Online' : 'Offline'}
        />
        <span className="text-xs text-gray-400">{online ? 'Online' : 'Offline'}</span>
      </div>
    </header>
  );
}
