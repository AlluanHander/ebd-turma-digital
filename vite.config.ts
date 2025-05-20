import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      isDev ? componentTagger() : null,
    ].filter((plugin): plugin is Exclude<typeof plugin, null> => Boolean(plugin)),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
