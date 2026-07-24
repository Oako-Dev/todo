# Dependencies

<!-- purpose
The external systems this product relies on — databases, queues, third-party APIs, cloud services — and how it relies on them. Notes what specific parts of each dependency are used; the product may use an external service without using every feature it offers.

This is an overview — keep each dependency brief and link to individual files in this directory for more detail. Include representative interaction patterns and links to official documentation.

This document does not record version numbers, specific endpoint URLs, API keys, or credentials.

If it describes a technology rather than a specific external system, consult [tech/](../tech/overview.md) to see if it better fits there.
-->

## Amazon Web Services (AWS)

The system runs entirely on AWS infrastructure. The dev and prod deployment stages run in separate AWS accounts in the us-west-2 region.

### Services Used

-   **DynamoDB**: Stores todo list data with ID-based primary key indexing
-   **API Gateway V2**: Routes HTTP requests to backend Lambda handlers for todo list operations (PUT and GET)
-   **Lambda**: Runs the API handlers as serverless functions
-   **S3 + CloudFront**: Hosts and caches the static React web app frontend
-   **Route 53**: Manages DNS with hosted zones for environment-specific domains (primary apex domain for prod, `{stage}.{apex}` for dev)
-   **IAM**: Provides authentication and authorization for AWS resource access during deployment and runtime

### Infrastructure as Code

All AWS infrastructure is provisioned and managed by SST (Serverless Stack) through the configuration in `sst.config.ts` and components in `packages/infrastructure/`. Infrastructure deployment validates the AWS account ID matches the target stage (dev or prod) to prevent accidental deployments to the wrong account.
