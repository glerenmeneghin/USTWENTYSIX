import type { Team } from "../utils/types";

type HeaderProps = {
  monthLabel: string;
  onOpenTeams: () => void;
  onOpenTimezone: () => void;
  timezone: string;
  selectedTeam: Team | null;
};

const IconJersey = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path
      d="M8 3l4 2 4-2 4 4-3 2v10H7V9L4 7l4-4z"
      fill="currentColor"
    />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
    <path
      d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5h-2v6l5 3 1-1-4-2V7z"
      fill="currentColor"
    />
  </svg>
);

export const Header = ({ monthLabel, onOpenTeams, onOpenTimezone, timezone, selectedTeam }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[color:var(--color-primary)] transition-colors">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]/80">
          {monthLabel}
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          <button
            type="button"
            onClick={onOpenTeams}
            className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-[var(--color-text)] transition hover:border-white/60"
          >
            <IconJersey />
            <span>{selectedTeam ? selectedTeam.code : "ALL"}</span>
          </button>
          <button
            type="button"
            onClick={onOpenTimezone}
            className="flex items-center gap-2 rounded-full border border-white/30 px-3 py-1.5 text-[var(--color-text)] transition hover:border-white/60"
          >
            <IconClock />
            <span>{timezone}</span>
          </button>
          <div className="badge-26 flex h-8 w-8 items-center justify-center rounded-sm border border-white/60 text-base">
            26
          </div>
        </div>
      </div>
      <div className="header-rule" />
    </header>
  );
};
