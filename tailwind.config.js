/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '',
        secondary: ''
      },
      fontFamily: {
        sans: [
          '"Inter"',
          '"Helvetica"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
