import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // The only SVG here is the hand-generated favicon (~1.3KB), and running
      // it through the plugin would pull in svgo for no benefit.
      exclude: /\.svg$/,
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      jpg: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 70,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Variables and mixins are available in every .scss file without an
        // explicit @use. Keep _abstracts.scss output-free or it duplicates.
        additionalData: `@use "@/styles/abstracts" as *;
`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          icons: ["react-icons"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: "esbuild",
    target: "es2020",
    sourcemap: false,
  },
  server: {
    open: true,
    port: 3000,
  },
  preview: {
    port: 3001,
  },
});
