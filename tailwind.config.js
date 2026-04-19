/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0a",
        surface: "#111111",
        elevated: "#1a1a1a",
        border: "#2a2a2a",
        accent: "#FF4500",
        accentHover: "#FF6534",
        trust: "#46D160",
        caution: "#FFB000",
        danger: "#FF585B",
        "text-primary": "#FFFFFF",
        "text-secondary": "#D7DADC",
        "text-muted": "#818384",
      },
      fontFamily: {
        display: ["Lora", "Georgia", "serif"],
        body: ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 0 #2a2a2a",
        "card-hover": "0 0 0 1px #FF4500",
        glow: "0 0 20px rgba(255,69,0,0.3)",
      },
    },
  },
  plugins: [],
};