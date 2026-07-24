# Setup

<!-- purpose
How to prepare a machine to contribute to this codebase. Covers installing languages, runtimes, SDKs, CLIs, and any other tooling required before the first build.

Should include both the happy path and any known platform-specific gotchas.

When a command is sourced from a script or config — an install script, a version-manager invocation, a setup target in a Makefile — quote it verbatim, character for character, rather than paraphrasing or describing it in prose. A summarized command is a wrong command: flags, casing, and argument order are load-bearing, and a reader will copy-paste what's on the page.

If it describes how to build or run the code rather than set up the environment, consult [build.md](build.md) to see if it better fits there.
-->

## Prerequisites

### Package Manager: Bun

This project uses [Bun](https://bun.sh) as the package manager and runtime. Install it following the official installation guide for your platform.

### AWS Credentials

To deploy to AWS environments, configure your AWS credentials. The deployment process validates that your AWS account matches the configured account ID for the target stage (dev or prod).

## Development Tools

### Code Formatting

The project uses Prettier with the organize-imports plugin for consistent code formatting. This is configured in `.prettierrc.json`:

```json
{
    "tabWidth": 4,
    "singleQuote": true,
    "plugins": ["prettier-plugin-organize-imports"]
}
```

To format the codebase, run:

```
bun run format
```

(This command is defined in the root `package.json`.)

## Monorepo Installation

Once you have Bun installed, install dependencies for the entire monorepo:

```
bun install
```

Bun automatically resolves workspaces defined in the root `package.json` and installs all dependencies across `packages/*`.
