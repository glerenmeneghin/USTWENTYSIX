
type TimezoneSelectorProps = {
  open: boolean;
  timezone: string;
  options: string[];
  onClose: () => void;
  onSelect: (tz: string) => void;
};

export const TimezoneSelector = ({ open, timezone, options, onClose, onSelect }: TimezoneSelectorProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/70">
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-[color:var(--color-primary)] text-[var(--color-text)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Timezones</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em]"
          >
            Close
          </button>
        </div>
        <div className="grid gap-3 px-6 py-4">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option);
                onClose();
              }}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                timezone === option ? "border-white/80" : "border-white/10 hover:border-white/40"
              }`}
            >
              <div className="text-base font-medium">{option}</div>
              {timezone === option && (
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">Active</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
