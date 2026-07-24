# Architecture

<!-- purpose
How the system is decomposed into major components and how those components relate to each other. Which things are services, which are libraries, which are jobs. What are the boundaries, what crosses them, and how.

If the system uses a common architecture pattern (e.g., microservices, client/server, kernel, event-driven), briefly describe it and link to relevant docs. Deviations from the normal pattern should be noted.

This is an overview — keep each component's description brief and link to individual documents in this directory for more detail.

This document does not include configuration values, environment-specific details, specific hostnames or ports, or implementation details within individual components.

If it describes a specific technology, consult [tech/](../tech/overview.md) to see if it better fits there. If it describes how data moves through the system, consult [data-flow/](data-flow/overview.md).
-->

## System Decomposition

The system follows a client-server architecture deployed on AWS with three main components:

### Web App (`packages/web-app`)

A static site frontend that provides the user interface. Built with React and Vite and deployed to S3 with CloudFront caching. It calls the API to fetch and update todo list data.

### API (`packages/api`)

Backend API handlers that process HTTP requests from the web app. Hosted on API Gateway V2 with the following endpoints:

-   `PUT /todos/{id}` — Update a todo list
-   `GET /todos/{id}` — Retrieve a todo list

### Storage (`packages/infrastructure/components/storage.ts`)

A DynamoDB table named "Todos" that persists todo list data, keyed by ID.

## Monorepo Structure

The project uses a Bun monorepo with workspaces to organize code:

-   `packages/infrastructure/` — Infrastructure as Code (SST configuration and component definitions)
-   `packages/api/` — Lambda function handlers for API endpoints
-   `packages/web-app/` — Frontend web application source
