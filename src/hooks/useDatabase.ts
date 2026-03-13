import { useState, useEffect } from 'react';
import { seedDemoData } from '@/db/seed';

type AppMode = 'landing' | 'demo' | 'fresh';

export function useDatabase() {
  const savedMode = localStorage.getItem('simpleemr-mode') as 'demo' | 'fresh' | null;
  const [mode, setMode] = useState<AppMode>('landing');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (mode === 'demo') {
        await seedDemoData();
      }
      if (mode !== 'landing') {
        setReady(true);
      }
    }
    init();
  }, [mode]);

  function enterDemo() {
    localStorage.setItem('simpleemr-mode', 'demo');
    setMode('demo');
  }

  function enterFresh() {
    localStorage.setItem('simpleemr-mode', 'fresh');
    setMode('fresh');
  }

  function enterSaved() {
    if (savedMode) setMode(savedMode);
  }

  return { mode, ready, savedMode, enterDemo, enterFresh, enterSaved };
}
