import type { TimezoneOption } from '../types';

const offsets: Record<Exclude<TimezoneOption, 'Local'>, number> = {
  ET: 0,
  CT: -1,
  MT: -2,
  PT: -3,
  'Mexico City': -1,
};

export function convertTime(time: string, timezone: TimezoneOption): string {
  if (timezone === 'Local') {
    return `${time} local`;
  }

  const [hours, minutes] = time.split(':').map(Number);
  const total = (hours + offsets[timezone] + 24) % 24;
  const label = total >= 12 ? 'PM' : 'AM';
  const twelve = total % 12 === 0 ? 12 : total % 12;
  return `${twelve}:${minutes.toString().padStart(2, '0')} ${label}`;
}
