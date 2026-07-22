# Data Flow

<!-- purpose
How data moves through the system. Where does it enter, where does it exit, and what happens in between?

This is an overview — keep each flow brief and link to more detailed pages in this directory for specific paths or subsystems.

If it describes what a core entity means rather than how it moves, consult [data-model/](../data-model/overview.md) to see if it better fits there.
-->

## Request/Response Flow

1. **Web App to API**: The React web application (running in the browser) makes HTTP requests to the REST API endpoints via the browser's `fetch` API or similar HTTP client.

2. **API Processing**: AWS API Gateway V2 routes the incoming HTTP request to the appropriate Lambda handler:
   - `GET /todos/{id}` → `getTodoList` handler
   - `PUT /todos/{id}` → `putTodoList` handler
   
   Each handler processes the request, including extracting path parameters and request body.

3. **Database Interaction**: Lambda handlers interact with DynamoDB via the AWS SDK (`aws-sdk` DocumentClient). The `getTodoList` handler queries the `Todos` table by id; the `putTodoList` handler performs a put operation to create or update a todo.

4. **API Response**: The Lambda handler returns an HTTP response (status code, headers, body) to the client, which is sent back through API Gateway to the web app.
