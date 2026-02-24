import { defineConfig } from "vite";

export default defineConfig({
  // Use relative asset paths so deploys also work when proxied under subpaths.
  base: "./",
});
