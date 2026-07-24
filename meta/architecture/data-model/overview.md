# Data Model

<!-- purpose
The core entities the system operates on, their attributes, and their relationships. This is slightly higher level than the database schema — it explains what things _mean_, not just how they're stored.

For example: what is a "User" vs. an "Account" vs. a "Session," and why are those three different things?

This is an overview — keep each entity's description brief and link to more detailed pages in this directory for individual entities or subsystems.

If it is a term definition rather than an entity with attributes and relationships, consult [glossary](../../glossary.md) to see if it better fits there. If it describes how entities move through the system, consult [data-flow/](../data-flow/overview.md).
-->

## Todo List

A todo list is a collection of tasks identified by a unique ID. Each list is independent and can be retrieved or updated via the API.

**Attributes:**
- `id` (string, required): Unique identifier for the todo list
- `list` (array of TodoListItem, required): The items in the todo list

**Storage:**
Todo lists are stored in DynamoDB in the "Todos" table, keyed by ID for efficient lookup and update of individual lists.

## Todo List Item

A single task within a todo list. Items track completion status and task text.

**Attributes:**
- `text` (string, required): The text content describing the task
- `completed` (boolean, required): Whether the task has been completed
