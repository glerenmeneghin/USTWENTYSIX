import type { Match, Team, Venue } from "../utils/types";
import { formatMatchTime } from "../utils/timeConversion";

type MatchCardProps = {
  match: Match;
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;
  timezone: string;
  venue: Venue | undefined;
};

export const MatchCard = ({ match, homeTeam, awayTeam, timezone, venue }: MatchCardProps) => {
  const homeLabel = homeTeam?.name ?? "TBD";
  const awayLabel = awayTeam?.name ?? "TBD";
  const venueLabel = venue ? `${venue.city}` : "TBD";

  return (
    <div className="flex flex-col gap-1 text-sm text-[var(--color-text)]">
      <div className="text-base font-medium">
        {homeLabel} v {awayLabel}
      </div>
      {match.description && (
        <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-secondary)]">
          {match.description}
        </div>
      )}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-[var(--color-secondary)]">
        <span>{formatMatchTime(match.date, match.time, timezone)}</span>
        <span>{venueLabel}</span>
      </div>
    </div>
  );
};
