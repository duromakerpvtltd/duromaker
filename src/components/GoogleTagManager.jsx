import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTrackingConsent } from '../utils/trackingConsent';

const gtmId = import.meta.env.VITE_GTM_ID;

/**
 * Google Tag Manager Integration for React SPA.
 * Automatically injects the container script if VITE_GTM_ID is configured,
 * and pushes virtual pageviews to window.dataLayer on route changes.
 */
export default function GoogleTagManager() {
  const location = useLocation();

  useEffect(() => {
    if (!getTrackingConsent() || !gtmId || !/^GTM-[A-Z0-9]+$/i.test(gtmId.trim())) return;

    const trimmedId = gtmId.trim();

    // Initialize dataLayer and inject GTM script once
    if (!window.gtmInitialized) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(trimmedId)}`;
      document.head.appendChild(script);

      window.gtmInitialized = true;
    }

    // Push SPA route change event to GTM dataLayer
    window.dataLayer.push({
      event: 'pageview',
      page_path: `${location.pathname}${location.search}`,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
}
