import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    svgr({
      exportAsDefault: true,

      svgrOptions: {},

      esbuildOptions: {},

      include: "**/*.svg",

      exclude: "",
    }),
  ],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1500,
  },
});
