import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "soft-white": "#F6F4EF",
        ink: "#141414",
        lime: "#C6FF3E",
        peach: "#FF9E7A",
        berry: "#6E42E8",
        "electric-blue": "#255CFF",
        chrome: "#C9CDD2",
      },
      fontFamily: {
        sans: ["Manrope", "var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(3.5rem, 4.7vw, 5.4rem)", { lineHeight: "0.9", letterSpacing: "-0.06em" }],
      },
    },
  },
  plugins: [],
};

export default config;
