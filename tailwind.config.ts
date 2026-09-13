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
          950: "#1A1A24",
          900: "#23232E",
          850: "#2C2C38",
          800: "#373744",
          700: "#484857",
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
          300: "#E6E9F0",
          400: "#C2C8D4",
          500: "#98A0AF",
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
        volt: "0 0 0 1px rgba(255,85,0,0.4), 0 20px 60px -10px rgba(255,85,0,0.6)",
        "volt-sm": "0 12px 34px -10px rgba(255,85,0,0.7)",
        panel: "0 28px 80px -34px rgba(0,0,0,0.85)",
        /* tvrda ivica koja daje "mašinski" utisak karticama */
        hard: "6px 6px 0 0 rgba(255,85,0,0.22)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)",
        "hazard-stripes":
          "repeating-linear-gradient(135deg, rgba(255,85,0,0.55) 0 10px, transparent 10px 20px)",
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
