import http from 'node:http';
import https from 'node:https';
import { URL } from 'node:url';

/**
 * High-Concurrency Load Tester & Benchmark for Duro Maker Interiors
 *
 * Runs without external dependencies using native Node.js HTTP client.
 * Simulates high concurrency across site routes.
 *
 * Usage:
 *   node tests/load/benchmark.js [targetUrl] [concurrency] [totalRequests]
 *
 * Examples:
 *   node tests/load/benchmark.js http://localhost:4173 100 2000
 *   node tests/load/benchmark.js https://duromaker.vercel.app 200 5000
 */

const targetArg = process.argv[2] || process.env.TARGET_URL || 'http://localhost:4173';
const concurrency = parseInt(process.argv[3] || process.env.CONCURRENCY || '100', 10);
const totalRequests = parseInt(process.argv[4] || process.env.TOTAL_REQUESTS || '2000', 10);

const parsedUrl = new URL(targetArg);
const isHttps = parsedUrl.protocol === 'https:';
const client = isHttps ? https : http;

// HTTP Agent with keepAlive and pooled sockets to handle high concurrency
const agent = new client.Agent({
  keepAlive: true,
  maxSockets: concurrency * 2,
  maxFreeSockets: concurrency,
  timeout: 10000,
});

const ROUTES = [
  '/',
  '/services',
  '/works',
  '/about',
  '/store',
  '/contact',
  '/works/pexels-6980724',
];

console.log('='.repeat(65));
console.log('  DURO MAKER INTERIORS - HIGH CONCURRENCY BENCHMARK');
console.log('='.repeat(65));
console.log(` Target URL     : ${parsedUrl.origin}`);
console.log(` Concurrency    : ${concurrency} parallel virtual clients`);
console.log(` Total Requests : ${totalRequests}`);
console.log(` Routes Tested  : ${ROUTES.join(', ')}`);
console.log('='.repeat(65));
console.log('Starting benchmark...\n');

let completed = 0;
let successful = 0;
let failed = 0;
let bytesReceived = 0;
const latencies = [];

const startTime = Date.now();

function makeRequest(index) {
  return new Promise((resolve) => {
    const route = ROUTES[index % ROUTES.length];
    const reqUrl = new URL(route, parsedUrl.origin);

    const reqStartTime = performance.now();

    const req = client.get(
      reqUrl.href,
      {
        agent,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate',
          'User-Agent': 'DuroMaker-LoadTester/1.0',
        },
      },
      (res) => {
        let bodySize = 0;
        res.on('data', (chunk) => {
          bodySize += chunk.length;
        });

        res.on('end', () => {
          const duration = performance.now() - reqStartTime;
          latencies.push(duration);
          bytesReceived += bodySize;

          if (res.statusCode >= 200 && res.statusCode < 400) {
            successful++;
          } else {
            failed++;
          }
          completed++;
          resolve();
        });
      },
    );

    req.on('error', (err) => {
      const duration = performance.now() - reqStartTime;
      latencies.push(duration);
      failed++;
      completed++;
      resolve();
    });

    req.setTimeout(10000, () => {
      req.destroy(new Error('Request timeout'));
    });
  });
}

async function runPool() {
  let requestIndex = 0;
  const workers = [];

  async function worker() {
    while (requestIndex < totalRequests) {
      const idx = requestIndex++;
      await makeRequest(idx);

      if (completed % Math.max(1, Math.floor(totalRequests / 10)) === 0) {
        const percent = ((completed / totalRequests) * 100).toFixed(0);
        const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
        const currentRps = (completed / (elapsedSec || 1)).toFixed(0);
        process.stdout.write(` Progress: ${completed}/${totalRequests} (${percent}%) | ${currentRps} req/s\r`);
      }
    }
  }

  for (let i = 0; i < concurrency; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);
}

runPool().then(() => {
  const totalDurationSec = (Date.now() - startTime) / 1000;
  latencies.sort((a, b) => a - b);

  const avg = latencies.reduce((a, b) => a + b, 0) / (latencies.length || 1);
  const min = latencies[0] || 0;
  const max = latencies[latencies.length - 1] || 0;
  const p50 = latencies[Math.floor(latencies.length * 0.5)] || 0;
  const p90 = latencies[Math.floor(latencies.length * 0.9)] || 0;
  const p95 = latencies[Math.floor(latencies.length * 0.95)] || 0;
  const p99 = latencies[Math.floor(latencies.length * 0.99)] || 0;
  const rps = (completed / totalDurationSec).toFixed(2);
  const mbReceived = (bytesReceived / (1024 * 1024)).toFixed(2);
  const successRate = ((successful / (completed || 1)) * 100).toFixed(2);

  console.log('\n\n' + '='.repeat(65));
  console.log('  LOAD TEST RESULTS & PERFORMANCE SUMMARY');
  console.log('='.repeat(65));
  console.log(` Total Time Elapsed   : ${totalDurationSec.toFixed(2)} seconds`);
  console.log(` Total Requests       : ${completed}`);
  console.log(` Successful (2xx/3xx) : ${successful} (${successRate}%)`);
  console.log(` Failed / Errors      : ${failed}`);
  console.log(` Throughput           : ${rps} requests / second`);
  console.log(` Total Data Transferred: ${mbReceived} MB`);
  console.log('-'.repeat(65));
  console.log(' Latency Percentiles (Response Time):');
  console.log(`   Min                : ${min.toFixed(2)} ms`);
  console.log(`   Avg (Mean)         : ${avg.toFixed(2)} ms`);
  console.log(`   Median (p50)       : ${p50.toFixed(2)} ms`);
  console.log(`   90th Percentile    : ${p90.toFixed(2)} ms`);
  console.log(`   95th Percentile    : ${p95.toFixed(2)} ms`);
  console.log(`   99th Percentile    : ${p99.toFixed(2)} ms`);
  console.log(`   Max                : ${max.toFixed(2)} ms`);
  console.log('='.repeat(65));

  // Exit with error code if success rate < 95%
  if (successRate < 95) {
    console.error('\n❌ Warning: High failure rate detected during load test.');
    process.exit(1);
  } else {
    console.log('\n✅ Load test completed successfully.');
    process.exit(0);
  }
});
