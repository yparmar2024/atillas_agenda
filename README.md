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

## Core tests and continuous integration

Use Node.js 22.12 or newer (CI uses Node.js 22) and run `npm test` for the core functional tests. Tests run in Node, without a browser or deployed app. They cover task creation and validation, editing, movement, deletion, one-time task rewards, and session reward calculations. They exercise the task operations used by the app; dialog interactions and the live timer lifecycle are outside this initial coverage.

The GitHub Actions workflow in `.github/workflows/ci.yml` runs on pull requests, pushes, and manual dispatch. Its **Quality checks** job installs locked dependencies, checks formatting, runs core tests, and builds the production bundle, in that order. A failure stops the remaining steps and fails the job. No deployment is configured.

### Require CI before production changes

The workflow alone does not block merges or direct pushes. After it is on the production branch (normally `main`) and has run, configure GitHub repository **Settings → Branches → Add classic branch protection rule**:

1. Target `main` (or the branch used for production).
2. Enable **Require a pull request before merging**. Review approvals are optional for this CI gate.
3. Enable **Require status checks to pass before merging**, select **Quality checks** from GitHub Actions, and enable **Require branches to be up to date before merging**.
4. Enable **Do not allow bypassing the above settings**, including administrators. Keep force pushes and branch deletion disabled.

This prevents changes from entering the protected production branch without passing CI. Branch protection availability depends on the repository's visibility and GitHub plan. Repository administration permission is required; these settings can also be applied through `gh api` after authenticating with `gh auth login`. Check for existing rules before changing them.

When deployment is added, deploy only the protected production branch after successful CI. Manual deployment paths and external hosting integrations need their own enforcement; this workflow does not restrict those paths.

## About the project

Attila’s Agenda is a team project for SSW555 at Stevens Institute of Technology. Practicing Agile and Scrum is the central goal: building in small increments, reviewing working features, collecting feedback, and improving how the team works together.
