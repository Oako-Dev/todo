# Build

<!-- purpose
How to compile or bundle the code. Covers the commands needed to produce a runnable or shippable artifact, and any flags or environment variables that affect the build.

When a command is sourced from a script or config — a package.json script, an sst deploy invocation, a Makefile target — quote it verbatim, character for character, rather than paraphrasing or describing it in prose. A summarized command is a wrong command: flags, casing, and argument order are load-bearing, and a reader will copy-paste what's on the page.

If it describes setting up the environment before building, consult [setup.md](setup.md) to see if it better fits there. If it describes deploying the built artifact, consult [deployment/](../deployment/overview.md).
-->

## Web App Build

The web app is built as a static site by SST during deployment. The build process is configured in `packages/infrastructure/components/webApp.ts` and runs:

```
bun run build
```

The output is placed in the `dist/` directory.

From `packages/web-app/`, this command compiles TypeScript and bundles the React app with Vite:

```
tsc && vite build
```

For development with hot reloading, run from `packages/web-app/`:

```
bun run dev
```

To verify TypeScript compilation without building artifacts:

```
bun run typecheck
```

To preview the built app locally:

```
bun run preview
```

## Infrastructure and API Build

The API and infrastructure are built by SST, which compiles TypeScript in each package and bundles the web app with `bun run build` in `packages/web-app/`.
