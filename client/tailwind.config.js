/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightRed: "#fe4a55",
        bronze: {
          100: "#cd7f32",
          300: "#b76e41", // You can choose your desired shades of bronze here
          500: "#8c4e22",
        },
      },
      fontFamily: {
        dmserif: ["DM Serif Text", "serif"],
      },
    },
  },
  plugins: [],
};
