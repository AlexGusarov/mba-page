module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        styren: ["StyrenAWeb", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        bold: 700,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
