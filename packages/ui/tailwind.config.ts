import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/web/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e63946",
        surface: "#1d3557",
        secondary: "#457b9d",
        accent: "#a8dadc",
        text: "#f1faee",
        background: "#050814", // Deep space black
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      transitionDuration: {
        fast: "150ms",
        medium: "300ms",
        hero: "1000ms",
        ambient: "15000ms",
      },
      backgroundImage: {
        'aurora': "linear-gradient(to right, #1d3557, #457b9d, #1d3557)",
        'portal': "radial-gradient(circle at center, rgba(168, 218, 220, 0.4), transparent 60%)"
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slow-pan': 'slow-pan 30s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
