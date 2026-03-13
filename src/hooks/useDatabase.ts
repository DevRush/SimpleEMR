import { useState, useEffect } from 'react';
import { seedDemoData } from '@/db/seed';

type AppMode = 'landing' | 'demo' | 'fresh';

export function useDatabase() {
  const [mode, setMode] = useState<AppMode>(() => {
    return (localStorage.getItem('simpleemr-mode') as AppMode) || 'landing';
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (mode === 'demo') {
        await seedDemoData();
      }
      setReady(true);
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

  return { mode, ready, enterDemo, enterFresh };
}
