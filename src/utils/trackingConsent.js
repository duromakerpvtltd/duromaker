export const TRACKING_CONSENT_KEY = 'duromaker.tracking-consent';

export function getTrackingConsent() {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(TRACKING_CONSENT_KEY) === 'granted';
}

export function setTrackingConsent(granted) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TRACKING_CONSENT_KEY, granted ? 'granted' : 'denied');
  window.dispatchEvent(new CustomEvent('duromaker:tracking-consent', {
    detail: { granted: Boolean(granted) },
  }));
}
