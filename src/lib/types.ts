// Data model derived from Darts.pdf. Per-league (multi-tenant), multi-level
// ranking, and players modeled as moveable assets linked to teams (not
// hardcoded onto a team). This shape is meant to translate directly to a DB
// schema later.

export type Division = "A" | "B" | "C" | "D";

export type RankLevel = "club" | "region" | "provincial" | "national" | "world";
export type Ranks = Record<RankLevel, number>;

export const RANK_LEVELS: { key: RankLevel; label: string }[] = [
  { key: "club", label: "Club" },
  { key: "region", label: "Region" },
  { key: "provincial", label: "Prov" },
  { key: "national", label: "Nat'l" },
  { key: "world", label: "World" },
];

export interface Player {
  id: string;
  name: string;
  initials: string;
  teamId: string | null; // null = free agent (moveable asset)
  division: Division;
  oneDartAvg: number;
  threeDartAvg: number; // the headline number players quote
  tonnes: number; // scores of 100+
  oneEighties: number;
  finishes: number;
  checkoutPct: number;
  ranks: Ranks;
  powerDelta: number; // weekly movement relative to club: +4 / -7
}

export interface Team {
  id: string;
  name: string;
  initials: string;
  captainId: string;
  legWins: number;
  legLosses: number;
  gameWins: number;
  gameLosses: number;
  winPct: number;
  streak: number; // positive = win streak, negative = lose streak
  ranks: Ranks;
  threeDartAvg: number;
  tonnes: number;
  oneEighties: number;
  finishes: number;
}

export interface ScheduleEntry {
  id: string;
  week: number;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  gameCode: string;
  status: "scheduled" | "final";
  homeScore?: number;
  awayScore?: number;
}

export interface League {
  id: string;
  name: string;
  location: string;
  season: string;
  currentWeek: number;
}
