import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./globals.css";

// 🚀 SEO AVANZADO PARA GOOGLE SEARCH CONSOLE
// Meta tags optimizadas para posicionamiento y rastreo

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com";

export const metadata = {
  // 🏷️ Títulos optimizados para CTR
  title: {
    template: "%s | Nex-v - Agencia Digital Profesional",
    default: "Nex-v | Soluciones Digitales para Empresas - Marketing Web & IT",
  },
  
  // 📝 Descripción rica en keywords y llamada a acción
  description:
    "Agencia digital especializada en desarrollo web, marketing digital y soporte IT para pymes. Creamos presencia online profesional que convierte visitantes en clientes. ✅ Sin tecnicismos innecesarios ✅ Resultados medibles ✅ Soporte continuo",
  
  // 🔑 Keywords estratégicas (aunque Google las ignora, ayudan a otros motores)
  keywords: [
    "marketing digital Madrid",
    "desarrollo web profesional",
    "agencia digital España",
    "soporte IT para empresas",
    "SEO posicionamiento web",
    "páginas web pymes",
    "digitalización negocio",
    "marketing online efectivo",
    "desarrollo web responsive",
    "consultoría digital"
  ],
  
  // 👥 Información de autoría
  authors: [{ name: "Nex-v", url: BASE_URL }],
  creator: "Nex-v Digital Solutions",
  publisher: "Nex-v",
  
  // 🌐 Configuración multiregional
  alternates: {
    canonical: BASE_URL,
    languages: {
      'es-ES': BASE_URL,
      'es': BASE_URL,
    },
  },
  
  // 🤖 Directivas para robots mejoradas
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      "indexifembedded": true,
      "notranslate": false,
    },
  },
  
  // 🔍 Verificación de propiedad de Google Search Console
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "", // Añade tu código de verificación
  },
  
  // 📱 Open Graph mejorado para redes sociales
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["es_LA", "es_MX"],
    url: BASE_URL,
    siteName: "Nex-v | Agencia Digital Profesional",
    title: "Nex-v | Soluciones Digitales para Empresas - Marketing Web & IT",
    description: "Transformamos tu negocio digitalmente. Desarrollo web, marketing digital y soporte IT especializado para pymes. Presencia online profesional que convierte.",
    emails: ["contacto@nex-v.com"], // Si tienes email corporativo
    phoneNumbers: ["+34 912 345 678"], // Si tienes teléfono
    images: [
      {
        url: `${BASE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nex-v - Transformamos tu negocio digitalmente",
        type: "image/jpeg",
      },
      {
        url: `${BASE_URL}/images/logo-512x512.jpg`,
        width: 512,
        height: 512,
        alt: "Logo Nex-v - Agencia Digital",
        type: "image/jpeg",
      },
    ],
  },
  
  // 🐦 Twitter Cards mejoradas
  twitter: {
    card: "summary_large_image",
    title: "Nex-v | Soluciones Digitales para Empresas",
    description: "Agencia digital especializada en desarrollo web, marketing digital y soporte IT para pymes. Presencia online profesional que convierte visitantes en clientes.",
    creator: "@tu_usuario_twitter", // Cambia por tu usuario real
    site: "@tu_usuario_twitter",
    images: [`${BASE_URL}/images/og-image.jpg`],
  },
  
  // 📍 Schema Markup básico (JSON-LD)
  // Se implementará en componente separado para mejor control
  
  // 📞 Prevención de detección automática de contactos
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // 📊 Metadatos adicionales
  category: "Technology",
  classification: "Business",
  rating: "General",
  referrer: "origin-when-cross-origin",
  
  // 💬 Internacionalización
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Nex-v",
  },
  
  // 📱 Mobile optimizations moved to separate export
  // 🎨 Theme Color moved to separate export
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* <!-- Google Tag Manager --> */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P869C73Q');`
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-P869C73Q"
            height="0" 
            width="0" 
            style={{display:'none', visibility:'hidden'}}
          />
        </noscript>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}

// 📱 Viewport configuration (separate export as required by Next.js 16)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};