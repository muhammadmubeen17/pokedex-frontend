/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '425px',
        'sm': '640px',
        'md': '768px',
        'md2': '830px',
        'lg': '1024px',
        'lg2': '1200px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}

