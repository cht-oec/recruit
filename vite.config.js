import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "/recruit/",
  server: {
    host: "10.16.200.248",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/_variables.scss";`,
      },
    },
  },
});
