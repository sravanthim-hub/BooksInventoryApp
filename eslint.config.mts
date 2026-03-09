import playwright from "eslint-plugin-playwright";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["tests/**/*.ts"],
    plugins: {
      playwright,
    },
    rules: {
      "playwright/no-focused-test": "error",
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  tseslint.configs.recommended,
  {
    ignores: ["node_modules/**", "playwright-report", "test-results"],
  },
]);
