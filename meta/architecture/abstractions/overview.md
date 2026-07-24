# Abstractions

<!-- purpose
The shared abstractions and interfaces that are reused across the codebase. This is not a description of every interface — only ones used across multiple features (e.g., a "service provider" pattern, a common event type, a shared middleware interface).

For each abstraction, document its purpose, its contract, and representative examples of how it is used.

This is an overview — keep each entry brief and link to individual files in this directory for more detail.

If it describes a recurring pattern rather than a shared interface, consult [conventions/](../conventions/overview.md) to see if it better fits there.
-->

## API Client (SDK)

The `DefaultApi` class, exported from the `sdk` package, provides a type-safe interface for all API operations. The web app instantiates this client once and reuses it throughout the component tree:

```typescript
const api = new DefaultApi();
```

The client exposes methods like `todosIdGet()` and `todosIdPut()` that return Promises. The web app wraps these in async/await blocks within `useEffect` hooks and promise `.catch()` blocks for error handling.
