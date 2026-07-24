import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Resource } from 'sst/resource';
import { hashPassword, verifyPassword } from './password';

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    const idParam = event.pathParameters
        ? event.pathParameters['id']
        : undefined;
    if (!idParam) {
        return {
            statusCode: 400,
        };
    }

    if (!event.body) {
        return {
            statusCode: 400,
        };
    }
    const { password, ...todoList } = JSON.parse(event.body);
    todoList.id = idParam;

    const existing = await dynamoDb
        .get({
            TableName: Resource.Todos.name,
            Key: { id: idParam },
        })
        .promise();
    const existingPasswordHash = existing.Item?.passwordHash;

    if (existingPasswordHash) {
        const suppliedPassword = event.headers?.['x-todo-password'];
        if (
            !suppliedPassword ||
            !verifyPassword(suppliedPassword, existingPasswordHash)
        ) {
            return {
                statusCode: 401,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isProtected: true }),
            };
        }
    }

    const passwordHash =
        password === undefined
            ? existingPasswordHash
            : password
              ? hashPassword(password)
              : undefined;

    if (passwordHash) {
        todoList.passwordHash = passwordHash;
    }

    await dynamoDb
        .put({
            TableName: Resource.Todos.name,
            Item: todoList,
        })
        .promise();

    const { passwordHash: _storedHash, ...item } = todoList;

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isProtected: !!passwordHash }),
    };
};
