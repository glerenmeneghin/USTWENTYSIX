import type { Match, Team, Venue } from "../utils/types";
import { MatchCard } from "./MatchCard";

const getDateKey = (date: Date) => date.toISOString().slice(0, 10);

const getDayNumber = (date: Date) => date.getDate();

const buildDateRange = (start: string, end: string) => {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);

  const range = [] as Date[];
  const startDay = new Date(startDate);
  startDay.setDate(startDay.getDate() - startDay.getDay());

  const endDay = new Date(endDate);
  endDay.setDate(endDay.getDate() + (6 - endDay.getDay()));

  for (let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
    range.push(new Date(d));
  }

  return range;
};

type CalendarGridProps = {
  matches: Match[];
  teamsById: Record<string, Team>;
  venuesById: Record<string, Venue>;
  timezone: string;
};

export const CalendarGrid = ({ matches, teamsById, venuesById, timezone }: CalendarGridProps) => {
  if (!matches.length) return null;

  const sorted = [...matches].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0].date;
  const last = sorted[sorted.length - 1].date;
  const range = buildDateRange(first, last);

  const matchesByDate = matches.reduce<Record<string, Match[]>>((acc, match) => {
    acc[match.date] = acc[match.date] || [];
    acc[match.date].push(match);
    return acc;
  }, {});

  return (
    <div className="hidden lg:block px-6 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-7 gap-6">
        {range.map((date) => {
          const dateKey = getDateKey(date);
          const dailyMatches = matchesByDate[dateKey] ?? [];

          return (
            <div
              key={dateKey}
              className="min-h-[200px] rounded-2xl border border-white/10 p-4"
            >
              <div className="font-display text-5xl leading-none text-[var(--color-text)]">
                {getDayNumber(date)}
              </div>
              <div className="mt-3 flex flex-col gap-3">
                {dailyMatches.map((match) => (
                  <MatchCard
                    key={match.matchNumber}
                    match={match}
                    homeTeam={teamsById[match.homeTeam]}
                    awayTeam={teamsById[match.awayTeam]}
                    timezone={timezone}
                    venue={venuesById[match.venue]}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
