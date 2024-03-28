module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        styren: ['StyrenAWeb', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        medium: 600,
        bold: 700,
      },
      colors: {
        'red-accent': '#FF3535',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
