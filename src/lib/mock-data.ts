import type { League, Player, Team, ScheduleEntry, Ranks } from "./types";

// Single source of truth for the prototype. No backend yet — these fixtures
// mirror the eventual data model so the DB schema is a direct translation.

export const league: League = {
  id: "lg-1",
  name: "Rock Coast Darts League",
  location: "St. John's, NL",
  season: "2025–26",
  currentWeek: 7,
};

const r = (club: number, region: number, prov: number, nat: number, world: number): Ranks => ({
  club,
  region,
  provincial: prov,
  national: nat,
  world,
});

export const teams: Team[] = [
  { id: "t1", name: "Bullseye Bandits", initials: "BB", captainId: "p1", legWins: 71, legLosses: 39, gameWins: 11, gameLosses: 3, winPct: 79, streak: 4, ranks: r(1, 3, 9, 41, 612), threeDartAvg: 91.4, tonnes: 418, oneEighties: 27, finishes: 64 },
  { id: "t2", name: "Triple Trouble", initials: "TT", captainId: "p5", legWins: 64, legLosses: 46, gameWins: 9, gameLosses: 5, winPct: 64, streak: 2, ranks: r(2, 5, 12, 58, 740), threeDartAvg: 87.9, tonnes: 372, oneEighties: 19, finishes: 55 },
  { id: "t3", name: "Oche Outlaws", initials: "OO", captainId: "p9", legWins: 58, legLosses: 52, gameWins: 8, gameLosses: 6, winPct: 57, streak: -1, ranks: r(3, 7, 15, 70, 880), threeDartAvg: 84.2, tonnes: 341, oneEighties: 14, finishes: 49 },
  { id: "t4", name: "Ton Machine", initials: "TM", captainId: "p13", legWins: 52, legLosses: 58, gameWins: 6, gameLosses: 8, winPct: 43, streak: -2, ranks: r(4, 10, 19, 88, 1010), threeDartAvg: 81.7, tonnes: 308, oneEighties: 11, finishes: 42 },
  { id: "t5", name: "Double Tops", initials: "DT", captainId: "p17", legWins: 45, legLosses: 65, gameWins: 4, gameLosses: 10, winPct: 29, streak: -3, ranks: r(5, 13, 24, 104, 1190), threeDartAvg: 78.3, tonnes: 271, oneEighties: 7, finishes: 36 },
  { id: "t6", name: "The Arrows", initials: "AR", captainId: "p21", legWins: 40, legLosses: 70, gameWins: 4, gameLosses: 10, winPct: 29, streak: 1, ranks: r(6, 16, 28, 121, 1340), threeDartAvg: 75.6, tonnes: 244, oneEighties: 5, finishes: 31 },
];

