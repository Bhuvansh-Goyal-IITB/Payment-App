/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["'Inter', sans-serif"],
      serif: ["'Zilla Slab', serif"],
    },
    extend: {},
  },
  plugins: [],
};
