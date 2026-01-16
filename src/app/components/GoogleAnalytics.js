'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Generate session ID for tracking
function getSessionId() {
  if (typeof window !== 'undefined') {
    let sessionId = sessionStorage.getItem('ga_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('ga_session_id', sessionId);
    }
    return sessionId;
  }
  return 'unknown';
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 📈 Page view tracking
  useEffect(() => {
    // Early exit if no GA ID configured
    if (!GA_MEASUREMENT_ID) {
      console.warn('⚠️ Google Analytics Measurement ID not configured');
      return;
    }

    if (pathname) {
      // Wait for gtag to be loaded
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      
      // Send page view event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
          page_title: document.title,
          page_location: window.location.href,
          // Enhanced measurement parameters
          engagement_time_msec: 100,
          session_id: getSessionId(),
        });
        
        console.log(`📊 GA4 Pageview tracked: ${url}`);
      }
    }
  }, [pathname, searchParams]);

  // Only render in browser environment
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      {/* 📊 Google Analytics 4 gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('✅ Google Analytics script loaded successfully');
        }}
        onError={(e) => {
          console.error('❌ Google Analytics script failed to load:', e);
        }}
      />
      
      {/* 🎯 gtag configuration */}
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Initialize gtag with enhanced measurement
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              // Enhanced measurement settings
              cookie_expires: 63072000, // 2 years
              cookie_update: true,
              cookie_prefix: '__ga',
              
              // Enhanced ecommerce and events
              enhanced_measurements: {
                page_views: true,
                scrolls: true,
                outbound_clicks: true,
                site_search: true,
                video_engagement: true,
                file_downloads: true
              }
            });
            
            console.log('✅ gtag initialized with Measurement ID: ${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}

// Helper functions
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventParams,
      timestamp: new Date().toISOString(),
    });
    console.log(`🎯 GA4 Event tracked: ${eventName}`, eventParams);
  } else {
    console.warn('⚠️ gtag not available for event tracking');
  }
}

export function trackFormSubmission(formName, formData) {
  trackEvent('form_submit', {
    form_name: formName,
    form_location: window.location.pathname,
    ...formData
  });
}

export function trackButtonClick(buttonName, buttonLocation) {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    page_location: window.location.pathname
  });
}