# Attila’s Agenda

Attila’s Agenda is a student productivity app inspired by Stevens’ duck mascot, Attila. It brings task planning and focused study time into a welcoming workspace, with an animated duck companion to keep students company.

## The experience

- **Workspace:** Create tasks from the top-right New task button, choosing Personal, School, Work, or Other and a destination column (To do by default). Task names are required; notes are optional. Edit tasks with the pencil, drag them between columns, and confirm before deleting. Attila reads alongside you.
- **Focus room:** Build a session by adding 5, 10, or 15 minutes at a time, or type a custom amount from 1–180 minutes. Repeated presses stack time, including while the timer runs. Pause and resume as needed; reset clears the session. The timer continues when switching between views; refreshing or closing the page resets it.
- **Points:** Earn 10 points when a task first reaches Done (including tasks created there), and 1 point per minute when a full timer session finishes. Moving a task out of Done and back does not earn more points. Paused time does not count toward a session; resetting abandons it without a timer reward. Future rewards will let students personalize Attila with accessories such as hats and sunglasses.
- **Attila:** A Stevens-inspired duck with a red jersey, alternating steps, wing movement, blinks, and reading motions. Celebrations include a hop and wing flaps, with a book-lowering transition from studying. Animations respect reduced-motion preferences.

The goal is a polished, accessible experience that makes it easy to start working without overwhelming students with features. New workspaces start empty, with no fabricated tasks or activity.

## Current scope

The starting version includes a personal task board with editable notes, categories, and deletion confirmation; a stackable focus timer with custom minutes; points; and an animated duck companion. Progress currently lasts only for the open visit and resets when the page is refreshed or closed.

Saved progress and sign-in are planned for a later stage. Mascot accessories, shared boards, and interactions between students’ mascots are also future features.

## Local development

Requires Node.js and npm.

```sh
npm ci
npm run dev
```

Use `npm run build` to type-check and build for production, and `npm run preview` to preview the build. Run `npm run format` after editing and `npm run format:check` to check formatting.

## About the project

Attila’s Agenda is a team project for SSW555 at Stevens Institute of Technology. Practicing Agile and Scrum is the central goal: building in small increments, reviewing working features, collecting feedback, and improving how the team works together.
