# Architecture

<!-- purpose
How the system is decomposed into major components and how those components relate to each other. Which things are services, which are libraries, which are jobs. What are the boundaries, what crosses them, and how.

If the system uses a common architecture pattern (e.g., microservices, client/server, kernel, event-driven), briefly describe it and link to relevant docs. Deviations from the normal pattern should be noted.

This is an overview — keep each component's description brief and link to individual documents in this directory for more detail.

This document does not include configuration values, environment-specific details, specific hostnames or ports, or implementation details within individual components.

If it describes a specific technology, consult [tech/](../tech/overview.md) to see if it better fits there. If it describes how data moves through the system, consult [data-flow/](data-flow/overview.md).
-->

## High-Level Structure

The application follows a serverless, cloud-native architecture on AWS, consisting of three main layers:

1. **Storage**: A DynamoDB table (`Todos`) stores the application's data, accessed via the API layer.

2. **API**: An HTTP API (AWS API Gateway V2) exposes REST endpoints for managing todos:
   - `PUT /todos/{id}` - Update a todo
   - `GET /todos/{id}` - Retrieve a todo

   Each endpoint is implemented as an AWS Lambda function.

3. **Web App**: A static website (S3 + CloudFront) serves the user interface. It is a single-page React application built from `packages/web-app`, and uses the SDK package to communicate with the API.

4. **Shared SDK**: A `packages/sdk` workspace package provides shared functionality (imported as `sdk` dependency in the web app).

All components are deployed together as a single unit via [sst.config.ts](/sst.config.ts), which orchestrates their creation and ensures they reference the correct resources.
