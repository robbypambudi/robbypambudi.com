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
          50: '#787a89',
          100: '#626475',
          200: '#4b4d61',
          300: '#35374e',
          400: '#1e213a',
          500: '#1e213a',
          600: '#1b1e34',
          700: '#181a2e',
          800: '#151729',
          900: '#121423',
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
        typo: {
          DEFAULT: '#FFFFFF',
          secondary: '#F9F9F9',
          tertiary: '#999CA0',
          icons: '#999CA0',
          divider: '#EBEBEB',
          outline: '#D9D9D9',
        },
      },
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};

