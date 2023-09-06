import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{html,tsx}",
    "./src/app/**/*.tsx",
    "./src/presentation/**/*.tsx",
  ],
  theme: {
    extend: {
      borderWidth: {
        40: "2.5rem",
        20: "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
