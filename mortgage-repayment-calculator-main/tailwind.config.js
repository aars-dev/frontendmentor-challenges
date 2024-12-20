/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "plus-jakarta-sans": ["Plus Jakarta Sans", "serif"],
      },
      colors: {
        lime: "hsl(61, 70%, 52%)", // mortgage type input box onClick color
        red: "hsl(4, 69%, 50%)", // error color
        white: "hsl(0, 0%, 100%)", // calculator main div bg color
        "slate-100": "hsl(202, 86%, 94%)", // total display bg color
        "slate-300": "hsl(203, 41%, 72%)", //
        "slate-500": "hsl(200, 26%, 54%)", // label color
        "slate-700": "hsl(200, 24%, 40%)", // $ & year color
        "slate-900": "hsl(202, 55%, 16%)", // right side result div color
      },
    },
  },
  plugins: [],
};
