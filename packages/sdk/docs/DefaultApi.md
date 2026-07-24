# DefaultApi

All URIs are relative to *https://api.todo.daytonellwanger.com*

| Method                                     | HTTP request        | Description            |
| ------------------------------------------ | ------------------- | ---------------------- |
| [**todosIdGet**](DefaultApi.md#todosidget) | **GET** /todos/{id} | Gets the TODO list.    |
| [**todosIdPut**](DefaultApi.md#todosidput) | **PUT** /todos/{id} | Updates the TODO list. |

## todosIdGet

> TodoList todosIdGet(id, xTodoPassword)

Gets the TODO list.

### Example

```ts
import { Configuration, DefaultApi } from '';
import type { TodosIdGetRequest } from '';

async function example() {
    console.log('🚀 Testing  SDK...');
    const api = new DefaultApi();

    const body = {
        // string | ID of the TODO list.
        id: id_example,
        // string | Password for accessing a password-protected TODO list. (optional)
        xTodoPassword: xTodoPassword_example,
    } satisfies TodosIdGetRequest;

    try {
        const data = await api.todosIdGet(body);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type     | Description                                            | Notes                                |
| ----------------- | -------- | ------------------------------------------------------ | ------------------------------------ |
| **id**            | `string` | ID of the TODO list.                                   | [Defaults to `undefined`]            |
| **xTodoPassword** | `string` | Password for accessing a password-protected TODO list. | [Optional] [Defaults to `undefined`] |

### Return type

[**TodoList**](TodoList.md)

### Authorization

No authorization required

### HTTP request headers

-   **Content-Type**: Not defined
-   **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | Successfully fetched TODO list. | -                |
| **401**     | Password required or incorrect. | -                |
| **404**     | TODO list not found.            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

## todosIdPut

> TodoList todosIdPut(id, todoList, xTodoPassword)

Updates the TODO list.

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '';
import type { TodosIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new DefaultApi();

  const body = {
    // string | ID of the TODO list.
    id: id_example,
    // TodoList
    todoList: ...,
    // string | Password for updating a password-protected TODO list. (optional)
    xTodoPassword: xTodoPassword_example,
  } satisfies TodosIdPutRequest;

  try {
    const data = await api.todosIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

| Name              | Type                    | Description                                           | Notes                                |
| ----------------- | ----------------------- | ----------------------------------------------------- | ------------------------------------ |
| **id**            | `string`                | ID of the TODO list.                                  | [Defaults to `undefined`]            |
| **todoList**      | [TodoList](TodoList.md) |                                                       |                                      |
| **xTodoPassword** | `string`                | Password for updating a password-protected TODO list. | [Optional] [Defaults to `undefined`] |

### Return type

[**TodoList**](TodoList.md)

### Authorization

No authorization required

### HTTP request headers

-   **Content-Type**: `application/json`
-   **Accept**: `application/json`

### HTTP response details

| Status code | Description                     | Response headers |
| ----------- | ------------------------------- | ---------------- |
| **200**     | Successfully updated TODO list. | -                |
| **401**     | Password required or incorrect. | -                |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
