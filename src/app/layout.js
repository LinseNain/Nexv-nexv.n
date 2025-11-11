import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

// 🔍 SEO: metadata para Google, redes sociales, etc.
export const metadata = {
  title: {
    template: "%s | Nex-v",
    default: "Nex-v | Soluciones Digitales para tu Negocio",
  },
  description:
    "Desarrollo web, marketing digital y soporte IT para pequeñas y medianas empresas. Presencia online profesional, sin tecnicismos innecesarios.",
  keywords: [
    "marketing digital",
    "desarrollo web",
    "agencia digital Madrid",
    "soporte IT",
    "SEO",
    "páginas web profesionales",
  ],
  authors: [{ name: "Nex-v" }],
  creator: "Nex-v",
  publisher: "Nex-v",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://nex-v.com", // ⚠️ ¡Cámbialo por tu dominio cuando lo tengas!
    siteName: "Nex-v",
    title: "Nex-v | Soluciones Digitales",
    description:
      "Ayudamos a empresas a crecer online con soluciones reales y transparentes.",
    images: [
      {
        url: "/og-image.jpg", // Opcional: añade una imagen en /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: "Nex-v - Soluciones Digitales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nex-v | Soluciones Digitales",
    description: "Presencia digital hecha a tu medida.",
    creator: "@tusuario", // Opcional: tu usuario de Twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://nex-v.com", // ⚠️ Igual, cámbialo a tu dominio
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}