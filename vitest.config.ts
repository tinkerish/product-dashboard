import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      reporter: ["text", "lcov"],
      all: true,
      exclude: ["node_modules/", "vite.config.ts"],
    },
  },
});
