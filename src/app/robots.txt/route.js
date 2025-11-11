export async function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: https://www.nex-v.com/sitemap.xml
`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}