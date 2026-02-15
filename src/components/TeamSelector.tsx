import type { Team } from '../types';

type Props = {
  open: boolean;
  teams: Team[];
  activeTeamId: string | null;
  onSelect: (teamId: string | null) => void;
  onClose: () => void;
};

export function TeamSelector({ open, teams, activeTeamId, onSelect, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 bg-black/50" onClick={onClose}>
      <div className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-auto rounded-t-2xl bg-zinc-950 p-4" onClick={(e) => e.stopPropagation()}>
        <button className="mb-3 text-sm text-zinc-400" onClick={onClose}>Close</button>
        <button onClick={() => onSelect(null)} className="mb-2 block w-full rounded border px-3 py-2 text-left">
          All Teams
        </button>
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => onSelect(team.id)}
            className={`mb-2 flex w-full items-center justify-between rounded border px-3 py-2 text-left ${activeTeamId === team.id ? 'border-white' : 'border-zinc-700'}`}
          >
            <span>{team.flag} {team.name}</span>
            <span className="text-xs text-zinc-400">Group {team.group}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
