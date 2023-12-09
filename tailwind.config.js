/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Archivo"', "sans-serif"],
      serif: ['"Bree Serif"', "serif"],
    },

    extend: {
      colors: {
        red: {
          500: "#e11414",
          300: "#e8504e",
          100: "#f1888a",
        },
      },
    },
  },
  plugins: [],
};
