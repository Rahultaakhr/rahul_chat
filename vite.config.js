import dotenv from "dotenv";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Load environment variables from .env
dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
