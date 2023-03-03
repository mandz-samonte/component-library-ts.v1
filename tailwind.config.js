/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#532EC4",
        "primary-lighter": "#6542d2",
        secondary: "#F7F5FC",
        placeholder: "#A08FD4",
      },
      boxShadow: {
        "md-left": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      fontSize: {
        "2xs": ["0.625rem", "0.825rem"],
      },
    },
  },
  plugins: [],
};
