import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tw from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tw(),
      {
        name: 'tracking-html-plugin',
        transformIndexHtml(html) {
          const gtmId = env.VITE_GTM_ID || process.env.VITE_GTM_ID;
          const pixelId = env.VITE_FB_PIXEL_ID || process.env.VITE_FB_PIXEL_ID;

          const gtmSnippet =
            gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId.trim())
              ? `\n    <!-- Google Tag Manager (noscript) -->\n    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(
                  gtmId.trim(),
                )}" height="0" width="0" style="display:none;visibility:hidden" title="Google Tag Manager"></iframe></noscript>\n    <!-- End Google Tag Manager (noscript) -->`
              : '';

          const pixelSnippet =
            pixelId && /^[0-9]{5,25}$/.test(pixelId.trim())
              ? `\n    <!-- Meta Pixel (noscript) -->\n    <noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${encodeURIComponent(
                  pixelId.trim(),
                )}&ev=PageView&noscript=1" /></noscript>\n    <!-- End Meta Pixel (noscript) -->`
              : '';

          return html
            .replace('<!-- %GTM_NOSCRIPT% -->', gtmSnippet)
            .replace('<!-- %PIXEL_NOSCRIPT% -->', pixelSnippet);
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion', 'lenis', 'gsap'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});
