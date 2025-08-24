import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            copyDtsFiles: true,
            outDir: "dist/types", // ✅ correct option
            include: ["src"],
            tsconfigPath: './tsconfig.app.json'
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    build: {
        lib: {
            entry: "src/index.ts",
            name: "LexicalEditor",
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
                entryFileNames: `bundle/[name].[format].js`,
                chunkFileNames: `bundle/chunks/[name]-[hash].js`,
                assetFileNames: `bundle/assets/[name]-[hash][extname]`,
            },
        },
    },
});
