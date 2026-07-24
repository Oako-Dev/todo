# Conventions

<!-- purpose
How things are done in this particular codebase. Error handling, background jobs, logging, testing, retries, configuration, and other recurring patterns.

Both low-level conventions (how a function is structured) and high-level ones (how a feature is scaffolded) belong here. Every convention should include at least one concrete example from the codebase.

This is an overview — keep each convention brief and link to individual files in this directory for more detail.

If it is a shared interface or abstraction reused across the codebase, consult [abstractions/](../abstractions/overview.md) to see if it better fits there. If the reasoning behind a convention warrants recording, consider also capturing it in [adrs/](../adrs/overview.md).
-->

## Frontend State Management with React Hooks

The web app manages component state using React's `useState` and `useEffect` hooks. Asynchronous operations (loading data, saving changes) track three state slices: `loading`/`saving` boolean, `error` string or null, and the data itself. This allows clear indication of pending operations and error states in the UI.

Example from `packages/web-app/src/App.tsx`: The todo list component tracks `loading`, `loadError`, `saving`, and `saveError` states separately, so errors and loading states can be displayed independently and recovered from.

## Styling: Tailwind Utilities + CSS Tokens

Components use TailwindCSS utility classes directly in JSX, with custom Tailwind colors defined by CSS custom properties (variables) from `styles/tokens.css`. Colors, spacing, typography, and shadows are expressed as semantic tokens (e.g., `text-ink`, `bg-accent`, `gap-8`), allowing consistent theming without inline styles or CSS modules.

Example from `packages/web-app/src/App.tsx`: Input field styling uses token-based classes like `text-ink bg-surface border-border-strong` combined with Tailwind utilities like `px-[var(--control-pad-x)] py-[var(--control-pad-y)]`.

## API Error Handling

The web app catches API errors in promise `.catch()` blocks and checks the response status to determine the error type. User-facing error messages are stored in component state and displayed conditionally in the UI. Failed mutations restore the previous state to provide rollback behavior.

Example from `packages/web-app/src/App.tsx`: When `todosIdGet()` fails with a 404, the component shows "Could not find this TODO list." For other errors, a generic message is shown.
