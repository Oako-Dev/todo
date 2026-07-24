# Deployment

<!-- purpose
How code gets to production. Covers all environments code passes through (e.g., development, staging, production), the process for promoting code through each, and any gates or approval steps required before a promotion.

Notes any environment-specific configuration or meaningful behavioral differences across environments.

This is an overview — keep each topic brief and link to individual files in this directory for each deployment scenario. Each scenario file should contain the concrete, step-by-step instructions a developer would follow to actually perform that deployment. If a deployment scenario exists but no file for it exists yet, create one.

Does not record specific hostnames, IP addresses, infrastructure resource IDs, or environment-specific configuration values.

If it describes how to build the code prior to deployment, consult [dev/build](../dev/build.md) to see if it better fits there. If it describes how to monitor the system after deployment, consult [observability/](../observability/overview.md).
-->

## Deployment Stages

The system supports two deployment stages:

-   **dev**: Development environment for testing and iteration
-   **prod**: Production environment for end users

Both stages deploy to AWS (us-west-2 region) but to different AWS accounts, enforced by account ID validation in the SST configuration.

### Domain Structure

-   **prod**: Uses the primary apex domain directly
-   **dev**: Uses a subdomain-prefixed structure (e.g., `dev.example.com`)

This allows multiple instances of the dev environment to coexist alongside production.

## Infrastructure as Code

Deployment is managed by SST (Serverless Stack) 3.17.14, which automatically provisions and configures AWS resources. The infrastructure definition is in `packages/infrastructure/` and is controlled by `sst.config.ts` at the repository root.

The system consists of three major infrastructure components:

-   **Storage** (`packages/infrastructure/components/storage.ts`): DynamoDB table keyed by todo list ID
-   **API** (`packages/infrastructure/components/api.ts`): API Gateway V2 for backend endpoints
-   **Web App** (`packages/infrastructure/components/webApp.ts`): S3-backed static site for the frontend

## Deployment Command

Deployment uses the `sst deploy --stage {stage}` command, which validates the AWS account and builds all components before provisioning.
