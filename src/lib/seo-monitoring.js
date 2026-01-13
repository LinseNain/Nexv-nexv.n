'use client';

// 📊 Hook de monitoreo SEO para Google Search Console
// Trackeo avanzado de métricas y diagnóstico de problemas

import { useEffect } from 'react';

/**
 * Hook para monitorear y diagnosticar SEO en tiempo real
 * @param {Object} options - Opciones de configuración
 * @param {string} options.pageTitle - Título de la página actual
 * @param {string} options.pagePath - Ruta de la página
 * @param {Array} options.keywords - Keywords objetivo de la página
 */
export function useSEOMonitoring({ pageTitle, pagePath, keywords = [] }) {
  
  // 📈 Monitoreo de rendimiento Core Web Vitals
  useEffect(() => {
    // Solo en cliente
    if (typeof window !== 'undefined') {
      // Reportar métricas a Google Analytics/Search Console
      sendCoreWebVitals();
      
      // Monitorear título y meta descripción
      monitorMetaTags(pageTitle, pagePath);
      
      // Verificar estructura de headings
      analyzeHeadingsStructure();
      
      // Monitorear velocidad de carga
      monitorPageSpeed();
    }
  }, [pageTitle, pagePath]);

  // 🔍 Diagnóstico automatizado de problemas SEO
  useEffect(() => {
    if (typeof window !== 'undefined') {
      diagnoseSEOIssues(keywords);
    }
  }, [keywords]);

  return {
    // Funciones públicas para uso manual
    runFullSEOAudit,
    getSEOScore,
    getDiagnosticReport
  };
}

// 🚀 Funciones auxiliares

function sendCoreWebVitals() {
  // Implementar envío de métricas Core Web Vitals
  // LCP, FID, CLS, FCP, FIP, INP
  console.log('📊 Enviando métricas Core Web Vitals...');
}

function monitorMetaTags(title, path) {
  // Verificar calidad del título y meta descripción
  const titleLength = title?.length || 0;
  const metaDescription = document.querySelector('meta[name="description"]')?.content;
  const descriptionLength = metaDescription?.length || 0;
  
  // Validaciones
  if (titleLength > 60) {
    console.warn(`⚠️ Título muy largo (${titleLength} caracteres)`);
  }
  
  if (descriptionLength > 160) {
    console.warn(`⚠️ Meta descripción muy larga (${descriptionLength} caracteres)`);
  }
  
  // Verificar canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    console.warn('⚠️ Falta etiqueta canonical');
  }
}

function analyzeHeadingsStructure() {
  // Analizar estructura de encabezados H1-H6
  const headings = {};
  for (let i = 1; i <= 6; i++) {
    headings[`h${i}`] = document.querySelectorAll(`h${i}`).length;
  }
  
  // Validar estructura
  if (headings.h1 !== 1) {
    console.warn(`⚠️ Debe haber exactamente 1 H1 (encontrados: ${headings.h1})`);
  }
  
  console.log('🔍 Estructura de headings:', headings);
}

function monitorPageSpeed() {
  // Monitorear tiempos de carga
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⏱️ Tiempo de carga: ${Math.round(loadTime)}ms`);
    
    if (loadTime > 3000) {
      console.warn('⚠️ Página lenta - afecta SEO');
    }
  });
}

function diagnoseSEOIssues(keywords) {
  const issues = [];
  
  // Verificar keywords en contenido
  const pageText = document.body.innerText.toLowerCase();
  const missingKeywords = keywords.filter(keyword => 
    !pageText.includes(keyword.toLowerCase())
  );
  
  if (missingKeywords.length > 0) {
    issues.push({
      type: 'MISSING_KEYWORDS',
      message: `Keywords no encontradas: ${missingKeywords.join(', ')}`,
      severity: 'medium'
    });
  }
  
  // Verificar imágenes sin alt
  const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
  if (imagesWithoutAlt.length > 0) {
    issues.push({
      type: 'MISSING_ALT_TAGS',
      message: `${imagesWithoutAlt.length} imágenes sin texto alternativo`,
      severity: 'high'
    });
  }
  
  // Verificar enlaces internos
  const internalLinks = document.querySelectorAll('a[href^="/"]');
  if (internalLinks.length === 0) {
    issues.push({
      type: 'NO_INTERNAL_LINKS',
      message: 'No hay enlaces internos en la página',
      severity: 'medium'
    });
  }
  
  if (issues.length > 0) {
    console.table(issues);
  }
  
  return issues;
}

// 📋 Auditoría completa SEO
export async function runFullSEOAudit() {
  console.log('🚀 Iniciando auditoría SEO completa...');
  
  const auditResults = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    issues: [],
    scores: {}
  };
  
  // Simular auditoría (en producción conectar con APIs reales)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  auditResults.scores = {
    technical: 95,
    content: 87,
    mobile: 92,
    speed: 88
  };
  
  auditResults.issues = [
    { type: 'WARNING', message: 'Considerar añadir más enlaces internos' },
    { type: 'INFO', message: 'Meta descripción podría ser más persuasiva' }
  ];
  
  console.log('✅ Auditoría completada:', auditResults);
  return auditResults;
}

// 📊 Obtener puntuación SEO
export function getSEOScore() {
  // Calcular puntuación basada en múltiples factores
  const factors = {
    titleOptimized: document.title.length > 10 && document.title.length < 60 ? 10 : 0,
    hasMetaDescription: document.querySelector('meta[name="description"]') ? 10 : 0,
    hasCanonical: document.querySelector('link[rel="canonical"]') ? 5 : 0,
    hasOpenGraph: document.querySelector('meta[property^="og:"]') ? 5 : 0,
    imagesWithAlt: document.querySelectorAll('img[alt]').length,
    totalImages: document.querySelectorAll('img').length,
    headingsStructure: document.querySelectorAll('h1').length === 1 ? 10 : 0,
  };
  
  const imageScore = factors.totalImages > 0 
    ? (factors.imagesWithAlt / factors.totalImages) * 10 
    : 0;
  
  const totalScore = Object.values(factors).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0) + imageScore;
  
  return Math.min(Math.round(totalScore), 100);
}

// 📋 Generar reporte de diagnóstico
export function getDiagnosticReport() {
  return {
    pageInfo: {
      url: window.location.href,
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content,
    },
    technical: {
      canonical: !!document.querySelector('link[rel="canonical"]'),
      robots: !!document.querySelector('meta[name="robots"]'),
      viewport: !!document.querySelector('meta[name="viewport"]'),
    },
    social: {
      openGraph: !!document.querySelector('meta[property^="og:"]'),
      twitter: !!document.querySelector('meta[name="twitter:"]'),
    },
    content: {
      h1Count: document.querySelectorAll('h1').length,
      imagesTotal: document.querySelectorAll('img').length,
      imagesWithAlt: document.querySelectorAll('img[alt]').length,
      internalLinks: document.querySelectorAll('a[href^="/"]').length,
      externalLinks: document.querySelectorAll('a[href^="http"]').length,
    }
  };
}