const pages = [
  "https://codeworkslabs.dev/",
  "https://codeworkslabs.dev/products/",
  "https://codeworkslabs.dev/products/brand-navigation/",
  "https://codeworkslabs.dev/products/discussionbridge/",
  "https://codeworkslabs.dev/platforms/",
  "https://codeworkslabs.dev/blog/",
  "https://codeworkslabs.dev/blog/demonstrate-the-claim/",
  "https://codeworkslabs.dev/security/",
  "https://codeworkslabs.dev/support/",
  "https://codeworkslabs.dev/hosting/",
  "https://codeworkslabs.dev/hosting/partners/",
];

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
