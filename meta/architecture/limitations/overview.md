# Limitations

<!-- purpose
Explicit gaps, known scaling ceilings, and areas of technical debt. Places where the system doesn't fully conform to its own architecture, or where a quick fix was never properly generalized.

For example: "this component doesn't handle concurrent writes correctly above N users" or "this module was a quick fix and has never been properly generalized."

This is distinct from [constraints](../constraints/overview.md), which explains why code looks the way it does for valid historical reasons. Limitations documents where the code could genuinely be improved.

This is an overview — keep each entry brief and link to individual files in this directory for more detail.

If there is a plan to address the limitation, also note it in [roadmap/](../../roadmap/overview.md).
-->

## Input Validation and Schema Enforcement

The API handlers accept arbitrary JSON for todo data without validating its structure or content, and malformed JSON input is not handled (see [security/](../../security/security-model.md#input-validation) for the full description of these gaps). This is technical debt that should be addressed with a schema validation layer (e.g., Zod, JSON Schema).

## Authentication and Authorization

The API has no authentication or authorization mechanism (see [security/](../../security/security-model.md#authentication) for details). This design assumes lists are meant to be publicly shareable by URL, but should be explicitly documented as a security boundary if privacy is ever required.

## List ID Entropy

List IDs are generated from 16 random lowercase alphanumeric characters, providing approximately 84 bits of entropy. While sufficient for casual sharing, this is not cryptographically strong against deliberate enumeration attacks; see [security/](../../security/security-model.md#trust-boundaries) for the security-risk framing.

## Error Handling in List Creation

The `createNewTodoList()` utility function in the web app does not catch or handle API errors. If the initial PUT call fails when creating a new list, the error propagates unhandled to the caller. The `Home.tsx` and `App.tsx` components call this function without wrapping it in try-catch, so creation failures are not displayed to the user. This is the missing creation-error handling noted in [security/](../../security/security-model.md#error-handling).

## Rate Limiting and CORS

No rate limiting is implemented, CORS configuration is not documented, and there are no explicit request size limits. See [Rate Limiting](../../security/security-model.md#rate-limiting) and [CORS](../../security/security-model.md#cors-cross-origin-resource-sharing) in the security model for details.
