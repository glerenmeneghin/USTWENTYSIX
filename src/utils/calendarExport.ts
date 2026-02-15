import type { Match, Team, Venue } from "./types";

const formatICSDate = (date: Date) => {
  const pad = (value: number) => value.toString().padStart(2, "0");
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    "00Z"
  );
};

export const buildICS = (
  matches: Match[],
  venuesById: Record<string, Venue>,
  teamsById: Record<string, Team>
) => {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//USA Twenty-Six//Match Schedule//EN",
    "CALSCALE:GREGORIAN"
  ];

  matches.forEach((match) => {
    const start = new Date(`${match.date}T${match.time}:00-04:00`);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const venue = venuesById[match.venue];
    const homeLabel = teamsById[match.homeTeam]?.name ?? "TBD";
    const awayLabel = teamsById[match.awayTeam]?.name ?? "TBD";
    const location = venue ? `${venue.officialName}, ${venue.city}` : "TBD";
    lines.push(
      "BEGIN:VEVENT",
      `UID:usatwentysix-${match.matchNumber}@usatwentysix.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${homeLabel} vs ${awayLabel}`,
      `LOCATION:${location}`,
      "END:VEVENT"
    );
  });

  lines.push("END:VCALENDAR");
  return lines.join("\n");
};

export const downloadICS = (
  matches: Match[],
  venuesById: Record<string, Venue>,
  teamsById: Record<string, Team>,
  filename = "usatwentysix.ics"
) => {
  const content = buildICS(matches, venuesById, teamsById);
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
