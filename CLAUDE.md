# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

**Prototype stage.** A clickable, design-first prototype exists. It is **mock-data only** — there is no backend, database, auth, billing, or score-entry/photo pipeline yet. Those are deliberately deferred until the team validates the design direction. When adding features, the live data model (`src/lib/types.ts`) is the seed for the eventual DB schema.

## Stack & commands

- **Next.js 16 (App Router) + React 19 + TypeScript**, **Tailwind CSS v4** (CSS-first, no `tailwind.config.*`), npm. `src/` dir, import alias `@/*`.
- `npm run dev` — dev server at http://localhost:3000
- `npm run build` — production build + type check (run before declaring work done)
- `npm run lint` — ESLint
- No test framework yet.

## Architecture

- **Brand theming is the core UI mechanism.** The five candidate brands are wired as swappable palettes in `src/app/globals.css`: each is a set of CSS variables scoped by `[data-theme="..."]` on `<html>`, mapped to semantic Tailwind tokens via `@theme inline` (`bg-bg`, `bg-surface-1`, `text-ink`, `text-ink-2`, `text-ink-3`, `text-accent`, `text-accent-bright`, `text-gold`, `text-up`, `text-down`, `border-line`). **Components never hardcode hex — always use the token classes** so every brand recolors for free. `ThemeSwitcher` (client) sets `data-theme` + persists to `localStorage`; `Wordmark` watches the attribute and swaps the brand name live; a no-flash init script lives in `src/app/layout.tsx`.
- **Routes use two route groups:** `(marketing)` for the public landing (`/`) and `(app)` for the signed-in shell (`/dashboard`, `/players`, `/players/[id]`, `/teams`, `/teams/[id]`, `/schedule`, `/standings`). Each group has its own layout; `(app)` has the top nav + mobile `BottomTabBar`.
- **All app data flows from `src/lib/mock-data.ts`.** `getData(view)` returns either seeded demo data or an **empty league** (same league identity, empty rosters/schedule). Pages are async server components that read `searchParams.view` (`?view=empty`) and `parseView` it — this drives the demo/empty toggle (`ViewToggle`) used to show the real first-run onboarding. Selectors (`standings`, `rosterFor`, `topByThreeDart`, `topMovers`, etc.) live alongside the data.
- **Data model (`src/lib/types.ts`):** players and teams are separate entities; `Player.teamId` is the mutable link (null = free agent) — players are moveable assets, per the spec. Multi-level `Ranks` (club/region/provincial/national/world) and per-league scoping are baked in so the DB schema is a direct translation.
- **Design decisions are documented** in the plan at `~/.claude/plans/help-me-decide-on-keen-acorn.md` (typography = Inter + tabular figures, per-screen hierarchy, empty/loading states, mobile bottom-tab nav, stats-table mobile collapse, power-delta arrow+sign+color, dark-theme contrast rule). Honor these when extending the UI.

## What the product is

A **darts league stats-tracking website**. The intended flow and feature set are defined in `Darts.pdf` (the source of truth for requirements):

- **Onboarding** — A league organizer signs up with league name, location, and email. They receive a preset coded sheet linking to the league they create, and the signing-up email becomes the **admin account**. Leagues get a member/stat sheet and a schedule sheet with **game codes**.
- **Personal stats** — 1-dart avg, 3-dart avg, tonnes, 180s, finishes, division (A/B/C/D), and multi-level rank (club / region / provincial / national / world). "Power rankings" show weekly movement (e.g. +4 / -7) relative to the overall club.
- **Team stats** — leg wins, game wins, win %, club/region/prov/national/world ranking, win/lose streaks, plus the aggregate dart/tonne/180/finish stats.
- **Team management** — a team page (name, logo, captain, roster). **Players are moveable assets connected to teams** (add/drop) — model players and teams as separate entities with a mutable relationship, not players hardcoded onto a team.

When implementing features, treat the PDF as the spec and keep the multi-tenant (per-league) and multi-level-ranking structure central to the data model.

## Brand / design direction

`league_darts_5_brands_hexcodes.html` is a self-contained design exploration presenting five candidate brand identities (LeagueMaster Darts, DartsLeague HQ, Open Leg Darts, Bullpen League, Chalk Line Darts), each with full hex palettes, logo SVGs, color psychology, and a website preview. No final brand has been chosen — **all five are implemented as switchable themes** in the prototype (default `leaguemaster`), so the file's palettes are the source of truth for the `globals.css` theme blocks. The UI is dark-mode-first. Use this file as the reference for palette and visual tone; if a brand is later chosen, the others can be dropped from the theme map.

## Tooling

`AGENTS.md` documents that the developer uses **Pane** to manage repositories and create terminal-backed agent panes. If asked to drive Pane, start with `runpane doctor --json`, then `runpane agent-context --json` for full CLI context. On this Windows machine, Pane may run under Windows rather than WSL — see the WSL note in `AGENTS.md` for the PowerShell fallback.