export const players: Player[] = [
  // Bullseye Bandits
  { id: "p1", name: "Danny Whelan", initials: "DW", teamId: "t1", division: "A", oneDartAvg: 33.8, threeDartAvg: 101.3, tonnes: 142, oneEighties: 12, finishes: 21, checkoutPct: 48, ranks: r(1, 2, 6, 33, 410), powerDelta: 2 },
  { id: "p2", name: "Marie Squires", initials: "MS", teamId: "t1", division: "A", oneDartAvg: 31.2, threeDartAvg: 95.6, tonnes: 121, oneEighties: 7, finishes: 18, checkoutPct: 44, ranks: r(3, 6, 14, 61, 720), powerDelta: 4 },
  { id: "p3", name: "Kev Brophy", initials: "KB", teamId: "t1", division: "B", oneDartAvg: 29.4, threeDartAvg: 88.2, tonnes: 98, oneEighties: 4, finishes: 13, checkoutPct: 39, ranks: r(8, 14, 31, 140, 1620), powerDelta: -3 },
  { id: "p4", name: "Tom Pike", initials: "TP", teamId: "t1", division: "B", oneDartAvg: 28.1, threeDartAvg: 85.0, tonnes: 87, oneEighties: 3, finishes: 11, checkoutPct: 36, ranks: r(11, 19, 40, 188, 2010), powerDelta: 1 },

  // Triple Trouble
  { id: "p5", name: "Gerry Noseworthy", initials: "GN", teamId: "t2", division: "A", oneDartAvg: 32.0, threeDartAvg: 97.1, tonnes: 128, oneEighties: 9, finishes: 19, checkoutPct: 45, ranks: r(2, 4, 10, 48, 560), powerDelta: -1 },
  { id: "p6", name: "Lisa Hearn", initials: "LH", teamId: "t2", division: "B", oneDartAvg: 28.9, threeDartAvg: 86.7, tonnes: 92, oneEighties: 4, finishes: 12, checkoutPct: 38, ranks: r(9, 17, 35, 161, 1780), powerDelta: 5 },
  { id: "p7", name: "Paddy Foley", initials: "PF", teamId: "t2", division: "C", oneDartAvg: 26.3, threeDartAvg: 79.4, tonnes: 71, oneEighties: 2, finishes: 8, checkoutPct: 33, ranks: r(16, 28, 58, 270, 3010), powerDelta: -2 },
  { id: "p8", name: "Sara Quinlan", initials: "SQ", teamId: "t2", division: "C", oneDartAvg: 25.7, threeDartAvg: 77.0, tonnes: 64, oneEighties: 1, finishes: 7, checkoutPct: 31, ranks: r(19, 33, 67, 311, 3420), powerDelta: 7 },

  // Oche Outlaws
  { id: "p9", name: "Mike Dwyer", initials: "MD", teamId: "t3", division: "A", oneDartAvg: 30.6, threeDartAvg: 92.4, tonnes: 110, oneEighties: 6, finishes: 16, checkoutPct: 42, ranks: r(4, 8, 18, 80, 940), powerDelta: 0 },
  { id: "p10", name: "Erin Coady", initials: "EC", teamId: "t3", division: "B", oneDartAvg: 27.8, threeDartAvg: 83.5, tonnes: 84, oneEighties: 3, finishes: 11, checkoutPct: 37, ranks: r(12, 21, 44, 205, 2240), powerDelta: -4 },
  { id: "p11", name: "Joe Murphy", initials: "JM", teamId: "t3", division: "C", oneDartAvg: 25.1, threeDartAvg: 75.2, tonnes: 59, oneEighties: 1, finishes: 6, checkoutPct: 30, ranks: r(21, 37, 75, 350, 3810), powerDelta: 3 },
  { id: "p12", name: "Beth Walsh", initials: "BW", teamId: "t3", division: "D", oneDartAvg: 22.4, threeDartAvg: 67.1, tonnes: 41, oneEighties: 0, finishes: 4, checkoutPct: 25, ranks: r(28, 49, 99, 470, 5020), powerDelta: 6 },

  // Ton Machine
  { id: "p13", name: "Frank Power", initials: "FP", teamId: "t4", division: "B", oneDartAvg: 28.5, threeDartAvg: 85.6, tonnes: 88, oneEighties: 4, finishes: 12, checkoutPct: 38, ranks: r(10, 18, 38, 175, 1920), powerDelta: -1 },
  { id: "p14", name: "Nora Kelly", initials: "NK", teamId: "t4", division: "C", oneDartAvg: 26.0, threeDartAvg: 78.0, tonnes: 68, oneEighties: 2, finishes: 8, checkoutPct: 32, ranks: r(17, 30, 61, 285, 3140), powerDelta: 2 },
  { id: "p15", name: "Sean Byrne", initials: "SB", teamId: "t4", division: "C", oneDartAvg: 25.4, threeDartAvg: 76.1, tonnes: 62, oneEighties: 1, finishes: 7, checkoutPct: 31, ranks: r(20, 35, 71, 330, 3600), powerDelta: -5 },
  { id: "p16", name: "Amy Doyle", initials: "AD", teamId: "t4", division: "D", oneDartAvg: 21.8, threeDartAvg: 65.3, tonnes: 38, oneEighties: 0, finishes: 3, checkoutPct: 24, ranks: r(30, 53, 107, 510, 5400), powerDelta: 1 },

  // Double Tops
  { id: "p17", name: "Liam Hayes", initials: "LH", teamId: "t5", division: "B", oneDartAvg: 27.6, threeDartAvg: 82.9, tonnes: 81, oneEighties: 3, finishes: 10, checkoutPct: 36, ranks: r(13, 23, 47, 218, 2380), powerDelta: -2 },
  { id: "p18", name: "Kate Ryan", initials: "KR", teamId: "t5", division: "C", oneDartAvg: 25.9, threeDartAvg: 77.6, tonnes: 66, oneEighties: 2, finishes: 8, checkoutPct: 32, ranks: r(18, 32, 65, 302, 3320), powerDelta: 4 },
  { id: "p19", name: "Dec Barry", initials: "DB", teamId: "t5", division: "D", oneDartAvg: 23.0, threeDartAvg: 69.0, tonnes: 45, oneEighties: 0, finishes: 5, checkoutPct: 27, ranks: r(26, 46, 93, 440, 4720), powerDelta: -3 },
  { id: "p20", name: "Mia Fenn", initials: "MF", teamId: "t5", division: "D", oneDartAvg: 21.2, threeDartAvg: 63.5, tonnes: 34, oneEighties: 0, finishes: 3, checkoutPct: 23, ranks: r(31, 55, 112, 540, 5710), powerDelta: -7 },

  // The Arrows
  { id: "p21", name: "Rob Sexton", initials: "RS", teamId: "t6", division: "B", oneDartAvg: 27.1, threeDartAvg: 81.4, tonnes: 78, oneEighties: 3, finishes: 10, checkoutPct: 35, ranks: r(14, 25, 51, 238, 2590), powerDelta: 3 },
  { id: "p22", name: "Holly Greene", initials: "HG", teamId: "t6", division: "C", oneDartAvg: 25.2, threeDartAvg: 75.7, tonnes: 60, oneEighties: 1, finishes: 6, checkoutPct: 30, ranks: r(22, 39, 79, 368, 3990), powerDelta: -1 },
  { id: "p23", name: "Cian Lynch", initials: "CL", teamId: "t6", division: "D", oneDartAvg: 22.7, threeDartAvg: 68.1, tonnes: 43, oneEighties: 0, finishes: 4, checkoutPct: 26, ranks: r(27, 48, 97, 460, 4910), powerDelta: 8 },
  { id: "p24", name: "Tess Malone", initials: "TM", teamId: "t6", division: "D", oneDartAvg: 20.6, threeDartAvg: 61.8, tonnes: 30, oneEighties: 0, finishes: 2, checkoutPct: 22, ranks: r(33, 58, 118, 570, 6020), powerDelta: -2 },
];

