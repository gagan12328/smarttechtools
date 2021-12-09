const production = !process.env.ROLLUP_WATCH;

// not using extensively
module.exports = {
  purge: {
    content: [
     "./src/**/*.svelte",
    ],
    enabled: true // disable purge in dev
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
