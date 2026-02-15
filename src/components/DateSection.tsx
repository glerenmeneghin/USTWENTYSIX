import { motion } from "framer-motion";
import type { Match, Team, Venue } from "../utils/types";
import { MatchCard } from "./MatchCard";

type DateSectionProps = {
  date: string;
  matches: Match[];
  teamsById: Record<string, Team>;
  venuesById: Record<string, Venue>;
  timezone: string;
};

const getDay = (date: string) => new Date(`${date}T00:00:00`).getDate();

export const DateSection = ({ date, matches, teamsById, venuesById, timezone }: DateSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="section-snap border-b border-white/10 px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <div className="font-display text-[clamp(96px,22vw,180px)] leading-none">
          {getDay(date)}
        </div>
        <div className="flex flex-col gap-4">
          {matches.map((match, index) => (
            <div key={match.matchNumber} className="flex flex-col gap-4">
              <MatchCard
                match={match}
                homeTeam={teamsById[match.homeTeam]}
                awayTeam={teamsById[match.awayTeam]}
                timezone={timezone}
                venue={venuesById[match.venue]}
              />
              {index < matches.length - 1 && (
                <div className="text-2xl text-[var(--color-secondary)]">—</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
