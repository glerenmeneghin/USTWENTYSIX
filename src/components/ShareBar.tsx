import type { Team } from '../types';

type Props = { team: Team; url: string };

export function ShareBar({ team, url }: Props) {
  const message = encodeURIComponent(`Check out ${team.name}'s 2026 World Cup schedule on USA Twenty-Six 🏆⚽`);
  const encodedUrl = encodeURIComponent(url);

  async function copy() {
    await navigator.clipboard.writeText(url);
  }

  return (
    <footer className="mt-8 border-t border-white/20 p-4 text-sm">
      <p className="mb-3">Share {team.name}'s schedule</p>
      <div className="flex flex-wrap gap-2">
        <a className="rounded border px-2 py-1" target="_blank" href={`https://twitter.com/intent/tweet?text=${message}&url=${encodedUrl}`}>X</a>
        <a className="rounded border px-2 py-1" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}>Facebook</a>
        <a className="rounded border px-2 py-1" target="_blank" href={`https://wa.me/?text=${message}%20${encodedUrl}`}>WhatsApp</a>
        <button className="rounded border px-2 py-1" onClick={copy}>Copy Link</button>
      </div>
    </footer>
  );
}
