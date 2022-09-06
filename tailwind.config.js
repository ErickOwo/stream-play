/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*{html,js,jsx}'],
  theme: {
    fontFamily: {
      'Abril': ['Abril Fatface', 'cursive'],
      'Arvo': ['Arvo', 'serif'],
      'Pacifico': ['Pacifico','cursive'],
      'PT': ['PT Serif', 'serif'],
    },
    colors: {
      ...colors
    },
    extend: {},
  },
  plugins: [],
}
