import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
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
      // externalize react & react-dom so they aren’t bundled
      external: ["react", "react-dom"],
      output: {
        dir: "dist",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
        entryFileNames: `bundle/[name].[format].js`, // custom file path
        chunkFileNames: `bundle/chunks/[name]-[hash].js`,
        assetFileNames: `bundle/assets/[name]-[hash][extname]`,
      },
    },
  },
});
