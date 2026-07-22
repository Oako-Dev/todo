# Dependencies

<!-- purpose
The external systems this product relies on — databases, queues, third-party APIs, cloud services — and how it relies on them. Notes what specific parts of each dependency are used; the product may use an external service without using every feature it offers.

This is an overview — keep each dependency brief and link to individual files in this directory for more detail. Include representative interaction patterns and links to official documentation.

This document does not record version numbers, specific endpoint URLs, API keys, or credentials.

If it describes a technology rather than a specific external system, consult [tech/](../tech/overview.md) to see if it better fits there.
-->

## AWS Services

The entire system runs on AWS in the **us-west-2** region and depends on the following services:

### DynamoDB

Primary data store for all todo lists and items. A `Todos` table with `id` (string) as the primary key persists all application state. The application uses the DocumentClient API for put and get operations.

### API Gateway v2

Routes HTTP requests to Lambda handlers. Exposes two endpoints:
- `PUT /todos/{id}` — create or update a todo list
- `GET /todos/{id}` — retrieve a todo list by ID

Serves the API on a custom subdomain, with separate subdomains for prod and dev.

### Lambda

Runs serverless functions that handle API requests. Each endpoint (put, get) is implemented as a separate Lambda handler.

### S3 & CloudFront

Hosts the static web application (HTML, CSS, JavaScript built from the React app). CloudFront caches the static site and serves it on the primary domain.

### Route 53

Manages DNS records for both the API and web app custom domains.

## AWS Accounts

Separate AWS accounts are used for dev and prod environments to ensure isolation, with account validation enforced at deployment time. See [deployment/](../deployment/overview.md#aws-account-isolation) for details.
