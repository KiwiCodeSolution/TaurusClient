/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "base-white": "#FFFFFF",
        "base-yellow": "#FFD698",
        "base-orange": "#F7A033",
        "base-brown": "#7E664D",
        "base-back": "#0C0C09",
        "lite-yellow": "#ECDDC6",
        "button-bg": "#181817",
      },
      fontFamily: {},
      backgroundImage: {
        hero: "url('images/hero.jpg')",
      },
      boxShadow: {
        soc: "0 5px 20px -5px rgba(251,221,61,1)",
      },
      keyframes: {
        rotate: {
          "0%": {
            transform: "translateY(0) rotate(0) ",
          },
          "100%": {
            transform: "translateY(40px) rotate(180deg)",
          },
        },
      },
      animation: {
        rotate: "rotate 1s forwards",
      },
    },
  },
  plugins: [],
};
