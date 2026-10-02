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
        bronze: "#8d6a3f",
      },
      fontFamily: {
        naskh: ["var(--font-naskh)", "Noto Naskh Arabic", "serif"],
        nastaliq: ["var(--font-nastaliq)", "Noto Nastaliq Urdu", "serif"],
        latin: ["var(--font-outfit)", "Outfit", "sans-serif"],
      },
      boxShadow: {
        gold: "0 18px 50px rgba(201, 162, 39, 0.18)",
        card: "0 16px 40px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
