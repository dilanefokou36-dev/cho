import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f3f3f3",
        ink: "#343434",
        heading: "#000000",
        accent: "#ff6944",
        "accent-hover": "#e55a38",
        bordeaux: "#6b2c3e",
        forest: "#2d4a3e",
        cream: "#faf8f5",
      },
      fontFamily: {
        sans: ["Poppins", "system-ui", "sans-serif"],
        serif: ["Literata", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 2px 24px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
