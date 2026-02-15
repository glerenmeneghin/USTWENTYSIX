import type { Match, Team, TimezoneOption } from '../types';
import { convertTime } from '../utils/timeConversion';

type Props = { byDate: [string, Match[]][]; teams: Record<string, Team>; timezone: TimezoneOption };

export function CalendarGrid({ byDate, teams, timezone }: Props) {
  return (
    <section className="mx-auto hidden max-w-7xl grid-cols-7 gap-3 p-6 lg:grid">
      {byDate.map(([date, matches]) => (
        <article key={date} className="min-h-44 rounded border border-white/15 p-3">
          <h3 className="font-display text-6xl leading-none text-[var(--color-secondary)]">{new Date(date).getDate()}</h3>
          <div className="mt-2 space-y-2 text-xs">
            {matches.map((match) => (
              <p key={match.matchNumber}>
                {(teams[match.homeTeam]?.code ?? 'TBD')} v {(teams[match.awayTeam]?.code ?? 'TBD')} · {convertTime(match.time, timezone)}
              </p>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
