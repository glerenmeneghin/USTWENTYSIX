import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { TeamSelector } from "./components/TeamSelector";
import { TimezoneSelector } from "./components/TimezoneSelector";
import { DateSection } from "./components/DateSection";
import { CalendarGrid } from "./components/CalendarGrid";
import { ShareBar } from "./components/ShareBar";
import teamsData from "./data/teams.json";
import matchesData from "./data/matches.json";
import venuesData from "./data/venues.json";
import { useTeamTheme } from "./hooks/useTeamTheme";
import { useTimezoneOptions } from "./hooks/useTimezone";
import { downloadICS } from "./utils/calendarExport";
import type { Match, Team, Venue } from "./utils/types";

const teams = teamsData as Team[];
const matches = matchesData as Match[];
const venues = venuesData as Venue[];

const getMonthLabel = (date: string) =>
  new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(`${date}T00:00:00`));

const buildShareUrl = (teamId: string | null, timezone: string) => {
  const url = new URL(window.location.href);
  if (teamId) {
    url.searchParams.set("team", teamId);
  } else {
    url.searchParams.delete("team");
  }
  url.searchParams.set("tz", timezone);
  return url.toString();
};

const updateUrl = (teamId: string | null, timezone: string) => {
  const url = new URL(window.location.href);
  if (teamId) {
    url.searchParams.set("team", teamId);
  } else {
    url.searchParams.delete("team");
  }
  url.searchParams.set("tz", timezone);
  window.history.replaceState({}, "", url.toString());
};

const getInitialState = () => {
  const url = new URL(window.location.href);
  const team = url.searchParams.get("team");
  const tz = url.searchParams.get("tz");
  return {
    team: team && teams.some((t) => t.id === team) ? team : null,
    timezone: tz ?? "ET"
  };
};

export default function App() {
  const timezoneOptions = useTimezoneOptions();
  const [teamOpen, setTeamOpen] = useState(false);
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [timezone, setTimezone] = useState("ET");

  useEffect(() => {
    const initial = getInitialState();
    setSelectedTeamId(initial.team);
    setTimezone(initial.timezone);
  }, []);

  useEffect(() => {
    updateUrl(selectedTeamId, timezone);
  }, [selectedTeamId, timezone]);

  const selectedTeam = useMemo(
    () => teams.find((team) => team.id === selectedTeamId) ?? null,
    [selectedTeamId]
  );

  useTeamTheme(selectedTeam);

  const teamsById = useMemo(
    () => teams.reduce<Record<string, Team>>((acc, team) => {
      acc[team.id] = team;
      return acc;
    }, {}),
    []
  );

  const venuesById = useMemo(
    () => venues.reduce<Record<string, Venue>>((acc, venue) => {
      acc[venue.id] = venue;
      return acc;
    }, {}),
    []
  );

  const filteredMatches = useMemo(() => {
    if (!selectedTeamId) return matches;
    return matches.filter(
      (match) => match.homeTeam === selectedTeamId || match.awayTeam === selectedTeamId
    );
  }, [selectedTeamId]);

  const matchesByDate = useMemo(() => {
    const grouped: Record<string, Match[]> = {};
    filteredMatches.forEach((match) => {
      grouped[match.date] = grouped[match.date] || [];
      grouped[match.date].push(match);
    });
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, list]) => ({ date, matches: list }));
  }, [filteredMatches]);

  const monthLabel = matchesByDate.length ? getMonthLabel(matchesByDate[0].date) : "";
  const shareUrl = buildShareUrl(selectedTeamId, timezone);

  return (
    <div className="app-shell">
      <Header
        monthLabel={monthLabel}
        onOpenTeams={() => setTeamOpen(true)}
        onOpenTimezone={() => setTimezoneOpen(true)}
        timezone={timezone}
        selectedTeam={selectedTeam}
      />

      <main className="lg:hidden">
        <div className="snap-y snap-mandatory">
          {matchesByDate.map((group) => (
            <DateSection
              key={group.date}
              date={group.date}
              matches={group.matches}
              teamsById={teamsById}
              venuesById={venuesById}
              timezone={timezone}
            />
          ))}
        </div>
      </main>

      <CalendarGrid
        matches={filteredMatches}
        teamsById={teamsById}
        venuesById={venuesById}
        timezone={timezone}
      />

      <div className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          <div>Download calendar</div>
          <button
            type="button"
            onClick={() =>
              downloadICS(
                filteredMatches,
                venuesById,
                teamsById,
                selectedTeam ? `${selectedTeam.id}-schedule.ics` : "usatwentysix.ics"
              )
            }
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Get ICS
          </button>
        </div>
      </div>

      {selectedTeam && <ShareBar team={selectedTeam} shareUrl={shareUrl} />}

      <TeamSelector
        open={teamOpen}
        teams={teams}
        selectedTeamId={selectedTeamId}
        onClose={() => setTeamOpen(false)}
        onSelect={setSelectedTeamId}
      />

      <TimezoneSelector
        open={timezoneOpen}
        timezone={timezone}
        options={timezoneOptions}
        onClose={() => setTimezoneOpen(false)}
        onSelect={setTimezone}
      />
    </div>
  );
}
