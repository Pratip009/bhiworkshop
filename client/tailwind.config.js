/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightRed: "#fe4a55",
        bronze: {
          100: "#cd7f32",
          300: "#b76e41",
          500: "#8c4e22",
        },
      },
      fontFamily: {
        play: ['"Play"', 'sans-serif'],
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'bounce-slow': 'bounce-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
