/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    height:{
      body: "calc(100vh - 5rem)",
    },
    colors:{
      black: "#333",
      white: "#fdfdfd",
    },
    fontFamily: {
      'shippori': ['Kiwi Maru', 'sans-serif'],
    },
    screens: {
      'mobile': '375px',
      'pc': '1024px',
    },
    extend: {
      colors:{
        primary: "#01A275",
        secondary: "#FEF95D",
        tertiary: "#FE5D8A",
      }
    },
  },
  plugins: [],
}

