/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Impide que la web sea embebida en iframes de otros dominios (clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Impide que el navegador ejecute archivos con MIME type incorrecto
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Controla qué referrer se envía en peticiones cross-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Deniega acceso a APIs de hardware no necesarias
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          // Activa prefetch DNS para mejorar rendimiento
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
