import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTrackingConsent } from '../utils/trackingConsent';

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!getTrackingConsent() || !/^G-[A-Z0-9]+$/.test(measurementId || '')) return;

    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
      window.gtag('js', new Date());
      window.gtag('config', measurementId, { send_page_view: false });
    }

    window.gtag('event', 'page_view', {
      page_path: `${location.pathname}${location.search}`,
      page_title: document.title,
      page_location: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
}
