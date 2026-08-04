# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install       # install dependencies
bun run dev        # start dev server at http://localhost:3000
bun run build       # production build
bun run start       # run production build
bun run typecheck     # tsc --noEmit
```

There is no lint script and no test suite in this repo.

## Architecture

Minimal Next.js (App Router) kanban issue tracker. Issues are stored **in memory only** and reset on every server restart — there is no database.

- `lib/store.ts` — the single source of truth for issue data. `IssueStore` is a class wrapping a `Map<string, Issue>`, seeded with 3 sample issues on construction. A module-level singleton (`store`) is stashed on `globalThis` specifically to survive Next.js dev-mode hot-reloads (without this, HMR would re-instantiate the store and wipe state). All mutation logic (create/update/delete/reorder, and per-column `order` assignment via `nextOrder`) lives here — API routes are thin wrappers around it.
- `lib/types.ts` — the `Issue`/`Status` types and the `STATUSES` array, which is the ordered list of the four kanban columns (`backlog`, `todo`, `in_progress`, `done`). This array drives column rendering order on the frontend, so reordering/adding statuses here changes the UI directly.
- `app/api/` — REST routes that call into `store`, documented in README.md:
  - `GET/POST /api/issues`
  - `GET/PATCH/DELETE /api/issues/[id]`
  - `PUT /api/columns/[status]/reorder` — takes `{ orderedIds: string[] }` and bulk-reassigns `status`/`order` for a column (used at the end of a drag).
- `components/Board.tsx` — client component owning all issue state (`useState<Issue[]>`) and the `@dnd-kit` `DndContext`. Fetches issues once on mount, then does **optimistic local updates**: `handleDragOver` moves a card between columns in local state as it crosses a column boundary (recomputing `order` client-side), and `handleDragEnd` reorders within the destination column via `arrayMove` before persisting the final order to the server with the reorder endpoint. `components/Column.tsx` (droppable + `SortableContext` per status) and `components/IssueCard.tsx` (sortable card, with a status `<select>` that stops pointer propagation so it doesn't trigger a drag) are presentational children driven by props from `Board`.

### Data flow for a drag operation

1. `handleDragOver` — cross-column moves are reflected immediately in local `issues` state (no network call), so the card visually jumps columns while dragging.
2. `handleDragEnd` — computes the final ordered ID list for the destination column, updates local state, then persists via `PUT /api/columns/[status]/reorder`, which is the only call that writes `order` for a whole column at once.
3. Status changes via the card's `<select>` go through `PATCH /api/issues/[id]` instead, which (per `store.update`) auto-assigns a new trailing `order` in the target column when `status` changes without an explicit `order`.
