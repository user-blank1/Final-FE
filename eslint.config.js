import eslintPluginReact from "eslint-plugin-react";
import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import parserTypeScript from "@typescript-eslint/parser";

export default [
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: parserTypeScript,
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                browser: true,
                es2021: true,
            },
        },
        plugins: {
            react: eslintPluginReact,
            "@typescript-eslint": eslintPluginTypeScript,
            "jsx-a11y": eslintPluginJsxA11y,
        },
        rules: {
            "no-unused-vars": "warn",
            "react/react-in-jsx-scope": "off",
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
    {
        files: ["*.config.js", "*.config.cjs"],
        languageOptions: {
            env: { node: true },
        },
    },
];
