import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        ink: {
          950: "#09090B",
          900: "#0C0C0F",
          850: "#121215",
          800: "#18181C",
          700: "#232329",
        },
        volt: {
          DEFAULT: "#FF5500",
          50: "#FFF3EB",
          200: "#FFC7A3",
          400: "#FF8A3D",
          500: "#FF6B00",
          600: "#FF5500",
          700: "#E04600",
        },
        steel: {
          300: "#C7CBD4",
          400: "#9BA1AD",
          500: "#767C88",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        volt: "0 0 0 1px rgba(255,85,0,0.25), 0 18px 50px -12px rgba(255,85,0,0.45)",
        "volt-sm": "0 10px 30px -12px rgba(255,85,0,0.55)",
        panel: "0 24px 70px -30px rgba(0,0,0,0.9)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.9" },
          "70%": { transform: "scale(2.1)", opacity: "0" },
          "100%": { transform: "scale(2.1)", opacity: "0" },
        },
        "sheen": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        sheen: "sheen 1.1s ease-in-out",
        "float-slow": "float-slow 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        "accordion-down": "accordion-down 0.3s cubic-bezier(0.22,1,0.36,1)",
        "accordion-up": "accordion-up 0.25s cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
