import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@pages": path.resolve(__dirname, "src/Pages"),
            "@components": path.resolve(__dirname, "src/Components"),
            "@reusables": path.resolve(__dirname, "src/Reusables"),
            "@assets": path.resolve(__dirname, "src/assets"),
        },
    },
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
