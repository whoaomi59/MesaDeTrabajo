import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 🔥 Permite acceder desde la IP local
    port: 5173, // Puedes cambiarlo si necesitas
  },
});
