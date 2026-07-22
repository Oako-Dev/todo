import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                canvas: 'var(--color-canvas)',
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    sunken: 'var(--color-surface-sunken)',
                },
                border: {
                    DEFAULT: 'var(--color-border)',
                    strong: 'var(--color-border-strong)',
                },
                ink: {
                    DEFAULT: 'var(--color-text)',
                    secondary: 'var(--color-text-secondary)',
                    muted: 'var(--color-text-muted)',
                    'on-accent': 'var(--color-text-on-accent)',
                },
                accent: {
                    DEFAULT: 'var(--color-accent)',
                    hover: 'var(--color-accent-hover)',
                    active: 'var(--color-accent-active)',
                    subtle: 'var(--color-accent-subtle)',
                    'subtle-text': 'var(--color-accent-subtle-text)',
                },
                secondary: {
                    DEFAULT: 'var(--color-secondary)',
                    hover: 'var(--color-secondary-hover)',
                    subtle: 'var(--color-secondary-subtle)',
                    'subtle-text': 'var(--color-secondary-subtle-text)',
                },
                success: {
                    DEFAULT: 'var(--color-success)',
                    bg: 'var(--color-success-bg)',
                    text: 'var(--color-success-text)',
                    border: 'var(--color-success-border)',
                },
                warning: {
                    DEFAULT: 'var(--color-warning)',
                    bg: 'var(--color-warning-bg)',
                    text: 'var(--color-warning-text)',
                    border: 'var(--color-warning-border)',
                },
                danger: {
                    DEFAULT: 'var(--color-danger)',
                    bg: 'var(--color-danger-bg)',
                    text: 'var(--color-danger-text)',
                    border: 'var(--color-danger-border)',
                },
                info: {
                    DEFAULT: 'var(--color-info)',
                    bg: 'var(--color-info-bg)',
                    text: 'var(--color-info-text)',
                    border: 'var(--color-info-border)',
                },
                code: {
                    bg: 'var(--color-code-bg)',
                    text: 'var(--color-code-text)',
                    muted: 'var(--color-code-muted)',
                    accent: 'var(--color-code-accent)',
                },
            },
            spacing: {
                '4': '4px',
                '8': '8px',
                '12': '12px',
                '16': '16px',
                '24': '24px',
                '32': '32px',
                '48': '48px',
                '64': '64px',
                '96': '96px',
                '128': '128px',
            },
            borderRadius: {
                none: '0px',
                sm: '6px',
                DEFAULT: '10px',
                md: '10px',
                lg: '16px',
                full: '999px',
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                DEFAULT: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
            },
            fontFamily: {
                display: ['Arial', 'Helvetica', 'sans-serif'],
                sans: [
                    'Inter',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'sans-serif',
                ],
                mono: [
                    'JetBrains Mono',
                    'ui-monospace',
                    'SF Mono',
                    'Menlo',
                    'monospace',
                ],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5' }],
                base: ['1rem', { lineHeight: '1.5' }],
                lg: ['1.125rem', { lineHeight: '1.4' }],
                xl: ['1.25rem', { lineHeight: '1.4' }],
                '2xl': ['1.5rem', { lineHeight: '1.3' }],
                '3xl': ['1.875rem', { lineHeight: '1.25' }],
                '4xl': ['2.25rem', { lineHeight: '1.2' }],
                '5xl': ['3rem', { lineHeight: '1.1' }],
            },
        },
    },
    plugins: [],
};

export default config;
