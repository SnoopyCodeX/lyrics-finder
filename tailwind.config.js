/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#120D0E",
        secondary: "#DB924B",
        tertiary: "#2A2425",
      }
    },
  },
  plugins: [require('daisyui')],
}

