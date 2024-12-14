import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "build",
    rollupOptions: {
      external: ['@/components/ui/*'],
      onwarn: (warning, warn) => {
        if (
          (warning.loc && (warning.loc.file.includes('src/components/ui') || warning.loc.file.includes('node_modules')))
        ) {
          return;
        }
        warn(warning);
      }
    },
  },
  optimizeDeps: {
    exclude: ['src/components/ui/*', 'node_modules/@types/*'],
  }
})