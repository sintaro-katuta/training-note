/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#01A275",
      secondary: "#FEF95D",
      tertiary: "#FE5D8A",
      black: "#333",
      white: "#fdfdfd",
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      red: colors.rose,
      blue: colors.sky,
    },
    fontFamily: {
      'shippori': ['Kiwi Maru', 'sans-serif'],
    },
    screens: {
      'mobile': '375px',
      'pc': '1024px',
    },
    extend: {},
  },
  plugins: [],
}

