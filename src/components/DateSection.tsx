import { motion } from 'framer-motion';
import type { Match, Team, TimezoneOption } from '../types';
import { convertTime } from '../utils/timeConversion';

type Props = { date: string; matches: Match[]; teams: Record<string, Team>; timezone: TimezoneOption };

export function DateSection({ date, matches, teams, timezone }: Props) {
  const day = new Date(date).getDate();
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-b border-white/10 px-4 py-5 md:hidden">
      <h2 className="font-display text-[8rem] leading-none text-[var(--color-secondary)]">{day}</h2>
      <div className="space-y-2 text-[var(--color-text)]">
        {matches.map((match) => (
          <p key={match.matchNumber} className="text-sm uppercase tracking-wide">
            {(teams[match.homeTeam]?.name ?? 'TBD')} v {(teams[match.awayTeam]?.name ?? 'TBD')} · {convertTime(match.time, timezone)} · {match.city}
          </p>
        ))}
      </div>
    </motion.section>
  );
}
