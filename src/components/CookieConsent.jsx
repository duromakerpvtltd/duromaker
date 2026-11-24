import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import {
  getTrackingConsent,
  setTrackingConsent,
  TRACKING_CONSENT_KEY,
} from '../utils/trackingConsent';

export default function CookieConsent() {
  const [choiceMade, setChoiceMade] = useState(() => (
    typeof window === 'undefined'
      || window.localStorage.getItem(TRACKING_CONSENT_KEY) !== null
  ));

  useEffect(() => {
    setChoiceMade(window.localStorage.getItem(TRACKING_CONSENT_KEY) !== null);
  }, []);

  const choose = (granted) => {
    setTrackingConsent(granted);
    setChoiceMade(true);
    if (granted) window.location.reload();
  };

  return (
    <>
      {getTrackingConsent() && <Analytics />}
      {!choiceMade && (
        <aside
          role="region"
          aria-label="Privacy choices"
          className="fixed bottom-4 left-4 right-4 z-[70] border border-earth/25 bg-ivory p-5 shadow-xl md:left-auto md:max-w-md"
        >
          <p className="text-sm leading-relaxed text-charcoal/80">
            We use optional analytics cookies to understand website usage. Choose whether to allow analytics.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => choose(true)}
              className="border border-charcoal bg-charcoal px-4 py-2 text-sm text-ivory"
            >
              Allow analytics
            </button>
            <button
              type="button"
              onClick={() => choose(false)}
              className="border border-charcoal px-4 py-2 text-sm"
            >
              Decline
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
