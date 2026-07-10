import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A090D",
        "bg-soft": "#12101A",
        card: "#171420",
        "card-border": "rgba(255,255,255,0.10)",
        text: "#F2F1EC",
        muted: "#A8A3B3",
        orange: "#FF8B1E",
        magenta: "#ED5FA4",
        purple: "#A45CEB",
        green: "#35B586",
        line: "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        ko: ["var(--font-ko)", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "390px",
      },
      animation: {
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "line-move": "lineMove 8s linear infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,139,30,0.4)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(255,139,30,0.6)" },
        },
        lineMove: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;