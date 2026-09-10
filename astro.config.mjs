import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://codeworkslabs.dev",
  image: {
    service: {
      entrypoint: "./src/image-service.mjs",
    },
  },
});
