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
        bg: '#0a090d',
        surface: '#111018',
        accent: '#9b6dff',
        gold: '#f0c060',
        pink: '#e87fa0',
        orange: '#f5935a',
        teal: '#5abfb8',
        text: '#e8e6f0',
        muted: '#8a8899',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-instrument-serif)'],
      },
    },
  },
  plugins: [],
};
export default config;
