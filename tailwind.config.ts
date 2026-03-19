import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--joy-palette-primary-solidBg)',
          light: 'var(--joy-palette-primary-lightBg)',
          dark: 'var(--joy-palette-primary-darkBg)',
        },
        secondary: {
          DEFAULT: 'var(--joy-palette-neutral-solidBg)',
          light: 'var(--joy-palette-neutral-lightBg)',
          dark: 'var(--joy-palette-neutral-darkBg)',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
