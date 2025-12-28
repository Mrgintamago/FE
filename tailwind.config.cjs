/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#991b1b", // Màu đỏ đậm (red-800)
        dark: "#000000", // Màu đen
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
