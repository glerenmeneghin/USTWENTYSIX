import { useEffect, useState } from 'react';
import type { TimezoneOption } from '../types';

const key = 'usatwentysix:timezone';

export function useTimezone(initial: TimezoneOption) {
  const [timezone, setTimezone] = useState<TimezoneOption>(() => {
    const stored = localStorage.getItem(key) as TimezoneOption | null;
    return stored ?? initial;
  });

  useEffect(() => {
    localStorage.setItem(key, timezone);
  }, [timezone]);

  return { timezone, setTimezone };
}
