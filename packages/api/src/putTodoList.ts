import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Resource } from 'sst/resource';

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
    const todoList = JSON.parse(event.body);
    todoList.id = idParam;

    await dynamoDb
        .put({
            TableName: Resource.Todos.name,
            Item: todoList,
        })
        .promise();

    return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoList),
    };
};
