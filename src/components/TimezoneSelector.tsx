import type { TimezoneOption } from '../types';

const options: TimezoneOption[] = ['ET', 'CT', 'MT', 'PT', 'Mexico City', 'Local'];

type Props = {
  open: boolean;
  timezone: TimezoneOption;
  onSelect: (timezone: TimezoneOption) => void;
  onClose: () => void;
};

export function TimezoneSelector({ open, timezone, onSelect, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/50" onClick={onClose}>
      <div className="absolute right-4 top-16 rounded-xl bg-zinc-950 p-3" onClick={(e) => e.stopPropagation()}>
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              onSelect(option);
              onClose();
            }}
            className={`block w-full rounded px-3 py-2 text-left ${timezone === option ? 'bg-zinc-700' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
