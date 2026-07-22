# Security Model

<!-- purpose
How the system establishes and enforces security. This should answer:

- **Authentication:** How does the system verify that a caller is who they claim to be? What credentials or tokens are issued, how are they validated on each request, and what happens when they are missing or invalid?
- **Authorization:** How does the system decide what an authenticated caller is allowed to do or access? How are permissions checked, and how is unauthorized access prevented?
- **Trust boundaries:** What is trusted, what is untrusted, and what must be verified when crossing a boundary?
- **Data protection:** How is sensitive data protected at rest and in transit?

Links to more detailed pages in this directory where necessary.

Does not record implementation specifics like algorithm parameters, key sizes, or token expiry values.

If it describes a regulatory compliance requirement rather than a security mechanism, consult [compliance/](../business/compliance/overview.md) to see if it better fits there. If it describes monitoring or alerting for security events, consult [observability/](../observability/overview.md).
-->

## Authentication

**Status: Not Implemented**

The API endpoints do not require or validate any credentials. There is no authentication mechanism; any caller with knowledge of a list ID can access the API.

## Authorization

**Status: Not Implemented**

There are no authorization checks in the API handlers. Access to a todo list is determined solely by knowledge of its ID. No permissions, roles, or access control lists are enforced. Anyone who obtains a list ID can read and modify that list without restriction.

## Trust Boundaries

**Untrusted boundary:** The internet and unauthenticated callers. Any network request to the API should be considered untrusted.

**Assumed trust:** AWS Lambda execution role and DynamoDB permissions (configured via infrastructure as code).

**Key risk:** List IDs are not cryptographically strong or unpredictable. Generated from a short random string, they provide limited entropy against brute-force guessing, so a determined attacker could iterate through the ID space to discover and access other lists.

## Data Protection in Transit

TLS/HTTPS is enforced for all requests to the API and web app through CloudFront and API Gateway, protecting data in transit.

## Data Protection at Rest

Todo list data at rest in DynamoDB is not explicitly encrypted at the application level. AWS DynamoDB encryption at rest is handled by AWS managed keys (default).

## Input Validation

**Status: Incomplete**

- **JSON parsing:** The PUT handler (`putTodoList.ts`) calls `JSON.parse(event.body)` without error handling. Malformed JSON will cause an unhandled exception.
- **Schema validation:** No JSON schema validation is performed on the request body. The todo list structure is not validated for expected fields or data types.
- **ID validation:** No validation of the list ID format, length, or uniqueness. Any string is accepted as an ID.
- **Item text validation:** No validation on todo item text (length limits, character restrictions, etc.).
- **Request size:** No explicit request size limits are configured in the handlers or visible at the API Gateway level.

## Rate Limiting

**Status: Not Implemented**

No rate limiting is visible in the API handlers. It is unclear whether rate limiting is configured at the API Gateway level.

## CORS (Cross-Origin Resource Sharing)

**Status: Not Documented**

No explicit CORS configuration is visible in the API handler code or documentation. The actual CORS behavior depends on API Gateway default settings or undocumented configuration.
