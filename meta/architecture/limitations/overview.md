# Limitations

<!-- purpose
Explicit gaps, known scaling ceilings, and areas of technical debt. Places where the system doesn't fully conform to its own architecture, or where a quick fix was never properly generalized.

For example: "this component doesn't handle concurrent writes correctly above N users" or "this module was a quick fix and has never been properly generalized."

This is distinct from [constraints](../constraints/overview.md), which explains why code looks the way it does for valid historical reasons. Limitations documents where the code could genuinely be improved.

This is an overview — keep each entry brief and link to individual files in this directory for more detail.

If there is a plan to address the limitation, also note it in [roadmap/](../../roadmap/overview.md).
-->

## Missing Input Validation

The API handlers do not validate incoming requests:

- `putTodoList.ts` calls `JSON.parse(event.body)` without a try-catch block, so malformed JSON causes an unhandled error
- Neither handler validates the structure of todo list data (e.g., that items have `text` and `completed` fields)
- Neither handler validates the ID format or length
- There are no length limits on todo item text or collection size
- Invalid data can be stored without detection

This is a gap in both security and stability. A systematic input validation layer would prevent malformed data from being stored and improve error messages for clients.

## Minimal Error Handling

API handlers return sparse error responses (HTTP 400 or 404 with no body), making it difficult for clients to diagnose problems. Errors are logged at the AWS Lambda level but not exposed to clients in a structured format.

## No Audit Trail

The system does not log who modified a list, when, or what changed. All modifications are persisted without history or audit records. This is acceptable for ephemeral, collaborative task lists but prevents tracking of changes or recovering previous versions.
