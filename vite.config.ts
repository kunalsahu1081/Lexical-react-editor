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
            outDir: "dist/types",
            include: ["src/index.ts", "src/features/editor/editor.tsx", "src/features/Toolbar"],
            tsconfigPath: './tsconfig.app.json',
            rollupTypes: true,
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
            external: ["react", "react-dom", "lexical", "@lexical/react", "@lexical/list", "@lexical/selection"],
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
