/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode based on class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
 // tailwind.config.js

  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        "fade-in": "fade-in 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
    },
  },
  variants: {
    extend: {
      transform: ["hover", "group-hover"],
      translate: ["hover", "group-hover"],
    },
  },

  
  plugins: [],
}
