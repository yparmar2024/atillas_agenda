# Next increments

Use these as backlog candidates; agree acceptance criteria and estimates during sprint planning.

## 1. Durable personal workspaces

- [ ] Pick a sign-in method, then integrate Supabase Auth and Postgres together.
- [ ] Create workspaces, workspace_members, tasks, profiles/reward balances, and focus_sessions tables through checked-in migrations.
- [ ] Tasks reference workspace_id; membership and row-level security restrict access. A new user gets a personal workspace.
- [ ] Put database operations in feature data modules; add loading/error/retry states.
- [ ] Verify task recovery after logout/login, browser data clearing, and use from a second device.
- [ ] Keep timer runtime in memory so reload resets it, independently of durable task storage.

## 2. Refine the working UI

- [x] Extract Workspace, FocusRoom, TaskCard, TaskDialog, Mascot, and useTimer into focused modules.
- [ ] Support editing tasks and choosing the destination column when adding a task.
- [ ] Add dialog focus trapping, Escape dismissal, and focus restoration.
- [ ] Check keyboard interaction, mobile layouts, touch task movement, contrast, and reduced motion in real browsers.
- [ ] Add targeted tests for reward deduplication and timer pause/resume/background behavior.
- [ ] Keep initial user data empty; show empty states until users create content.

## 3. Mascot and cosmetics

- [ ] Produce a consistent original duck sprite set inspired by the campus theme: idle, walking, studying with a book, celebrating.
- [ ] Define sprite alignment and accessory attachment points before producing hats/sunglasses.
- [ ] Build a small unlock/equip experience when cosmetics are implemented.
- [ ] Persist equipped accessories and purchases. Avoid duplicate point grants and double purchases using database transactions.
- [ ] Decide break rewards and final session reward amounts; keep the system forgiving, without a competitive leaderboard.

## 4. Later scope — frozen until the core is accepted

- [ ] Notes.
- [ ] Shared workspace invitations and roles.
- [ ] Concurrent editing and realtime updates.
- [ ] Multi-user mascot presence/interactions.

## Delivery and Agile evidence

- [ ] Deploy the static frontend to the agreed host and document the release process.
- [ ] Record actual Sprint 1 outcomes and replace report placeholders after review.
- [ ] Capture screenshots, acceptance results, review feedback, and retrospective actions each sprint.
