import { useEffect, useMemo } from 'react';
import type { Team } from '../types';

const neutral = { primary: '#111111', secondary: '#f5f5f5', text: '#ffffff', accent: '#999999' };

export function useTeamTheme(activeTeam: Team | null) {
  const palette = useMemo(() => activeTeam?.colors ?? neutral, [activeTeam]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-secondary', palette.secondary);
    root.style.setProperty('--color-text', palette.text);
    root.style.setProperty('--color-accent', palette.accent);
  }, [palette]);

  return palette;
}
