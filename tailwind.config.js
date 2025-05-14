/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: '#F0B90B',
          500: '#F0B90B',
          600: '#D9A50D',
        },
      },
    },
  },
  plugins: [],
};