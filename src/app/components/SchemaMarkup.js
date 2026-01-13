// 📍 Schema Markup JSON-LD para Google Rich Results
// Implementación avanzada de microdatos estructurados

import Script from 'next/script';

/**
 * Schema Organization - Datos de empresa para resultados enriquecidos
 */
export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nex-v",
    "alternateName": "Nex-v Digital Solutions",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com"}/images/logo.png`,
    "sameAs": [
      // Añade tus redes sociales aquí
      // "https://www.linkedin.com/company/nex-v",
      // "https://twitter.com/nex_v",
      // "https://www.instagram.com/nex_v",
      // "https://www.facebook.com/nexv.digital"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+34 912 345 678",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Ejemplo 123",
      "addressLocality": "Madrid",
      "postalCode": "28001",
      "addressCountry": "ES"
    },
    "email": "contacto@nex-v.com",
    "description": "Agencia digital especializada en desarrollo web, marketing digital y soporte IT para pymes",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "Nombre del Fundador"
    }
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationData),
      }}
    />
  );
}

/**
 * Schema WebSite - Para resultados de búsqueda mejorados
 */
export function WebSiteSchema() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nex-v | Agencia Digital Profesional",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com",
    "description": "Soluciones digitales completas para pequeñas y medianas empresas",
    "publisher": {
      "@type": "Organization",
      "name": "Nex-v"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com"}/buscar?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteData),
      }}
    />
  );
}

/**
 * Schema LocalBusiness - Si tienes presencia física
 */
export function LocalBusinessSchema() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nex-v",
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com"}/images/local-business.jpg`,
    "@id": process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com",
    "telephone": "+34 912 345 678",
    "priceRange": "€€",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Ejemplo 123",
      "addressLocality": "Madrid",
      "postalCode": "28001",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.4168,
      "longitude": -3.7038
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      // Tus redes sociales
    ]
  };

  return (
    <Script
      id="localbusiness-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessData),
      }}
    />
  );
}

/**
 * Schema Article - Para blog/posts (ejemplo base)
 */
export function ArticleSchema({ article }) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": {
      "@type": "Person",
      "name": article.author || "Equipo Nex-v"
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "image": article.image ? `${process.env.NEXT_PUBLIC_SITE_URL}${article.image}` : undefined,
    "publisher": {
      "@type": "Organization",
      "name": "Nex-v",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com"}/images/logo.png`
      }
    }
  };

  return (
    <Script
      id={`article-schema-${article.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleData),
      }}
    />
  );
}

/**
 * Schema BreadcrumbList - Para navegación mejorada
 */
export function BreadcrumbSchema({ breadcrumbs }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData),
      }}
    />
  );
}

/**
 * Schema FAQPage - Para preguntas frecuentes
 */
export function FAQSchema({ faqs }) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqData),
      }}
    />
  );
}

/**
 * Componente principal que incluye todos los schemas básicos
 */
export default function SchemaMarkup() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      {/* <LocalBusinessSchema /> */}
    </>
  );
}