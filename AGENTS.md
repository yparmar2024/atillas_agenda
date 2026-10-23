# Project guidance

- Read @README.md for the project overview, intended experience, and current scope before making changes.
- Review the `skills/` folder for relevant skills and follow the guidance that applies to your task.
- Always read and follow @skills/frontend-design.md when creating or modifying frontend code for design best practices.
- Keep the project minimal and build features incrementally. Do not add mocked user data or present unfinished features as working functionality.
- Keep source files readable and consistently formatted. Run `npm run format` after editing and `npm run format:check` to verify formatting.

## Code organization

- `src/main.tsx` mounts React; `src/App.tsx` coordinates shared state and views.
- Keep page layouts in `src/pages/`, shared UI in `src/components/`, and task UI and types in `src/features/tasks/`.
- Keep timer behavior in `src/hooks/useTimer.ts` so it continues across view changes.
- Styles live in `src/styles/`, grouped by responsibility. Keep mascot artwork and animation rules in `src/components/Mascot.tsx` and `src/styles/mascot.css`, separate from page layout and task styles.
- Keep responsive rules with their owning styles and reduced-motion overrides in `src/styles/accessibility.css`.
