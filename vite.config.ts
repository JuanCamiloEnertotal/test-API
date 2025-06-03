import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@sui": path.resolve(__dirname, "src/pages/sui"),
      "@enerbit": path.resolve(__dirname, "src/pages/enerbit"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
});
