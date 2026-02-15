import type { Team } from "../utils/types";

type TeamSelectorProps = {
  open: boolean;
  teams: Team[];
  selectedTeamId: string | null;
  onClose: () => void;
  onSelect: (teamId: string | null) => void;
};

export const TeamSelector = ({ open, teams, selectedTeamId, onClose, onSelect }: TeamSelectorProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/70">
      <div className="absolute inset-x-0 bottom-0 max-h-[80vh] rounded-t-3xl bg-[color:var(--color-primary)] text-[var(--color-text)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="text-sm uppercase tracking-[0.3em] text-[var(--color-secondary)]">Teams</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.2em]"
          >
            Close
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
          <button
            type="button"
            onClick={() => {
              onSelect(null);
              onClose();
            }}
            className={`mb-4 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
              selectedTeamId === null ? "border-white/80" : "border-white/10 hover:border-white/40"
            }`}
          >
            <div className="text-base font-medium">All Teams</div>
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">ALL</div>
          </button>
          <div className="grid gap-3">
            {teams.map((team) => (
              <button
                key={team.id}
                type="button"
                onClick={() => {
                  onSelect(team.id);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                  selectedTeamId === team.id ? "border-white/80" : "border-white/10 hover:border-white/40"
                }`}
              >
                <div>
                  <div className="text-base font-medium">
                    {team.flag ? <span className="mr-2">{team.flag}</span> : null}
                    {team.name}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                    Group {team.group}
                  </div>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  {team.code}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
