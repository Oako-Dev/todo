export function createApi({
    domain,
    hostedZoneId,
    todosTable,
}: {
    domain: string;
    hostedZoneId: string;
    todosTable: sst.aws.Dynamo;
}) {
    const api = new sst.aws.ApiGatewayV2('API', {
        domain: {
            name: `api.${domain}`,
            dns: sst.aws.dns({ zone: hostedZoneId }),
        },
    });

    api.route('PUT /todos/{id}', {
        handler: 'packages/api/src/putTodoList.handler',
        link: [todosTable],
    });

    api.route('GET /todos/{id}', {
        handler: 'packages/api/src/getTodoList.handler',
        link: [todosTable],
    });
}
