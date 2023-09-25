import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["vitest-localstorage-mock", "vitest-setup"],
    mockReset: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      reporter: ["lcov"],
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
