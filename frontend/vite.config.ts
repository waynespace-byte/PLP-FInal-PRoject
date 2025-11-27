import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",  // Binds to all interfaces (useful for deployment/dev)
    port: 8080,  // Matches your frontend port; backend is on 8000
  },
  plugins: [
    react(),  // Use SWC for faster builds
    mode === "development" && componentTagger(),  // Dev-only tagging
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Ensures @/ aliases work (e.g., @/services/api)
    },
  },
}));
