# Glossary

<!-- purpose
The vocabulary of the domain and the system.

This covers two kinds of terms: domain terms (words from the business or problem space that have precise meanings, e.g., the difference between an "Order" and a "Transaction") and internal terms (jargon the team has coined, e.g., "hydration," "fanout," "reconciliation").

Without this, engineers and LLMs will misread intent when terms have non-obvious or system-specific meanings, or assume standard industry definitions that don't apply here.

Only include a term if a reader would be meaningfully wrong without it — because the word is used in a non-standard way, because two similar terms are easily confused, or because the concept is domain-specific jargon with a precise meaning.

If it defines what a core entity means in terms of its relationships or storage, consult [architecture/data-model/](architecture/data-model/overview.md) to see if it better fits there.
-->

## Terms

**Design Tokens**
CSS custom properties (variables) that define the visual language of the application: colors, spacing, typography, shadows, and radii. Tokens are semantic (e.g., `--color-accent`) rather than literal (e.g., `--color-blue-600`), allowing consistent theming and future redesigns. Defined in `packages/web-app/src/styles/tokens.css` and used throughout components via Tailwind utility classes and direct variable references.

**Todo List**
A named collection of tasks. In this system, each todo list is identified by a unique 16-character string (the list ID) and contains an ordered array of todo list items. Lists are ephemeral — they have no user authentication or ownership; anyone with the ID can view and modify a list. See [data-model](architecture/data-model/overview.md) for entity details.

**Todo List Item**
A single task within a todo list. Each item has text content describing the task and a boolean flag indicating completion status. Items have no separate identity — they are identified only by their position within the list. Updating any item requires updating the entire list.
