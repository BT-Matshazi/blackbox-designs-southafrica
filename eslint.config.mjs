import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", {
    "@typescript-eslint/no-unused-vars": "off", // Disable TypeScript unused vars rule
    "no-unused-vars": "off", // Disable base ESLint unused vars rule
    "@typescript-eslint/no-explicit-any": "off",
    "@next/next/no-img-element": "off",
  }),
];

export default eslintConfig;
