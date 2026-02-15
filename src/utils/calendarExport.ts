import type { Match, Team } from '../types';

export function exportIcs(matches: Match[], teams: Record<string, Team>, name: string) {
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//USA Twenty-Six//EN'];

  for (const match of matches) {
    const [y, m, d] = match.date.split('-').map(Number);
    const [hh, mm] = match.time.split(':').map(Number);
    const start = new Date(Date.UTC(y, m - 1, d, hh + 4, mm));
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    const home = teams[match.homeTeam]?.name ?? 'TBD';
    const away = teams[match.awayTeam]?.name ?? 'TBD';

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:match-${match.matchNumber}@usatwentysix.com`);
    lines.push(`DTSTAMP:${formatDate(new Date())}`);
    lines.push(`DTSTART:${formatDate(start)}`);
    lines.push(`DTEND:${formatDate(end)}`);
    lines.push(`SUMMARY:${home} vs ${away}`);
    lines.push(`LOCATION:${match.venue}, ${match.city}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-schedule.ics`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function formatDate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}
