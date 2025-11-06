// ESLint v9 flat config
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  // Ignorar directorios de build y dependencias
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"],
  },

  // Configuración base recomendada para JS
  {
    ...js.configs.recommended,
    files: ["**/*.{js,cjs,mjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module",
    },
  },

  // Configuración para TypeScript y TSX
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: false,
      },
      globals: {
        // 🌐 Globals del entorno navegador / DOM
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly",
        CustomEvent: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        ResizeObserver: "readonly",
        HTMLInputElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLCanvasElement: "readonly",
        CanvasRenderingContext2D: "readonly",
        SpeechSynthesisVoice: "readonly",
        SpeechSynthesisUtterance: "readonly",
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Desactiva reglas conflictivas
      "no-undef": "off",
      "no-unused-vars": "off",

      // Activa la versión TypeScript de la regla
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },

  // Overrides para archivos de test y setup
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "src/setupTests.ts"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        jest: "readonly",
        vi: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    rules: {
      "no-undef": "off",
    },
  },

  // Overrides para CommonJS
  {
    files: ["postcss.config.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
        exports: "readonly",
      },
    },
  },

  // Overrides para ESM
  {
    files: ["eslint.config.js", "jest.config.js"],
    languageOptions: {
      sourceType: "module",
    },
  },
];
