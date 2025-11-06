import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        window: "readonly",
        document: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        fetch: "readonly",
        Request: "readonly",
        Response: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        IntersectionObserver: "readonly",
        HTMLInputElement: "readonly",
        HTMLTextAreaElement: "readonly",
        HTMLElement: "readonly",
        HTMLAnchorElement: "readonly",
        MouseEvent: "readonly",
        KeyboardEvent: "readonly",
        ReadableStream: "readonly",
        TextDecoder: "readonly",
        TextEncoder: "readonly",
        atob: "readonly",
        Blob: "readonly",
        FormData: "readonly",
        AbortController: "readonly",
        MessageChannel: "readonly",
        performance: "readonly",
        location: "readonly",
        Element: "readonly",
        getComputedStyle: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        React: "readonly",
        HTMLDivElement: "readonly",
        HTMLButtonElement: "readonly",
        requestAnimationFrame: "readonly",
        WheelEvent: "readonly",
        NodeJS: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  nextPlugin.configs["core-web-vitals"],
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      ".vercel/**",
      ".sanity/**",
    ],
  },
];
