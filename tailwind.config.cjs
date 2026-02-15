/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        display: ["Bebas Neue", "Oswald", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
      },
      transitionProperty: {
        colors: "background-color, color, border-color",
      },
    },
  },
  plugins: [],
};
