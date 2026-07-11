import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          950: "#07080a",
          900: "#0c0d10",
          800: "#121316",
          700: "#1a1c20",
        },
        platinum: {
          200: "#eef0f2",
          300: "#d7dade",
          400: "#aab0b8",
          500: "#7a818a",
        },
        gold: {
          300: "#e8cf94",
          400: "#d9b968",
          500: "#c9a24b",
          600: "#a3823a",
        },
        signal: {
          400: "#4dd8e8",
          500: "#22b8cc",
          600: "#1a94a6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        container: "1360px",
      },
      boxShadow: {
        premium: "0 30px 60px -20px rgba(0,0,0,0.65)",
        glow: "0 8px 24px -8px rgba(201,162,75,0.5)",
        "card-hover":
          "0 24px 48px -18px rgba(0,0,0,0.55), 0 0 32px -6px rgba(34,184,204,0.28)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
