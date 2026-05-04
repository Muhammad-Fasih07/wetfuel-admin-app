import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#ce1c1a",
          redHover: "#bf2524",
          redActive: "#cd171a",
          black: "#2b2b2b",
          blackDeep: "#17140b",
          charcoal: "#282a2c",
          taupe: "#887b6a",
          lightGray: "#f5f5f5",
          softPink: "#f0797a",
          rose: "#ca5f68",
          white: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        "red-glow": "0 0 20px rgba(206,28,26,0.25)",
        "red-glow-lg": "0 0 40px rgba(206,28,26,0.35)",
        card: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #cd171a, #ce1c1a, #bf2524)",
        "gradient-primary-hover": "linear-gradient(135deg, #bf2524, #a61e1c, #8b1816)",
        "gradient-card": "linear-gradient(145deg, #ffffff, #fbfaf9, #f7f6f4)",
        "gradient-auth": "radial-gradient(ellipse at center, #232324 0%, #1c1c1d 50%, #1a1a1b 100%)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        shimmer: "shimmer 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glow: {
          from: { boxShadow: "0 0 20px rgba(206,28,26,0.25)" },
          to: { boxShadow: "0 0 40px rgba(206,28,26,0.45)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
