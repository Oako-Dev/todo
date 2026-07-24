import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Resource } from 'sst/resource';
import { verifyPassword } from './password';

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

    const result = await dynamoDb
        .get({
            TableName: Resource.Todos.name,
            Key: { id: idParam },
        })
        .promise();

    if (!result.Item) {
        return { statusCode: 404, body: 'TODO list not found' };
    }

    const { passwordHash, ...item } = result.Item;

    if (passwordHash) {
        const suppliedPassword = event.headers?.['x-todo-password'];
        if (
            !suppliedPassword ||
            !verifyPassword(suppliedPassword, passwordHash)
        ) {
            return {
                statusCode: 401,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isProtected: true }),
            };
        }
    }

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item, isProtected: !!passwordHash }),
    };
};
