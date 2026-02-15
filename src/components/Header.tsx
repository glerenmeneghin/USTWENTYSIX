import type { TimezoneOption } from '../types';

type Props = {
  month: string;
  timezone: TimezoneOption;
  onOpenTeams: () => void;
  onOpenTimezone: () => void;
};

export function Header({ month, timezone, onOpenTeams, onOpenTimezone }: Props) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/20 bg-[var(--color-primary)]/95 px-4 py-3 backdrop-blur transition-colors duration-500">
      <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)]">{month}</p>
      <div className="flex items-center gap-2 text-[var(--color-text)]">
        <button onClick={onOpenTeams} className="rounded border border-current px-2 py-1 text-sm">👕</button>
        <button onClick={onOpenTimezone} className="rounded border border-current px-2 py-1 text-xs">🕐 {timezone}</button>
        <div className="grid size-8 place-items-center rounded border border-current font-black">26</div>
      </div>
    </header>
  );
}
