/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f3',
        'warm-white': '#fffef9',
        clay: '#c77255',
        terracotta: '#d47555',
        sage: '#8b9d83',
        charcoal: '#2d2d2a',
        'warm-grey': '#9d9890',
        sand: '#e8dfd2',
      },
      fontFamily: {
        serif: ['Crimson Pro', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
