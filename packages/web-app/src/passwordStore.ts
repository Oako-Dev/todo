const keyFor = (id: string) => `todo-password:${id}`;

export function getStoredPassword(id: string): string | null {
    return sessionStorage.getItem(keyFor(id));
}

export function setStoredPassword(id: string, password: string) {
    sessionStorage.setItem(keyFor(id), password);
}

export function clearStoredPassword(id: string) {
    sessionStorage.removeItem(keyFor(id));
}
