import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: {
        "background_scripts.js": resolve(
          __dirname,
          "src/background_scripts/main.js"
        ),
        "popup.js": resolve(__dirname, "src/popup/main.js"),
        "options.js": resolve(__dirname, "src/options/main.js"),
      },
      formats: ["es"],
      fileName: (format, entryName) => entryName,
    },
    minify: false,
    outDir: "build",
  },
});
