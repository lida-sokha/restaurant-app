/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",               // if using Vite
    "./src/**/*.{js,ts,jsx,tsx}", // all source files
  ],
  theme: {
    extend: {
      fontFamily: {
        imperial: ['"Imperial Script"', 'cursive'],
        karla: ['Karla', 'sans-serif'], // define custom font name
      },
    },
  },
  plugins: [],
}

