const { resolve } = require("path");
console.log(process.cwd());
module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      files: ["packages/frontend/**/*.{ts,tsx}"],
      extends: ["next/core-web-vitals"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/ban-ts-comment": "off"
      }
    },
    {
      files: ["packages/backend/**/*.{ts,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: resolve(process.cwd(), "packages/backend"),
        sourceType: "module",
      },
      plugins: ["@typescript-eslint/eslint-plugin"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
      ],
      rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
};
