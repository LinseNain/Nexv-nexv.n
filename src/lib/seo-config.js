// 🛠️ Configuración SEO centralizada
// Todas las configuraciones importantes en un solo lugar

// 🌐 URLs y dominios
export const SEO_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://nex-v.com",
  STAGING_URL: process.env.NEXT_PUBLIC_STAGING_URL || "https://staging.nex-v.com",
  
  // 📧 Contacto
  CONTACT_EMAIL: "contacto@nex-v.com",
  CONTACT_PHONE: "+34 912 345 678",
  
  // 📍 Dirección (si aplica)
  BUSINESS_ADDRESS: {
    street: "Calle Ejemplo 123",
    city: "Madrid",
    postalCode: "28001",
    country: "España"
  },
  
  // 🤖 Verificación de Search Console
  VERIFICATION_CODES: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    bing: process.env.BING_SITE_VERIFICATION || "",
    yandex: process.env.YANDEX_SITE_VERIFICATION || ""
  }
};

// 📊 Métricas objetivo SEO
export const SEO_METRICS = {
  // Longitudes óptimas
  TITLE_MAX_LENGTH: 60,
  DESCRIPTION_MAX_LENGTH: 160,
  URL_MAX_LENGTH: 75,
  
  // Velocidad
  MAX_PAGE_LOAD_TIME: 3000, // ms
  MAX_LCP_TIME: 2500, // ms (Largest Contentful Paint)
  MAX_FID_TIME: 100, // ms (First Input Delay)
  MAX_CLS_VALUE: 0.1, // Cumulative Layout Shift
  
  // Contenido
  MIN_CONTENT_WORDS: 300,
  MIN_INTERNAL_LINKS: 3,
  IMAGES_ALT_RATIO: 1.0, // 100% de imágenes con alt
  
  // Mobile
  MOBILE_FRIENDLY_SCORE: 90,
  RESPONSIVE_DESIGN: true
};

// 🔍 Keywords estratégicas por categoría
export const KEYWORDS_STRATEGY = {
  primary: [
    "marketing digital Madrid",
    "desarrollo web profesional",
    "agencia digital España"
  ],
  secondary: [
    "SEO posicionamiento web",
    "páginas web pymes",
    "digitalización negocio"
  ],
  longTail: [
    "agencia marketing digital Madrid precio",
    "desarrollo web responsive para empresas",
    "soporte IT para pequeñas empresas Madrid"
  ],
  local: [
    "marketing digital Madrid centro",
    "agencia digital Madrid barajas",
    "desarrollo web Madrid retiro"
  ]
};

// 📈 Competidores y benchmarking
export const COMPETITOR_ANALYSIS = {
  mainCompetitors: [
    "https://competidor1.com",
    "https://competidor2.es",
    "https://competidor3.es"
  ],
  benchmarkMetrics: {
    avgPageLoad: 2500,
    avgMobileScore: 85,
    avgDesktopScore: 90
  }
};

// 🎯 Objetivos SEO trimestrales
export const SEO_GOALS = {
  Q1: {
    organicTraffic: 5000,
    keywordRankings: 50,
    conversionRate: 2.5,
    backlinks: 25
  },
  Q2: {
    organicTraffic: 7500,
    keywordRankings: 75,
    conversionRate: 3.0,
    backlinks: 40
  }
};

// 🚨 Alertas y monitoreo
export const SEO_ALERTS = {
  criticalThresholds: {
    trafficDropPercent: 20,
    rankingDropPositions: 5,
    crawlErrorsIncrease: 10,
    pageSpeedRegression: 500 // ms
  },
  monitoringSchedule: {
    daily: ['traffic', 'crawl_errors'],
    weekly: ['rankings', 'backlinks', 'page_speed'],
    monthly: ['content_audit', 'technical_seo']
  }
};

// 📋 Checklist SEO por tipo de página
export const SEO_CHECKLISTS = {
  homepage: [
    'Título optimizado (< 60 caracteres)',
    'Meta descripción persuasiva (< 160 caracteres)',
    'H1 único y descriptivo',
    'Contenido de calidad (> 1000 palabras)',
    'Enlaces internos estratégicos',
    'Imágenes optimizadas con alt',
    'Velocidad de carga < 3 segundos',
    'Responsive design',
    'Schema markup implementado'
  ],
  servicePage: [
    'Keyword en título y URL',
    'Descripción clara del servicio',
    'Beneficios destacados',
    'Call-to-action claro',
    'Casos de éxito/testimonios',
    'Preguntas frecuentes',
    'Enlaces relacionados'
  ],
  blogPost: [
    'Título con keyword principal',
    'Introducción atractiva',
    'Estructura con headings',
    'Imágenes relevantes',
    'Enlaces internos',
    'Compartir en redes',
    'Optimización de longitud (> 1500 palabras)'
  ]
};

// 📊 Herramientas de análisis recomendadas
export const SEO_TOOLS = {
  free: [
    'Google Search Console',
    'Google Analytics',
    'Google PageSpeed Insights',
    'Google Mobile-Friendly Test'
  ],
  paid: [
    'SEMrush',
    'Ahrefs',
    'Moz Pro',
    'Screaming Frog SEO Spider'
  ],
  technical: [
    'Lighthouse',
    'GTmetrix',
    'WebPageTest',
    'Chrome DevTools'
  ]
};

// 📈 Reportes automáticos
export const SEO_REPORTS = {
  frequency: {
    daily: ['traffic_summary', 'crawl_status'],
    weekly: ['ranking_report', 'content_performance'],
    monthly: ['comprehensive_audit', 'competitor_analysis']
  },
  metrics: [
    'Organic Traffic',
    'Keyword Rankings',
    'Click-Through Rate',
    'Bounce Rate',
    'Average Session Duration',
    'Pages per Session',
    'Core Web Vitals Scores'
  ]
};

export default SEO_CONFIG;