export const schedule: ScheduleEntry[] = [
  { id: "g1", week: 6, date: "Mar 4", homeTeamId: "t1", awayTeamId: "t4", gameCode: "RC-W6-BBTM", status: "final", homeScore: 6, awayScore: 3 },
  { id: "g2", week: 6, date: "Mar 4", homeTeamId: "t2", awayTeamId: "t5", gameCode: "RC-W6-TTDT", status: "final", homeScore: 6, awayScore: 2 },
  { id: "g3", week: 6, date: "Mar 4", homeTeamId: "t3", awayTeamId: "t6", gameCode: "RC-W6-OOAR", status: "final", homeScore: 5, awayScore: 4 },
  { id: "g4", week: 7, date: "Mar 11", homeTeamId: "t1", awayTeamId: "t2", gameCode: "RC-W7-BBTT", status: "scheduled" },
  { id: "g5", week: 7, date: "Mar 11", homeTeamId: "t3", awayTeamId: "t4", gameCode: "RC-W7-OOTM", status: "scheduled" },
  { id: "g6", week: 7, date: "Mar 11", homeTeamId: "t5", awayTeamId: "t6", gameCode: "RC-W7-DTAR", status: "scheduled" },
  { id: "g7", week: 8, date: "Mar 18", homeTeamId: "t1", awayTeamId: "t3", gameCode: "RC-W8-BBOO", status: "scheduled" },
  { id: "g8", week: 8, date: "Mar 18", homeTeamId: "t2", awayTeamId: "t4", gameCode: "RC-W8-TTTM", status: "scheduled" },
  { id: "g9", week: 8, date: "Mar 18", homeTeamId: "t5", awayTeamId: "t6", gameCode: "RC-W8-DTAR", status: "scheduled" },
];

// --- selectors ---

export type View = "demo" | "empty";

export interface LeagueData {
  league: League;
  teams: Team[];
  players: Player[];
  schedule: ScheduleEntry[];
}

// A freshly-created league still has a name/location — only its rosters and
// schedule are empty. That empty state is the real first-run experience.
export function getData(view: View): LeagueData {
  if (view === "empty") {
    return { league, teams: [], players: [], schedule: [] };
  }
  return { league, teams, players, schedule };
}

export function parseView(value: string | string[] | undefined): View {
  return value === "empty" ? "empty" : "demo";
}

export function standings(list: Team[]): Team[] {
  return [...list].sort(
    (a, b) => b.gameWins - a.gameWins || b.winPct - a.winPct || b.legWins - a.legWins,
  );
}

export function teamById(list: Team[], id: string): Team | undefined {
  return list.find((t) => t.id === id);
}

export function playerById(list: Player[], id: string): Player | undefined {
  return list.find((p) => p.id === id);
}

export function rosterFor(list: Player[], teamId: string): Player[] {
  return list.filter((p) => p.teamId === teamId);
}

export function topByThreeDart(list: Player[], n: number): Player[] {
  return [...list].sort((a, b) => b.threeDartAvg - a.threeDartAvg).slice(0, n);
}

export function topMovers(list: Player[], n: number): Player[] {
  return [...list].sort((a, b) => b.powerDelta - a.powerDelta).slice(0, n);
}
