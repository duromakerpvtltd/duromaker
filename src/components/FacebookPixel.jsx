import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pixelId = import.meta.env.VITE_FB_PIXEL_ID;

/**
 * Meta (Facebook) Pixel integration for React SPA.
 * Automatically initializes the pixel when VITE_FB_PIXEL_ID is present
 * and dispatches PageView events on route changes.
 */
export default function FacebookPixel() {
  const location = useLocation();

  useEffect(() => {
    if (!pixelId || !/^[0-9]{5,25}$/.test(pixelId.trim())) return;

    const trimmedId = pixelId.trim();

    // Initialize Meta Pixel once
    if (!window.fbq) {
      /* eslint-disable */
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */

      window.fbq('init', trimmedId);
      window.fbPixelInitialized = true;
    }

    // Track page views on route changes
    window.fbq('track', 'PageView');
  }, [location.pathname, location.search]);

  return null;
}

/**
 * Helper utility to fire custom Meta Pixel conversion events.
 * Example: trackPixelEvent('Lead', { content_name: 'Contact Form' })
 */
export function trackPixelEvent(eventName, options = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, options);
  }
}
