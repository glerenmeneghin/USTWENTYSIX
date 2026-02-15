export type TeamColors = {
  primary: string;
  secondary: string;
  text: string;
  accent?: string;
};

export type Team = {
  id: string;
  name: string;
  code: string;
  group: string;
  flag?: string;
  placeholder?: boolean;
  possibleTeams?: string[];
  colors: TeamColors;
};

export type Venue = {
  id: string;
  name: string;
  officialName: string;
  city: string;
  country: string;
  timezone: string;
};

export type Match = {
  matchNumber: number;
  date: string;
  time: string;
  tz: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  stage: string;
  group: string | null;
  description?: string;
};
