'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import GoogleAnalytics to avoid SSR issues
const GoogleAnalyticsClient = dynamic(
  () => import('./GoogleAnalytics'),
  { 
    ssr: false,
    loading: () => null
  }
);

export default function GoogleAnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsClient />
    </Suspense>
  );
}