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
        /* podloga nije siva nego mornarsko plava — boja brenda se provlači
           kroz celu stranu, a ne samo kroz akcente */
        ink: {
          950: "#111A2E",
          900: "#17223C",
          850: "#1E2B4B",
          800: "#26355C",
          700: "#374878",
        },
        /* "volt" je zadržan kao ime akcenta, ali je sada tamnoplava iz logotipa */
        /* podloga je sada plava, pa akcenat mora da bude svetliji od nje da
           bi dugmad i oznake i dalje iskakale */
        volt: {
          DEFAULT: "#4A66CC",
          50: "#EDF1FB",
          200: "#B8C5F0",
          400: "#7D95E4",
          500: "#5B78D6",
          600: "#4A66CC",
          700: "#3B50A1",
        },
        steel: {
          300: "#E4EAF7",
          400: "#BFC9E4",
          500: "#94A2C4",
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
        volt: "0 0 0 1px rgba(110,135,214,0.45), 0 20px 60px -10px rgba(59,80,161,0.75)",
        "volt-sm": "0 12px 34px -10px rgba(59,80,161,0.85)",
        panel: "0 28px 80px -34px rgba(0,0,0,0.85)",
        /* tvrda ivica koja daje "mašinski" utisak karticama */
        hard: "6px 6px 0 0 rgba(59,80,161,0.3)",
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)",
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
