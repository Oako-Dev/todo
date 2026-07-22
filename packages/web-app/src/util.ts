import { DefaultApi } from 'sdk';

const api = new DefaultApi();

function getRandomId(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

export async function createNewTodoList() {
    const id = getRandomId();
    await api.todosIdPut({
        id,
        todoList: {
            id,
            list: [],
        },
    });

    return id;
}
