import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DefaultApi, TodoListItem } from 'sdk';
import { createNewTodoList } from './util';

const api = new DefaultApi();

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

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setLoadError(null);

        api.todosIdGet({ id })
            .then((todo) => {
                setTodoList(todo.list);
            })
            .catch((e) => {
                if (e.response?.status === 404) {
                    setLoadError('Could not find this TODO list.');
                } else {
                    setLoadError('Failed to load the TODO list.');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    async function persist(nextList: TodoListItem[]) {
        if (!id) return;

        const previousList = todoList;
        setTodoList(nextList);
        setSaving(true);
        setSaveError(null);

        try {
            await api.todosIdPut({
                id,
                todoList: {
                    id,
                    list: nextList,
                },
            });
            setTodoList(nextList);
        } catch {
            setTodoList(previousList);
            setSaveError('Failed to save changes.');
        } finally {
            setSaving(false);
        }
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

    return (
        <div className="flex items-center justify-center min-h-screen bg-canvas px-24 py-48">
            <div className="flex flex-col gap-16 w-[480px]">
                <h2 className="text-2xl font-semibold text-ink m-0">
                    Todo list
                </h2>

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
