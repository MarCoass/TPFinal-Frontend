const defaultTheme = require('tailwindcss/defaultTheme')
const { nextui } = require('@nextui-org/react')
module.exports = {
    content: [
        './src/**/*.js',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    plugins: [nextui()],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
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
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
