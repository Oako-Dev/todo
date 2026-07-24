# Data Flow

<!-- purpose
How data moves through the system. Where does it enter, where does it exit, and what happens in between?

This is an overview — keep each flow brief and link to more detailed pages in this directory for specific paths or subsystems.

If it describes what a core entity means rather than how it moves, consult [data-model/](../data-model/overview.md) to see if it better fits there.
-->

## Request/Response Flow

Data flows through the system via HTTP requests from the web app to API endpoints:

1. **Retrieve Todo List (`GET /todos/{id}`)**: The web app requests a todo list by ID. The API handler retrieves the item from DynamoDB using the provided ID and returns it as JSON. If the item doesn't exist, a 404 response is returned. If the ID parameter is missing, a 400 response is returned.

2. **Update Todo List (`PUT /todos/{id}`)**: The web app sends a JSON-encoded todo list in the request body with a specific ID in the path. The API handler parses the JSON body, assigns the ID to the todo list, and persists it to DynamoDB. A 200 response returns the stored todo list as JSON. If the ID parameter or body is missing, a 400 response is returned.

Both handlers return responses with `Content-Type: application/json` headers for successful (200) responses.
