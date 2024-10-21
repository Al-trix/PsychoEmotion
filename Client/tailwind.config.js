const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#333333", // Define tus colores oscuros aquí
          // Agrega más colores oscuros si es necesario
        },
        ming: {
          50: "#e9fffd",
          100: "#c8fffb",
          200: "#98fff8",
          300: "#51fff8",
          400: "#03fdff",
          500: "#00def4",
          600: "#00b0cc",
          700: "#008ba4",
          800: "#066b7f",
          900: "#0a5b6f",
          950: "#003d4d",
        },
        "green-leaf": {
          50: "#faffe6",
          100: "#f3fec9",
          200: "#e6fd99",
          300: "#d2f85e",
          400: "#bced2e",
          500: "#9dd30f",
          600: "#79a907",
          700: "#5c800b",
          800: "#4b670f",
          900: "#3e5611",
          950: "#1f3003",
        },
        saratoga: {
          50: "#fffae5",
          100: "#fff6c6",
          200: "#fff194",
          300: "#ffef57",
          400: "#f6e525",
          500: "#ddcf05",
          600: "#b1aa00",
          700: "#868305",
          800: "#69670b",
          900: "#58580e",
          950: "#313201",
        },
        claret: {
          50: "#fff0f2",
          100: "#ffe2e7",
          200: "#ffcad6",
          300: "#ff9eb4",
          400: "#ff688b",
          500: "#ff3368",
          600: "#ee1055",
          700: "#ca0647",
          800: "#a80943",
          900: "#8e0b3f",
          950: "#51001e",
        },
        jade: {
          50: "#ebfef3",
          100: "#cffce0",
          200: "#a3f7c7",
          300: "#67eeaa",
          400: "#2bdc89",
          500: "#06b167",
          600: "#009e5c",
          700: "#007e4d",
          800: "#01643e",
          900: "#025235",
          950: "#002e1e",
        },
        "blaze-orange": {
          50: "#fff8ec",
          100: "#fff0d3",
          200: "#ffdca5",
          300: "#ffc26d",
          400: "#ff9d32",
          500: "#ff7f0a",
          600: "#f06000",
          700: "#cc4902",
          800: "#a1390b",
          900: "#82310c",
          950: "#461604",
        },
        "electric-violet": {
          50: "#f4f0ff",
          100: "#ebe4ff",
          200: "#d9cdff",
          300: "#bfa6ff",
          400: "#a173ff",
          500: "#873bff",
          600: "#7c14ff",
          700: "#6800f0",
          800: "#5d01d6",
          900: "#4d03af",
          950: "#2e0077",
        },
        rose: {
          50: "#ffeff3",
          100: "#ffe0e9",
          200: "#ffc6d9",
          300: "#ff97ba",
          400: "#ff5d96",
          500: "#ff2477",
          600: "#ff0f73",
          700: "#d70059",
          800: "#b40054",
          900: "#99024e",
          950: "#570025",
        },
        scarlet: {
          50: "#fff4ec",
          100: "#ffe6d3",
          200: "#ffc9a5",
          300: "#ffa36d",
          400: "#ff7132",
          500: "#ff4a0a",
          600: "#fa2e00",
          700: "#cc1d02",
          800: "#a1180b",
          900: "#82170c",
          950: "#460804",
        },
        "blue-gem": {
          50: "#f2f0ff",
          100: "#e8e4ff",
          200: "#d2ccff",
          300: "#b2a4ff",
          400: "#8d70ff",
          500: "#6b37ff",
          600: "#5b0fff",
          700: "#4d00ff",
          800: "#3f00da",
          900: "#2e0099",
          950: "#1d007a",
        },
        "kenyan-copper": {
          50: "#fff6eb",
          100: "#ffebd0",
          200: "#ffd3a1",
          300: "#ffb165",
          400: "#ff8427",
          500: "#ff6100",
          600: "#ff4200",
          700: "#d62d00",
          800: "#a92403",
          900: "#7f1e06",
          950: "#4a0c00",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#000",
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "#121212", // or DEFAULT
            foreground: "#ECEDEE",
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "transparent",
            },
          },
          // ... rest of the colors
        },
      },
    }),
  ],
};
