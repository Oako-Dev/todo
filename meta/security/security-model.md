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

**Authentication:** The system has no user authentication layer for list ownership. However, individual todo lists can optionally require a password for access. When a list is password-protected, the password is verified using timing-safe comparison of scrypt-hashed values. The password is supplied via the `X-Todo-Password` header on each request to the protected list.

**Authorization:** Access control is based on knowledge of the list ID. Anyone who knows a 16-character list ID can read and modify that list via the API (`GET /todos/{id}` and `PUT /todos/{id}` endpoints), unless the list is password-protected. If a list is password-protected, requests without a valid password receive a 401 response. There are no user roles or access control lists.

**Design Rationale:** This is an intentional design choice to support shareable links as the primary access model. Todo lists are identified only by their ID and have no ownership metadata. A list is accessed by anyone with its ID — similar to an unlisted document shared via a direct link. Password protection is optional, allowing users to add a layer of access control without requiring account creation or user authentication. This model sacrifices full user-level access control for simplicity and immediate shareability.

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

**Password Storage:** List passwords are never stored in plaintext. When a password is set on a list, it is hashed using scrypt (with a random 16-byte salt) before storage in DynamoDB. Verification uses timing-safe comparison to prevent timing attacks. The password hash is never returned to clients; instead, responses include an `isProtected` boolean flag.

**Client-Side Password Storage:** When a user enters a password to unlock a list, the web app stores the plaintext password in browser session storage (per list) to avoid re-prompting within the same session. This storage is cleared if the wrong password is entered. Users should treat list passwords as low-security credentials suitable only for casual sharing restrictions.

**No Sensitive Data:** The system is designed for ephemeral, user-created task lists. There is no sensitive personal data (PII), payment information, or authentication credentials stored in the database. List passwords are user-chosen and not tied to any identity system.
