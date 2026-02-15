import { useState } from "react";
import type { Team } from "../utils/types";

const buildShareMessage = (team: Team) =>
  `Check out ${team.name}'s 2026 World Cup schedule on USA Twenty-Six 🏆⚽`;

export const ShareBar = ({ team, shareUrl }: { team: Team; shareUrl: string }) => {
  const [copied, setCopied] = useState(false);
  const message = buildShareMessage(team);

  const shareTargets = [
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${message} ${shareUrl}`)}`
    }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "USA Twenty-Six", text: message, url: shareUrl });
      } catch {
        // Ignore share cancellation
      }
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <div className="text-sm uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          Share {team.name}'s schedule
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Share
          </button>
          {shareTargets.map((target) => (
            <a
              key={target.label}
              href={target.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em]"
            >
              {target.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em]"
          >
            {copied ? "Copied" : "Copy Link"}
          </button>
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-secondary)]">
          USA Twenty-Six · A typographic World Cup calendar
        </div>
      </div>
    </div>
  );
};
