const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lime: colors.lime,
        blueGray: {
          light: '#373740',
          DEFAULT: '#33333d',
          dark: '#26282f',
        },
        rallyGreen: {
          light: '#37efba',
          DEFAULT: '#1eb980',
          dark: '#007d51',
          darkest: '#045d56',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
