/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#120D0E",
        secondary: "#DB924B"
      }
    },
  },
  daisyui: {
    themes: false
  },
  plugins: [require('daisyui')],
}

