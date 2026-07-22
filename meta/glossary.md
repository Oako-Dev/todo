# Glossary

<!-- purpose
The vocabulary of the domain and the system.

This covers two kinds of terms: domain terms (words from the business or problem space that have precise meanings, e.g., the difference between an "Order" and a "Transaction") and internal terms (jargon the team has coined, e.g., "hydration," "fanout," "reconciliation").

Without this, engineers and LLMs will misread intent when terms have non-obvious or system-specific meanings, or assume standard industry definitions that don't apply here.

Only include a term if a reader would be meaningfully wrong without it — because the word is used in a non-standard way, because two similar terms are easily confused, or because the concept is domain-specific jargon with a precise meaning.

If it defines what a core entity means in terms of its relationships or storage, consult [architecture/data-model/](architecture/data-model/overview.md) to see if it better fits there.
-->

## TodoList

A container holding a collection of TodoListItems. Identified by a unique 16-character alphanumeric ID. See [data-model](architecture/data-model/overview.md) for complete entity definition.

## TodoListItem

A single task within a TodoList, containing a text description and a completion status. Not to be confused with the TodoList container itself. See [data-model](architecture/data-model/overview.md) for the full entity definitions.

## List ID

The unique 16-character alphanumeric identifier assigned to each TodoList. Used to construct the shareable URL for accessing a specific list.
