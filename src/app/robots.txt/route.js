// 🤖 Robots.txt avanzado para control SEO
// Configuración optimizada para Google Search Console

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com";

export async function GET() {
  const robotsTxt = `# 🤖 Directivas para rastreadores web
# Última actualización: ${new Date().toISOString()}

# 🌐 Todos los bots amigables pueden acceder
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/
Disallow: /*?*

# 🚫 Bloquear bots de scraping y IA no autorizados
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Bytespider
Disallow: /

# 📱 Optimización para dispositivos móviles
User-agent: Googlebot-Mobile
Allow: /

# 🖼️ Optimización para imágenes
User-agent: Googlebot-Image
Allow: /

# 🎵 Optimización para videos
User-agent: Googlebot-Video
Allow: /

# 📰 Optimización para noticias
User-agent: Googlebot-News
Allow: /

# 🔍 Sitemap principal
Sitemap: ${BASE_URL}/sitemap.xml

# 📊 Estadísticas de rastreo
# Puedes añadir aquí directivas específicas si lo necesitas
# Ejemplo: Crawl-delay: 10
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400", // Cache 24 horas
    },
  });
}