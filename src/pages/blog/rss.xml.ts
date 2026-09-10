const site = "https://codeworkslabs.dev";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>CodeWorksLabs Blog</title>
    <link>${site}/blog/</link>
    <description>Field notes about building, demonstrating, releasing, and maintaining useful software.</description>
    <language>en-us</language>
    <item>
      <title>Demonstrate the claim. Record the evidence.</title>
      <link>${site}/blog/demonstrate-the-claim/</link>
      <guid isPermaLink="true">${site}/blog/demonstrate-the-claim/</guid>
      <pubDate>Wed, 09 Sep 2026 12:00:00 GMT</pubDate>
      <description>Why documentation, demonstrations, release identity, and recovery belong inside the product—not around its edges.</description>
    </item>
  </channel>
</rss>`;

  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
