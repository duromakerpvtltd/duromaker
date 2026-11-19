import { useState } from 'react';

const FALLBACK_IMAGE = '/images/interiors/pexels-6980724-1600.webp';

/**
 * @param {object} [props]
 * @param {any} [props.photo]
 * @param {string} [props.src]
 * @param {string} [props.alt]
 * @param {string} [props.className]
 * @param {'lazy' | 'eager'} [props.loading]
 * @param {'high' | 'low' | 'auto'} [props.fetchPriority]
 * @param {string} [props.sizes]
 */
export default function InteriorImage({
  photo = undefined,
  src = undefined,
  alt = '',
  className = '',
  loading = 'lazy',
  fetchPriority = undefined,
  sizes = '100vw',
  ...props
} = {}) {
  const [failed, setFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const image = photo || src;
  const imageSrc = typeof image === 'string' ? image : image?.image;
  const thumbnail = typeof image === 'object' ? image?.thumbnail : undefined;

  if (fallbackFailed) {
    return (
      <div
        role="img"
        aria-label={alt || 'Interior reference image unavailable'}
        className={`grid place-items-center bg-cream p-4 text-center text-sm text-earth ${className}`}
      >
        Interior reference image unavailable
      </div>
    );
  }

  return (
    <img
      {...props}
      src={failed ? FALLBACK_IMAGE : imageSrc}
      srcSet={failed || !thumbnail ? undefined : `${thumbnail} 640w, ${imageSrc} 1600w`}
      sizes={sizes}
      alt={alt || (typeof image === 'object' ? image?.alt : '')}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => {
        if (failed) setFallbackFailed(true);
        else setFailed(true);
      }}
      className={className}
    />
  );
}
