// 📈 Sitemap dinámico para SEO avanzado
// Incluye todas las páginas importantes de tu sitio

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com";

// 🗺️ URLs estáticas principales
const staticPages = [
  {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  },
  // Añade más páginas aquí según vayas creando rutas
  // {
  //   url: `${BASE_URL}/servicios`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly',
  //   priority: 0.8,
  // },
];

// 🔄 Función para generar URLs dinámicas desde tu CMS/BD
async function getDynamicPages() {
  // Ejemplo: páginas de blog, servicios, proyectos, etc.
  // const posts = await fetchPostsFromCMS();
  
  return [
    // {
    //   url: `${BASE_URL}/blog/titulo-del-post`,
    //   lastModified: new Date('2024-01-15'),
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // }
  ];
}

export async function GET() {
  const dynamicPages = await getDynamicPages();
  const allPages = [...staticPages, ...dynamicPages];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      return `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600", // Cache 1 hora
    },
  });
}