import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * k6 Load Test - 10,000 Concurrent Users Simulation
 * 
 * To run locally:
 *   k6 run tests/load/k6-load-test.js
 * 
 * To run against production/staging URL:
 *   k6 run -e TARGET_URL=https://duromaker.vercel.app tests/load/k6-load-test.js
 */

const TARGET_URL = __ENV.TARGET_URL || 'http://localhost:4173';

export const options = {
  // Test stages gradually ramping to 10,000 Virtual Users (VUs)
  stages: [
    { duration: '30s', target: 200 },    // Warm-up / smoke test
    { duration: '1m', target: 1000 },    // Ramp up to 1,000 users
    { duration: '2m', target: 5000 },    // Scale to 5,000 users
    { duration: '2m', target: 10000 },   // Spike to 10,000 concurrent users
    { duration: '3m', target: 10000 },   // Sustain peak traffic at 10,000 users
    { duration: '1m', target: 0 },       // Graceful ramp-down
  ],

  // Performance SLA thresholds
  thresholds: {
    // 95% of requests must complete under 500ms; 99% under 1500ms
    http_req_duration: ['p(95)<500', 'p(99)<1500'],
    // Error rate must remain under 1%
    http_req_failed: ['rate<0.01'],
    // Functional checks success rate > 99%
    checks: ['rate>0.99'],
  },
};

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/services', name: 'Services' },
  { path: '/works', name: 'Works Gallery' },
  { path: '/works/pexels-6980724', name: 'Project Detail' },
  { path: '/about', name: 'About' },
  { path: '/store', name: 'Store References' },
  { path: '/contact', name: 'Contact' },
];

export default function () {
  // Simulate realistic browsing across different pages
  const page = PAGES[Math.floor(Math.random() * PAGES.length)];
  const url = `${TARGET_URL}${page.path}`;

  const res = http.get(url, {
    tags: { name: page.name },
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'User-Agent': 'k6-load-test/1.0 (DuroMaker 10K Simulation)',
      'Accept-Encoding': 'gzip, deflate, br',
    },
  });

  check(res, {
    [`${page.name} status is 200`]: (r) => r.status === 200,
    [`${page.name} response time < 500ms`]: (r) => r.timings.duration < 500,
  });

  // User dwell time between 1s and 3s
  sleep(Math.random() * 2 + 1);
}
