// 📊 Google Analytics 4 Integration for Next.js 16
// Proper implementation with gtag and enhanced measurement

'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// 🎯 Measurement ID from your Google Analytics 4 property
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2P6D7KBF7F';

/**
 * Google Analytics 4 Component
 * Implements proper gtag setup with enhanced measurement
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 📈 Page view tracking
  useEffect(() => {
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

  // Only render in browser environment
  if (typeof window === 'undefined') {
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
              },
              
              // Custom dimensions (if configured)
              custom_map: {
                dimension1: 'user_type',
                dimension2: 'page_category'
              }
            });
            
            console.log('✅ gtag initialized with Measurement ID: ${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
}

/**
 * Custom event tracking helper
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Event parameters
 */
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

/**
 * Track form submissions
 * @param {string} formName - Name of the form
 * @param {Object} formData - Form data (without PII)
 */
export function trackFormSubmission(formName, formData) {
  trackEvent('form_submit', {
    form_name: formName,
    form_location: window.location.pathname,
    // Only include non-PII data
    ...formData
  });
}

/**
 * Track button clicks
 * @param {string} buttonName - Name/description of button
 * @param {string} buttonLocation - Where the button is located
 */
export function trackButtonClick(buttonName, buttonLocation) {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    page_location: window.location.pathname
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth() {
  if (typeof window !== 'undefined') {
    let scrollTracked = false;
    
    const handleScroll = () => {
      if (!scrollTracked) {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent >= 25) {
          trackEvent('scroll_depth', {
            scroll_percentage: 25,
            page_location: window.location.pathname
          });
          
          if (scrollPercent >= 50) {
            trackEvent('scroll_depth', {
              scroll_percentage: 50,
              page_location: window.location.pathname
            });
            
            if (scrollPercent >= 75) {
              trackEvent('scroll_depth', {
                scroll_percentage: 75,
                page_location: window.location.pathname
              });
              
              if (scrollPercent >= 90) {
                trackEvent('scroll_depth', {
                  scroll_percentage: 90,
                  page_location: window.location.pathname
                });
                
                scrollTracked = true;
                window.removeEventListener('scroll', handleScroll);
              }
            }
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
  }
}