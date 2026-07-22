# Deployment

<!-- purpose
How code gets to production. Covers all environments code passes through (e.g., development, staging, production), the process for promoting code through each, and any gates or approval steps required before a promotion.

Notes any environment-specific configuration or meaningful behavioral differences across environments.

This is an overview — keep each topic brief and link to individual files in this directory for each deployment scenario. Each scenario file should contain the concrete, step-by-step instructions a developer would follow to actually perform that deployment. If a deployment scenario exists but no file for it exists yet, create one.

Does not record specific hostnames, IP addresses, infrastructure resource IDs, or environment-specific configuration values.

If it describes how to build the code prior to deployment, consult [dev/build](../dev/build.md) to see if it better fits there. If it describes how to monitor the system after deployment, consult [observability/](../observability/overview.md).
-->

## Environments

The application supports two deployment stages:

- **dev**: Development environment for testing and experimentation.
- **prod**: Production environment serving real users.

Both environments run on AWS, configured via [sst.config.ts](/sst.config.ts). Infrastructure is defined as code using the SST framework and deployed to separate AWS accounts for isolation.

Invalid stage names are rejected at deployment time with an error message.

## Infrastructure

All infrastructure is defined as code and deployed through the SST (Serverless Stack) framework. All resources are provisioned automatically during deployment; no manual resource creation is required. For the specific AWS services provisioned and how the system relies on each, see [dependencies/](../dependencies/overview.md).

## AWS Account Isolation

Dev and prod deployments use separate AWS accounts. The deployment system validates that the AWS credentials belong to the correct account before proceeding. Deployment will fail if credentials are from an unknown or mismatched account.
