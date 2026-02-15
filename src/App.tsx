import { useMemo, useState } from 'react';
import { animate, motion } from 'framer-motion';
import teams from './data/teams.json';
import matches from './data/matches.json';
import type { Match, Team } from './types';
import { useTeamTheme } from './hooks/useTeamTheme';
import { useTimezone } from './hooks/useTimezone';
import { Header } from './components/Header';
import { TeamSelector } from './components/TeamSelector';
import { TimezoneSelector } from './components/TimezoneSelector';
import { DateSection } from './components/DateSection';
import { CalendarGrid } from './components/CalendarGrid';
import { ShareBar } from './components/ShareBar';
import { exportIcs } from './utils/calendarExport';

const teamList = teams as Team[];
const matchList = matches as Match[];
const teamMap = Object.fromEntries(teamList.map((team) => [team.id, team]));

function App() {
  const params = new URLSearchParams(window.location.search);
  const [teamId, setTeamId] = useState<string | null>(params.get('team'));
  const { timezone, setTimezone } = useTimezone((params.get('tz') as any) ?? 'ET');
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [tzOpen, setTzOpen] = useState(false);

  const activeTeam = teamId ? teamMap[teamId] : null;
  useTeamTheme(activeTeam);

  const filtered = useMemo(
    () =>
      teamId
        ? matchList.filter((match) => match.homeTeam === teamId || match.awayTeam === teamId)
        : matchList,
    [teamId],
  );

  const byDate = useMemo(() => {
    const map = new Map<string, Match[]>();
    filtered.forEach((match) => {
      if (!map.has(match.date)) map.set(match.date, []);
      map.get(match.date)?.push(match);
    });
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const month = byDate[0] ? new Date(byDate[0][0]).toLocaleString('en-US', { month: 'long' }) : 'June';

  const applyTeam = (next: string | null) => {
    setTeamId(next);
    setTeamsOpen(false);
    const nextParams = new URLSearchParams(window.location.search);
    if (next) nextParams.set('team', next);
    else nextParams.delete('team');
    window.history.replaceState({}, '', `${window.location.pathname}?${nextParams.toString()}`);
  };

  const applyTimezone = (next: any) => {
    setTimezone(next);
    const nextParams = new URLSearchParams(window.location.search);
    nextParams.set('tz', next);
    window.history.replaceState({}, '', `${window.location.pathname}?${nextParams.toString()}`);
  };

  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text)] transition-colors duration-500">
      <Header month={month} timezone={timezone} onOpenTeams={() => setTeamsOpen(true)} onOpenTimezone={() => setTzOpen(true)} />

      <main>
        {byDate.map(([date, dayMatches]) => (
          <DateSection key={date} date={date} matches={dayMatches} teams={teamMap} timezone={timezone} />
        ))}
        <CalendarGrid byDate={byDate} teams={teamMap} timezone={timezone} />

        <div className="px-4 pb-10">
          <button className="rounded border px-3 py-2 text-sm" onClick={() => exportIcs(filtered, teamMap, activeTeam?.name ?? 'all-teams')}>
            Download {activeTeam?.name ?? 'All Matches'} ICS
          </button>
        </div>

        {activeTeam ? <ShareBar team={activeTeam} url={window.location.href} /> : null}
      </main>

      <TeamSelector open={teamsOpen} teams={teamList} activeTeamId={teamId} onSelect={applyTeam} onClose={() => setTeamsOpen(false)} />
      <TimezoneSelector open={tzOpen} timezone={timezone} onSelect={applyTimezone} onClose={() => setTzOpen(false)} />
    </motion.div>
  );
}

export default App;
