import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "var(--bg)",
          card: "var(--bg-card)",
          hover: "var(--bg-hover)",
          dark: "var(--bg-dark)",
          deeper: "var(--bg-deeper)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          dim: "var(--accent-dim)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          faint: "var(--text-faint)",
        },
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Fraunces", "Cormorant Garamond", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
