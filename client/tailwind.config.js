/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          dark: '#000000',
        },
        accent: {
          DEFAULT: '#FBBF24',
          light: '#FCD34D',
          dark: '#F59E0B',
          orange: '#F97316',
        },
        gts: {
          black: '#000000',
          yellow: '#FBBF24',
          orange: '#F59E0B',
          gold: '#D97706',
        }
      },
    },
  },
  plugins: [],
};
