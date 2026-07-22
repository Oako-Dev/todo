# Platform

<!-- purpose
What kind of thing is this? An iOS app, a VS Code extension, a cloud service, a CLI tool?

This document names the platform and notes any platform-specific constraints or conventions that affect development.

This is a very brief document and does not describe architecture, does not record specific values like version numbers, package identifiers, SDK targets, project IDs, or URLs.

If it describes a technology pattern, consult [tech/](tech/overview.md) to see if it better fits there. If it describes how the system is decomposed into components, consult [architecture/](architecture/overview.md).
-->

## Web Browser Application

This is a web application designed to run in modern browsers. The primary user interface is a single-page React application.

The application assumes JavaScript is enabled and uses ES6+ language features without polyfills for older browsers. It does not target mobile-specific platforms (iOS or Android) and relies on standard browser APIs like `fetch`, `localStorage`, and the DOM.

The client is stateless: application state is not persisted between browser sessions.
