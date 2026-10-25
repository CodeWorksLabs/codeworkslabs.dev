# Successor checkpoint

Updated: 2026-10-25

## Current state

- Site: `https://codeworkslabs.dev/`
- Repository: `https://github.com/CodeWorksLabs/codeworkslabs.dev`
- Branch: `main`
- Cloudflare Worker configuration: `codeworkslabs-dev`
- Cloudflare Workers Builds is connected to this repository and deploys pushes
  to `main` with `npm run build` followed by `npx wrangler deploy`.
- Non-production branch builds are disabled.
- The site source is self-contained within this repository root.

## Verification contract

Run `npm ci`, `npm audit --omit=dev`, `npm run build`, and `npm run deploy:dry-run`. After building, also run `npm run verify:image-rights`.

## Boundaries

The hero artwork is not open licensed. Preserve `IMAGE_RIGHTS.md`, the authoritative source/public originals, and rights-aware Astro image service.

Treat the checked-out \`main\` commit as the exact source identity. Verify it with
\`git rev-parse HEAD\` and confirm it matches \`origin/main\` before release work.

## 2026-10-25 tune-up candidate

Phil authorized the joint Astro/Cloudflare audit corrections. The current
uncommitted candidate adds page-owned Open Graph and Twitter image metadata to
the homepage, using the already governed CodeWorksLabs systems artwork, plus a
Cloudflare static-assets `_headers` policy for `nosniff`, a bounded referrer
policy, disabled camera/geolocation/microphone permissions, and immutable
caching for fingerprinted `/_astro/` assets.

Fresh local verification against the candidate completed successfully:
`npm ci`; production audit with zero vulnerabilities; 16-page Astro build;
image-rights verification for both authoritative files and all 15 generated
derivatives; and Wrangler 4.123.0 dry run reading 55 files. No source commit,
push, deployment, provider mutation, DNS change, or public-site change has yet
occurred for this candidate. Cloudflare Boss is waiting for an exact reviewed
commit and will then align the existing native build trigger from
`npx wrangler deploy` to the checked-in guarded `npm run deploy` command.
