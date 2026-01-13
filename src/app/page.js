'use client';

import HomePage from "./components/HomePage";
import SchemaMarkup from "./components/SchemaMarkup";
import { useSEOMonitoring } from "@/lib/seo-monitoring";

export default function Page() {
  // 📊 Monitoreo SEO en tiempo real
  useSEOMonitoring({
    pageTitle: "Nex-v | Soluciones Digitales para Empresas",
    pagePath: "/",
    keywords: [
      "marketing digital Madrid",
      "desarrollo web profesional",
      "agencia digital España",
      "SEO posicionamiento web",
      "páginas web pymes"
    ]
  });

  return (
    <>
      <HomePage />
      <SchemaMarkup />
    </>
  );
}