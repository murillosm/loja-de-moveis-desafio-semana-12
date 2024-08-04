/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        "customColor-1": '#F9F1E7',
        "customColor-2": '#b88e2f',
        "customColor-3": '#898989',
        "customColor-4": '#B0B0B0',
        "customColor-5": '#3A3A3A',
      },
      screens: {
        'xs': '350px',
        'cos': '1050px',
      },
    },
  },
  plugins: [
    flowbitePlugin,
  ],
}

