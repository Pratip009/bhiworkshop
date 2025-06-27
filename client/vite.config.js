import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

export default defineConfig({
  base: "/", // crucial for SPA routing to work correctly after deployment
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          icons: ["react-icons/fa", "react-icons/sl"],
          motion: ["framer-motion"],
          quill: ["react-quill"],
          clerk: ["@clerk/clerk-react"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
