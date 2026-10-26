/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gf: {
          orange: {
            DEFAULT: '#ff6b1a',
            light: '#ff8c42',
          },
          black: {
            DEFAULT: '#0a0a0a',
            light: '#131313',
            card: '#1a1a1a',
          },
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
