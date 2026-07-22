import { useNavigate } from 'react-router-dom';
import { createNewTodoList } from './util';

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

const items = [
    { label: 'Buy groceries', done: true },
    { label: 'Walk the dog', done: true },
    { label: 'Finish project report', done: false },
    { label: 'Call the plumber', done: false },
];

function TodoListIllustration() {
    return (
        <div className="rounded-lg border border-border bg-surface shadow-md overflow-hidden w-80">
            <div className="px-16 py-12 border-b border-border bg-surface-sunken">
                <span className="font-display font-semibold text-sm text-ink">
                    Today
                </span>
            </div>
            <div className="flex flex-col divide-y divide-border">
                {items.map(({ label, done }) => (
                    <div
                        key={label}
                        className="flex items-center gap-12 px-16 py-12"
                    >
                        <span
                            className={`w-16 h-16 rounded-sm border flex items-center justify-center shrink-0 ${
                                done
                                    ? 'bg-accent border-accent text-ink-on-accent'
                                    : 'border-border-strong'
                            }`}
                        >
                            {done && <CheckIcon />}
                        </span>
                        <span
                            className={`text-sm ${
                                done
                                    ? 'text-ink-muted line-through'
                                    : 'text-ink'
                            }`}
                        >
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Home() {
    const navigate = useNavigate();

    async function handleCreateNewList() {
        const newId = await createNewTodoList();
        navigate(`/todos/${newId}`);
    }

    return (
        <div className="min-h-screen bg-canvas text-ink flex items-center justify-center px-24 py-48">
            <div className="flex flex-col items-center max-w-md text-center">
                <h1 className="font-display font-semibold text-4xl tracking-tight mb-4">
                    TODO
                </h1>
                <p className="text-md text-ink-secondary mb-32">
                    keep track of what needs doing
                </p>
                <TodoListIllustration />
                <button
                    type="button"
                    onClick={handleCreateNewList}
                    className="font-sans text-sm font-medium text-ink-on-accent bg-accent hover:bg-accent-hover active:bg-accent-active rounded-sm w-80 px-32 py-[var(--control-pad-y)] transition-colors duration-150 mt-32"
                >
                    Create List
                </button>
            </div>
        </div>
    );
}
