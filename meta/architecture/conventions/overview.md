# Conventions

<!-- purpose
How things are done in this particular codebase. Error handling, background jobs, logging, testing, retries, configuration, and other recurring patterns.

Both low-level conventions (how a function is structured) and high-level ones (how a feature is scaffolded) belong here. Every convention should include at least one concrete example from the codebase.

This is an overview — keep each convention brief and link to individual files in this directory for more detail.

If it is a shared interface or abstraction reused across the codebase, consult [abstractions/](../abstractions/overview.md) to see if it better fits there. If the reasoning behind a convention warrants recording, consider also capturing it in [adrs/](../adrs/overview.md).
-->

## Lambda API Handlers

API endpoints are implemented as AWS Lambda functions that conform to the `APIGatewayProxyHandlerV2` interface. Each handler:
- Extracts path parameters and request body from the Lambda event
- Returns an HTTP response object with `statusCode`, `headers` (optional), and `body` (optional)
- Returns status code 400 if required parameters are missing
- Returns status code 404 if the requested resource is not found
- Returns status code 200 with JSON-serialized response on success

Example: `packages/api/src/getTodoList.ts`

## Optimistic Updates in the Web App

The web app uses an optimistic update pattern for todo list changes:
- When a user modifies the list (add, remove, or toggle an item), the UI updates immediately with the new state
- Simultaneously, an async API call persists the change to the server
- If the API call fails (network error, server error), the UI reverts to the previous state and displays an error message
- While an update is in progress, certain controls are disabled to prevent conflicting updates

Example: `packages/web-app/src/App.tsx` - the `persist()` function implements this pattern
