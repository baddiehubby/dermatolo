import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#070708",
          50: "#151518",
          100: "#101012",
          200: "#0c0c0e",
        },
        gold: {
          DEFAULT: "#c9a227",
          dim: "#8a7018",
          light: "#e8d48b",
          pale: "#f4ead0",
        },
        mist: "#cfc8b8",
        ivory: "#f3eee4",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
