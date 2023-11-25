const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            fontFamily: {
                mono: ['var(--font-roboto-mono)'],
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                naranja: {
                    50: '#FFF2E5',
                    100: '#FFE5CC',
                    200: '#FFCA99',
                    300: '#FFB066',
                    400: '#FF9633',
                    500: '#FF7D00',
                    600: '#CC6300',
                    700: '#994A00',
                    800: '#663100',
                    900: '#331900',
                    950: '#190C00',
                },
                cremita: {
                    50: '#FFFDFA',
                    100: '#FFFBF5',
                    200: '#FFF7EB',
                    300: '#FFF4E5',
                    400: '#FFF0DB',
                    500: '#FFECD1',
                    600: '#FFC675',
                    700: '#FF9F1A',
                    800: '#B86B00',
                    900: '#5C3600',
                    950: '#2E1B00',
                },
                violeta: {
                    50: '#FEE2F6',
                    100: '#FCC0EC',
                    200: '#F980D9',
                    300: '#F746C7',
                    400: '#EF0BB2',
                    500: '#AF0883',
                    600: '#8D0669',
                    700: '#6B0550',
                    800: '#440333',
                    900: '#220219',
                    950: '#14010F',
                },
                rosado: {
                    50: '#FCF2F5',
                    100: '#FAE6EC',
                    200: '#F4C8D5',
                    300: '#EEAFC2',
                    400: '#E891AB',
                    500: '#E37898',
                    600: '#D73D6B',
                    700: '#AD244D',
                    800: '#721833',
                    900: '#3B0C1A',
                    950: '#1E060D',
                },
                lila: {
                    50: '#F8F4FB',
                    100: '#F1E9F6',
                    200: '#E3D3ED',
                    300: '#D6BEE5',
                    400: '#CAACDD',
                    500: '#BC95D4',
                    600: '#9C63C0',
                    700: '#763E98',
                    800: '#4E2966',
                    900: '#271533',
                    950: '#140A19',
                },
            },
            opacity: ['disabled'],
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
}
