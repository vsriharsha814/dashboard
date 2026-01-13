'use client';

import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeDebug() {
  const { theme, mounted } = useTheme();
  const [hasDarkClass, setHasDarkClass] = useState(false);

  useEffect(() => {
    setHasDarkClass(document.documentElement.classList.contains('dark'));
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div>Current Theme: <strong>{theme}</strong></div>
      <div>Dark Class on HTML: <strong>{hasDarkClass ? 'YES' : 'NO'}</strong></div>
      <div>Mounted: <strong>{mounted ? 'YES' : 'NO'}</strong></div>
    </div>
  );
}

