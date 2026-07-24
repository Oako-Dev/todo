# Overview

<!-- purpose
The highest-level view of what this system does and why it exists. What problem does it solve, and for whom?

This document may also state explicit non-goals — what the system is _not_ trying to do. For a large product, the broad goal can be described here with links to `docs/` for individual features.

This document is closely related to the user-facing product documentation.

This is an overview — keep each topic brief and link to individual sections of this documentation for more detail.

This document does not inventory features, include specific metrics (user counts, revenue, performance numbers), or describe technical implementation — those belong in other documents.

If it describes a specific feature rather than the product as a whole, consult [docs/](docs/) to see if it better fits there. If it describes business or strategic context, consult [business/](business/overview.md).
-->

## What Is This

A web-based todo list application for creating, viewing, and managing personal task lists. Lists are shared via unique URLs: create a list, share the link, and anyone with the link can view and edit it.

## Design Model

The system is designed around **shareable links** rather than user accounts. Each todo list has a unique ID (which forms the URL), and access is granted simply by knowing that ID. There is no authentication, user accounts, or permission system — the URL itself is the only access control mechanism. This enables instant sharing and collaboration without account management.

## Technical Context

See [architecture/](architecture/overview.md) for how the system is decomposed, [deployment/](deployment/overview.md) for how it reaches production, and [security/security-model.md](security/security-model.md) for security implications of the shareable-link model.
