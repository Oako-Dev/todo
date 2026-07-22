export function createStorage() {
    const todosTable = new sst.aws.Dynamo('Todos', {
        fields: {
            id: 'string',
        },
        primaryIndex: { hashKey: 'id' },
    });

    return { todosTable };
}
