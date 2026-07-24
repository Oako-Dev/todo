# Observability

<!-- purpose
How the system is monitored in production. Covers where logs are written and how to access them, what metrics and traces are collected, how to search and correlate signals across services, and any dashboards or alerting in use.

Notes any differences in observability across environments.

This is an overview — keep each topic brief and link to more detailed pages in this directory where necessary.

If it describes the deployment process, consult [deployment/](../deployment/overview.md) to see if it better fits there. If it describes security auditing or access logging, consult [security/](../security/security-model.md).
-->

## Current State

The system currently has minimal observability infrastructure:

**Logging:**
- API Lambda handlers do not include structured logging calls
- Errors are logged automatically by AWS Lambda to CloudWatch (including unhandled exceptions)
- No application-level request/response logging

**Metrics and Dashboards:**
- No custom metrics are emitted from the application
- CloudWatch automatically collects Lambda invocation metrics (duration, error count, throttles) but no dashboards have been created to visualize them
- No API-level metrics (latency, throughput, error rates by endpoint) are tracked

**Traces and Correlation:**
- No distributed tracing (X-Ray or similar) is configured
- No request correlation IDs or trace contexts are propagated

**Alerting:**
- No CloudWatch alarms or alerting rules are configured
- Errors and performance issues are not actively monitored in production

This minimal setup is acceptable for a low-volume application but would need enhancement before scaling to higher request volumes or adding production SLAs.
