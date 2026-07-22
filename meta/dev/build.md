# Build

<!-- purpose
How to compile or bundle the code. Covers the commands needed to produce a runnable or shippable artifact, and any flags or environment variables that affect the build.

When a command is sourced from a script or config — a package.json script, an sst deploy invocation, a Makefile target — quote it verbatim, character for character, rather than paraphrasing or describing it in prose. A summarized command is a wrong command: flags, casing, and argument order are load-bearing, and a reader will copy-paste what's on the page.

If it describes setting up the environment before building, consult [setup.md](setup.md) to see if it better fits there. If it describes deploying the built artifact, consult [deployment/](../deployment/overview.md).
-->

## Web App Build

The web app at `packages/web-app` is built with Vite:

```
bun run build
```

This produces optimized output in the `dist` directory. The web app is built and deployed automatically during infrastructure deployment via SST; this command is primarily for local testing and validation.

## Infrastructure and Deployment Build

Infrastructure code is compiled and deployed in one step via the SST CLI. See [deployment/](../deployment/overview.md) for instructions on deploying to dev or prod environments. SST handles building both the infrastructure definitions and packaging Lambda handler functions.
