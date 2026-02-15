const TIMEZONE_MAP: Record<string, string> = {
  ET: "America/New_York",
  CT: "America/Chicago",
  MT: "America/Denver",
  PT: "America/Los_Angeles",
  "Mexico City": "America/Mexico_City",
  Local: Intl.DateTimeFormat().resolvedOptions().timeZone
};

export const getTimezoneOptions = () => Object.keys(TIMEZONE_MAP);

export const toZonedTime = (date: string, time: string, target: string) => {
  const timeZone = TIMEZONE_MAP[target] ?? TIMEZONE_MAP.ET;
  // The tournament runs in June/July, so ET is EDT (UTC-04) for schedule times.
  const baseDate = new Date(`${date}T${time}:00-04:00`);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  return formatter.format(baseDate);
};

export const formatMatchTime = (date: string, time: string, target: string) => {
  const formatted = toZonedTime(date, time, target);
  return `${formatted} ${target}`;
};
