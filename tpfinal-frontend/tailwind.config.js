const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.js'],
    darkMode: 'media',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "naranja": {
                    50: "#FFF2E5",
                    100: "#FFE5CC",
                    200: "#FFCA99",
                    300: "#FFB066",
                    400: "#FF9633",
                    500: "#FF7D00",
                    600: "#CC6300",
                    700: "#994A00",
                    800: "#663100",
                    900: "#331900",
                    950: "#190C00"
                },
                "cremita": {
                    50: "#FFFDFA",
                    100: "#FFFBF5",
                    200: "#FFF7EB",
                    300: "#FFF4E5",
                    400: "#FFF0DB",
                    500: "#FFECD1",
                    600: "#FFC675",
                    700: "#FF9F1A",
                    800: "#B86B00",
                    900: "#5C3600",
                    950: "#2E1B00"
                }, "violeta": {
                    50: "#FFDBED",
                    100: "#FFB8DA",
                    200: "#FF75B8",
                    300: "#FF2E93",
                    400: "#EB0071",
                    500: "#A3004F",
                    600: "#850040",
                    700: "#61002F",
                    800: "#420020",
                    900: "#1F000F",
                    950: "#0F0007"
                  }, "rosado": {
                    50: "#FCF2F5",
                    100: "#FAE6EC",
                    200: "#F4C8D5",
                    300: "#EEAFC2",
                    400: "#E891AB",
                    500: "#E37898",
                    600: "#D73D6B",
                    700: "#AD244D",
                    800: "#721833",
                    900: "#3B0C1A",
                    950: "#1E060D"
                  }
            }
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
