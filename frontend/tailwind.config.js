/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Inter"', "sans-serif"],
    },
    fontWeight: {
      light: "300",
      normal: "400",
      bold: "700",
    },
    borderOpacity: ["active"],
    container: {
      center: true,
      padding: "0.3rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#fafafa",
        secondary: "#7d7d7d",
        secondaryForeground: "#ececec",
        primaryColor: "#6d28d9",
        tPrimary: "#121212",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
