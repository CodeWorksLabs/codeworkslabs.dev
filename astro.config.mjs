import analytics from '@codeworkslabs/astro-analytics';
import { analyticsOptions } from './analytics.config.mjs';
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://codeworkslabs.dev",
  integrations: [analytics(analyticsOptions)],
  image: {
    service: {
      entrypoint: "./src/image-service.mjs",
    },
  },
});
