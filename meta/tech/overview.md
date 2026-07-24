# Technology

<!-- purpose
The key technologies used in this product, how they are used, and what aspects of them are relevant. For example: if services communicate via JSON RPC, explain that pattern and link to the relevant docs.

This doesn't need to cover every dependency — only the ones that meaningfully shape how the product is built or understood. A web app doesn't need to explain TCP.

This is an overview — keep each technology's description brief and link to individual files in this directory for more detail.

This document does not describe dependencies of the system. It should not include products or packages. "AWS S3" doesn't belong in this document, but "JSON RPC" does.

If it describes a specific external system or API the product relies on, consult [dependencies/](../dependencies/overview.md) to see if it better fits there. If it describes how the system is decomposed into components, consult [architecture/](../architecture/overview.md).
-->

## API Client: Generated SDK

The web app communicates with the API using a generated, type-safe SDK client rather than raw HTTP calls. This shared client abstraction — including its contract and usage — is described in [architecture/abstractions/](../architecture/abstractions/overview.md).

## Styling: Design Tokens

The project defines a design system of custom colors, spacing, typography, and shadows via CSS custom properties (variables), enabling consistent theming across the application.
