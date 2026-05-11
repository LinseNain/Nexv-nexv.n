const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com";

const pages = [
  { url: BASE_URL,                   changeFrequency: "weekly",   priority: 1.0 },
  { url: `${BASE_URL}/equipo`,       changeFrequency: "monthly",  priority: 0.8 },
];

export async function GET() {
  const lastmod = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(({ url, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
