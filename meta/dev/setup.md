# Setup

<!-- purpose
How to prepare a machine to contribute to this codebase. Covers installing languages, runtimes, SDKs, CLIs, and any other tooling required before the first build.

Should include both the happy path and any known platform-specific gotchas.

When a command is sourced from a script or config — an install script, a version-manager invocation, a setup target in a Makefile — quote it verbatim, character for character, rather than paraphrasing or describing it in prose. A summarized command is a wrong command: flags, casing, and argument order are load-bearing, and a reader will copy-paste what's on the page.

If it describes how to build or run the code rather than set up the environment, consult [build.md](build.md) to see if it better fits there.
-->

## Prerequisites

- **Bun**: This project uses Bun as its package manager and runtime. Install from [bun.sh](https://bun.sh/).
- **AWS credentials**: To deploy to AWS, you must have AWS credentials configured. These can be set via environment variables (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`), AWS CLI configuration, or IAM role (if running on EC2 or similar). The credentials must belong to either the dev or prod AWS account; deployment will fail if they belong to an unknown account.

## Install Dependencies

Once Bun is installed, install the project's dependencies:

```
bun install
```

This installs dependencies for all workspace packages defined in the root `package.json`.
