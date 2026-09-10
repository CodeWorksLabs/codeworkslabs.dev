# codeworkslabs.dev

The production CodeWorksLabs apex, product catalog, platform pages, support guidance, hosting information, and Astro blog.

Production URL: https://codeworkslabs.dev/
Cloudflare Worker configuration name: `codeworkslabs-dev`

## Local verification

```sh
npm ci
npm audit --omit=dev
npm run build
npm run verify:image-rights
npm run deploy:dry-run
```

The dry run does not publish. Deployment is deliberately separate and requires explicit authorization.

## Rights

Site software and content carry no repository-wide license unless a file explicitly states one. Artwork is not open licensed by publication or repository access. The public ownership wording is `© 2026 CodeWorksLabs, a WebSynergetics property.`
