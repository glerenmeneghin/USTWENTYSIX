export type Team = {
  id: string;
  name: string;
  code: string;
  group: string;
  flag: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    accent: string;
  };
};

export type Match = {
  matchNumber: number;
  date: string;
  time: string;
  timezone: 'ET';
  homeTeam: string;
  awayTeam: string;
  venue: string;
  city: string;
  stage: string;
  group: string | null;
};

export type TimezoneOption = 'ET' | 'CT' | 'MT' | 'PT' | 'Mexico City' | 'Local';
