import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest-setup.ts",
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});