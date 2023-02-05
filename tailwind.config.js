const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', ...fontFamily.sans],
        secondary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        primary: {
          100: '#ccd6f6',
          300: '#8892b0',
          500: '#1e213a',
          700: '#040c16',
          800: '#00007A',
          900: '#0a192f',
        },
        danger: {
          100: '#ffbaba',
          200: '#ff7b7b',
          300: '#ff5252',
          500: '#ff0000',
          900: '#a70000',
        },
        warning: {
          100: '#f6e2cc',
        },
        success: {
          100: '#d1f6cc',
          200: '#a3f299',
          300: '#7fe96b',
          500: '#4cd137',
          900: '#2f9e0f',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
