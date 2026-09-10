# Successor checkpoint

Updated: 2026-09-10

## Current state

- Site: `https://codeworkslabs.dev/`
- Repository: `https://github.com/CodeWorksLabs/codeworkslabs.dev`
- Branch: `main`
- Cloudflare Worker configuration: `codeworkslabs-dev`
- Repository establishment is a source-control correction; it does not deploy or alter the live Worker.
- The site source is self-contained within this repository root.

## Verification contract

Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run`. After building, also run `npm run verify:image-rights`.

## Boundaries

The hero artwork is not open licensed. Preserve `IMAGE_RIGHTS.md`, the authoritative source/public originals, and rights-aware Astro image service.

Treat the checked-out \`main\` commit as the exact source identity. Verify it with
\`git rev-parse HEAD\` and confirm it matches \`origin/main\` before release work.
