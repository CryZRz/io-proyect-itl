/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "mainBackground": "url(/images/background.jpg)"
      },
      colors:{
        "blackBlur": "rgba(0,0,0,0.8)"
      },
      fontFamily:{
        "bebas": "Bebas Neue"
      }
    },
  },
  plugins: [],
}

