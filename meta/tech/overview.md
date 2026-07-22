# Technology

<!-- purpose
The key technologies used in this product, how they are used, and what aspects of them are relevant. For example: if services communicate via JSON RPC, explain that pattern and link to the relevant docs.

This doesn't need to cover every dependency — only the ones that meaningfully shape how the product is built or understood. A web app doesn't need to explain TCP.

This is an overview — keep each technology's description brief and link to individual files in this directory for more detail.

This document does not describe dependencies of the system. It should not include products or packages. "AWS S3" doesn't belong in this document, but "JSON RPC" does.

If it describes a specific external system or API the product relies on, consult [dependencies/](../dependencies/overview.md) to see if it better fits there. If it describes how the system is decomposed into components, consult [architecture/](../architecture/overview.md).
-->

## Infrastructure as Code (SST)

The project uses [SST (Serverless Stack)](https://sst.dev/) v3.17.14 to define and deploy AWS infrastructure. SST provides TypeScript-based component abstractions for common serverless patterns (databases, APIs, static sites), letting you declare cloud resources without managing raw Terraform or CloudFormation templates.

## TypeScript

TypeScript is used throughout the infrastructure and API code. Type definitions for AWS Lambda and AWS SDK are included in the dev dependencies.

## Build and Package Management

[Bun](https://bun.sh/) is the package manager and runtime. It replaces npm/Node in this project, providing faster installs and runtime execution. The web app is built with `bun run build`, and the root workspace uses Prettier with the import organization plugin for consistent code formatting. The web app build process uses TypeScript compilation followed by Vite bundling to produce a static site artifact.

## Web App Architecture

The web application is a single-page application (SPA) built with **React** (v18.2) and **React Router** (v7.18) for client-side routing. The router uses a simple routing structure:
- `/` → Home page (landing/intro screen)
- `/todos/:id` → Todo list detail page (where users view and edit a specific list)

Navigation is declarative via React Router's `useNavigate` hook, and route parameters (like list `id`) are accessed via `useParams`. The browser's back/forward buttons work naturally.

**Tailwind CSS** (v3) is used for styling with a comprehensive design system layer that defines semantic color tokens, spacing scales, typography systems, and component-level styling conventions. The design system uses CSS custom properties (CSS variables) to define colors, shadows, and other theme values in `styles/tokens.css`, enabling flexible theming and design consistency. Global styles are defined in `styles/index.css` using Tailwind's `@layer` system for base HTML/body styles, accessibility preferences, and focus indicators.

The web app is designed to run in modern browsers and does not require server-side rendering. It uses React hooks (useState, useEffect) for component state management and side effects like API calls.
