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

## Authentication and Authorization

**Authentication:** The system has no user authentication layer. Callers are not verified against any identity system, and no credentials are issued or validated.

**Authorization:** Access control is based on knowledge of the list ID. Anyone who knows a 16-character list ID can read and modify that list via the API (`GET /todos/{id}` and `PUT /todos/{id}` endpoints). There are no permission checks, user roles, or access control lists.

**Design Rationale:** This is an intentional design choice to support shareable links as the primary access model. Todo lists are identified only by their ID and have no ownership metadata. A list is accessed by anyone with its ID — similar to an unlisted document shared via a direct link. This model sacrifices user-level access control for simplicity and immediate shareability.

**Implications:**

-   Lists are not private by default; anyone with the ID can view and edit
-   There is no way to revoke access to a specific list
-   Lists cannot be deleted (they persist indefinitely if the ID is known)
-   There is no audit trail of who modified a list

## Trust Boundaries

The system operates with minimal trust boundaries:

-   **Trusted:** The AWS environment and infrastructure (credentials are validated by AWS IAM)
-   **Untrusted:** All API requests from clients; requests may come from any origin and may contain malicious data

There is no CORS (Cross-Origin Resource Sharing) configuration explicitly defined, so browser enforcement of cross-origin policies depends on API Gateway defaults. Clients not subject to browser CORS (e.g., curl, mobile apps, server-side requests) can access the API freely if they have a valid ID.

## Input Validation and Error Handling

Because all API requests cross a trust boundary from untrusted clients, input validation is a security concern. The handlers currently perform minimal validation and return sparse error responses, which is a known gap in both security and stability. See [architecture/limitations/](../architecture/limitations/overview.md) for the detailed list of validation and error-handling gaps.

## Client-Side ID Generation

**Current State:** When creating a new todo list, the client generates a random 16-character ID.

**Uniqueness:** DynamoDB enforces uniqueness on the primary key (`id`), so if two clients generated the same ID and both attempted to create lists, the second PUT would overwrite the first without error or warning. The statistical probability of collision is negligible; it would require two concurrent requests to generate identical IDs, which is not practically preventable at the client level given the size of the ID space.

**Concern:** There is no explicit uniqueness check for the theoretically possible collision — the app assumes creation succeeds without verifying the ID is new.

## Data Protection

**In Transit:** Data is transmitted over HTTPS (enforced by API Gateway and AWS infrastructure). No additional encryption or signing is applied at the application layer.

**At Rest:** Data stored in DynamoDB is encrypted by default using AWS-managed encryption keys. No additional application-layer encryption is applied.

**No Sensitive Data:** The system is designed for ephemeral, user-created task lists with no authentication. There is no sensitive personal data (PII), payment information, or authentication credentials stored in the database.
