/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'main': "#01A275",
      'sub1': "#FEF95D",
      'sub2': "#FE5D8A",
      'main-white': "#FDFDFD",
      'main-black': "#333333",
    },
    screens: {
      'iphone': '375px',
      'pc': '1024px',
    },
    extend: {},
  },
  plugins: [],
}

