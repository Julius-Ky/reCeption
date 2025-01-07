import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
    "process.env": {},
  },
  server: {
    port: 7081, // Set the port to 7081
  },
});
