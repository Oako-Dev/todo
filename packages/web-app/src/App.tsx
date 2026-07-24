import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DefaultApi, InitOverrideFunction, TodoListItem } from 'sdk';
import {
    clearStoredPassword,
    getStoredPassword,
    setStoredPassword,
} from './passwordStore';
import { createNewTodoList } from './util';

const api = new DefaultApi();

function withPasswordHeader(
    password: string | null,
): InitOverrideFunction | undefined {
    if (!password) return undefined;
    return async ({ init }) => ({
        headers: { ...init.headers, 'X-Todo-Password': password },
    });
}

const inputClass =
    'font-sans text-sm text-ink bg-surface border border-border-strong rounded-sm w-full px-[var(--control-pad-x)] py-[var(--control-pad-y)] transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-subtle)] placeholder:text-ink-muted';

function CheckIcon() {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="shrink-0"
        >
            <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42l2.79 2.79 6.79-6.79a1 1 0 011.42 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default function App() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [todoList, setTodoList] = useState<TodoListItem[]>([]);
    const [newItemText, setNewItemText] = useState('');

    const [password, setPassword] = useState<string | null>(null);
    const [isProtected, setIsProtected] = useState(false);
    const [needsPassword, setNeedsPassword] = useState(false);
    const [passwordAttempt, setPasswordAttempt] = useState('');
    const [passwordPromptError, setPasswordPromptError] = useState<
        string | null
    >(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordFormValue, setPasswordFormValue] = useState('');
    const [settingsSaving, setSettingsSaving] = useState(false);
    const [settingsError, setSettingsError] = useState<string | null>(null);

    async function loadList(listId: string, pw: string | null) {
        setLoading(true);
        setLoadError(null);

        try {
            const todo = await api.todosIdGet(
                { id: listId },
                withPasswordHeader(pw),
            );
            setTodoList(todo.list);
            setIsProtected(!!todo.isProtected);
            setPassword(pw);
            setNeedsPassword(false);
            setPasswordPromptError(null);
            if (pw) setStoredPassword(listId, pw);
        } catch (e: any) {
            if (e.response?.status === 404) {
                setLoadError('Could not find this TODO list.');
            } else if (e.response?.status === 401) {
                setIsProtected(true);
                setNeedsPassword(true);
                if (pw) {
                    clearStoredPassword(listId);
                    setPasswordPromptError('Incorrect password.');
                }
            } else {
                setLoadError('Failed to load the TODO list.');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id) return;
        loadList(id, getStoredPassword(id));
    }, [id]);

    function handlePasswordSubmit(e: FormEvent) {
        e.preventDefault();
        if (!id || !passwordAttempt) return;
        loadList(id, passwordAttempt);
    }

    async function persist(nextList: TodoListItem[]) {
        if (!id) return;

        const previousList = todoList;
        setTodoList(nextList);
        setSaving(true);
        setSaveError(null);

        try {
            await api.todosIdPut(
                {
                    id,
                    todoList: {
                        id,
                        list: nextList,
                    },
                },
                withPasswordHeader(password),
            );
            setTodoList(nextList);
        } catch {
            setTodoList(previousList);
            setSaveError('Failed to save changes.');
        } finally {
            setSaving(false);
        }
    }

    async function updatePassword(newPasswordValue: string | null) {
        if (!id) return;

        setSettingsSaving(true);
        setSettingsError(null);

        try {
            const result = await api.todosIdPut(
                {
                    id,
                    todoList: {
                        id,
                        list: todoList,
                        password: newPasswordValue,
                    },
                },
                withPasswordHeader(password),
            );
            setIsProtected(!!result.isProtected);
            if (newPasswordValue) {
                setPassword(newPasswordValue);
                setStoredPassword(id, newPasswordValue);
            } else {
                setPassword(null);
                clearStoredPassword(id);
            }
            setShowPasswordForm(false);
            setPasswordFormValue('');
        } catch {
            setSettingsError('Failed to update password.');
        } finally {
            setSettingsSaving(false);
        }
    }

    function handlePasswordFormSubmit(e: FormEvent) {
        e.preventDefault();
        const value = passwordFormValue.trim();
        if (!value) return;
        updatePassword(value);
    }

    function handleRemovePassword() {
        updatePassword(null);
    }

    function toggleItem(index: number) {
        persist(
            todoList.map((item, i) =>
                i === index ? { ...item, completed: !item.completed } : item,
            ),
        );
    }

    function deleteItem(index: number) {
        persist(todoList.filter((_, i) => i !== index));
    }

    function handleAddItem(e: FormEvent) {
        e.preventDefault();
        const text = newItemText.trim();
        if (!text) return;
        setNewItemText('');
        persist([...todoList, { text, completed: false }]);
    }

    async function handleCreateNewList() {
        const newId = await createNewTodoList();
        navigate(`/todos/${newId}`);
    }

    if (loadError) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-canvas px-24 py-48">
                <div className="flex flex-col items-center gap-16 w-[480px] text-center">
                    <p className="text-danger-text text-sm m-0">{loadError}</p>
                    <button
                        type="button"
                        onClick={handleCreateNewList}
                        className="font-sans text-sm font-medium text-ink-on-accent bg-accent hover:bg-accent-hover active:bg-accent-active rounded-sm px-[var(--control-pad-x)] py-[var(--control-pad-y)] transition-colors duration-150"
                    >
                        Create new list?
                    </button>
                </div>
            </div>
        );
    }

    if (needsPassword) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-canvas px-24 py-48">
                <div className="flex flex-col items-center gap-16 w-[480px] text-center">
                    <p className="text-sm text-ink m-0">
                        This list is password protected.
                    </p>
                    {passwordPromptError && (
                        <p className="text-danger-text text-sm m-0">
                            {passwordPromptError}
                        </p>
                    )}
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="flex gap-8 w-full"
                    >
                        <input
                            className={inputClass}
                            type="password"
                            placeholder="Enter password…"
                            value={passwordAttempt}
                            onChange={(e) => setPasswordAttempt(e.target.value)}
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading || passwordAttempt.length === 0}
                            className="font-sans text-sm font-medium text-ink-on-accent bg-accent hover:bg-accent-hover active:bg-accent-active disabled:opacity-50 rounded-sm px-[var(--control-pad-x)] py-[var(--control-pad-y)] transition-colors duration-150 shrink-0"
                        >
                            Unlock
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-canvas px-24 py-48">
            <div className="flex flex-col gap-16 w-[480px]">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-ink m-0">
                        Todo list
                    </h2>
                    <button
                        type="button"
                        onClick={() => setShowPasswordForm((s) => !s)}
                        className="text-sm text-ink-muted hover:text-ink"
                    >
                        {isProtected ? '🔒 Protected' : 'Add password'}
                    </button>
                </div>

                {showPasswordForm && (
                    <form
                        onSubmit={handlePasswordFormSubmit}
                        className="flex flex-col gap-8 rounded-lg border border-border bg-surface p-16"
                    >
                        <label
                            htmlFor="password-form-input"
                            className="text-sm text-ink"
                        >
                            {isProtected ? 'Change password' : 'Set a password'}
                        </label>
                        <input
                            id="password-form-input"
                            className={inputClass}
                            type="password"
                            placeholder="New password…"
                            value={passwordFormValue}
                            onChange={(e) =>
                                setPasswordFormValue(e.target.value)
                            }
                            disabled={settingsSaving}
                        />
                        {settingsError && (
                            <p className="text-danger-text text-sm m-0">
                                {settingsError}
                            </p>
                        )}
                        <div className="flex gap-8">
                            <button
                                type="submit"
                                disabled={
                                    settingsSaving ||
                                    passwordFormValue.trim().length === 0
                                }
                                className="font-sans text-sm font-medium text-ink-on-accent bg-accent hover:bg-accent-hover active:bg-accent-active disabled:opacity-50 rounded-sm px-[var(--control-pad-x)] py-[var(--control-pad-y)] transition-colors duration-150"
                            >
                                {isProtected
                                    ? 'Update password'
                                    : 'Set password'}
                            </button>
                            {isProtected && (
                                <button
                                    type="button"
                                    onClick={handleRemovePassword}
                                    disabled={settingsSaving}
                                    className="text-sm text-danger-text"
                                >
                                    Remove password
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => setShowPasswordForm(false)}
                                disabled={settingsSaving}
                                className="text-sm text-ink-muted"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {saveError && (
                    <p className="text-danger-text text-sm m-0">{saveError}</p>
                )}

                <div className="rounded-lg border border-border bg-surface shadow-md overflow-hidden">
                    {loading ? (
                        <p className="text-sm text-ink-muted px-16 py-12 m-0">
                            Loading…
                        </p>
                    ) : todoList.length === 0 ? (
                        <p className="text-sm text-ink-muted px-16 py-12 m-0">
                            No items yet.
                        </p>
                    ) : (
                        <div className="flex flex-col divide-y divide-border">
                            {todoList.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-12 px-16 py-12"
                                >
                                    <button
                                        type="button"
                                        aria-label={
                                            item.completed
                                                ? 'Mark as not done'
                                                : 'Mark as done'
                                        }
                                        onClick={() => toggleItem(index)}
                                        disabled={saving}
                                        className={`w-16 h-16 rounded-sm border flex items-center justify-center shrink-0 ${
                                            item.completed
                                                ? 'bg-accent border-accent text-ink-on-accent'
                                                : 'border-border-strong'
                                        }`}
                                    >
                                        {item.completed && <CheckIcon />}
                                    </button>
                                    <span
                                        className={`flex-1 text-sm ${
                                            item.completed
                                                ? 'text-ink-muted line-through'
                                                : 'text-ink'
                                        }`}
                                    >
                                        {item.text}
                                    </span>
                                    <button
                                        type="button"
                                        aria-label="Delete item"
                                        onClick={() => deleteItem(index)}
                                        disabled={saving}
                                        className="text-ink-muted hover:text-danger-text text-sm"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <form onSubmit={handleAddItem} className="flex gap-8">
                    <input
                        className={inputClass}
                        type="text"
                        placeholder="Add a new item…"
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        disabled={saving}
                    />
                    <button
                        type="submit"
                        disabled={saving || newItemText.trim().length === 0}
                        className="font-sans text-sm font-medium text-ink-on-accent bg-accent hover:bg-accent-hover active:bg-accent-active disabled:opacity-50 rounded-sm px-[var(--control-pad-x)] py-[var(--control-pad-y)] transition-colors duration-150 shrink-0"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    );
}
