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
        40: "40px",
      },
    },
  },
  plugins: [],
};
export default config;
