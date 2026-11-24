import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../../dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

// 1. Static Production SPA Server
const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(distDir, urlPath);

  // If path is root or SPA route (no extension), serve index.html
  if (urlPath === '/' || !path.extname(urlPath)) {
    filePath = path.join(distDir, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': content.length,
        'Cache-Control': ext === '.html' ? 'public, max-age=0' : 'public, max-age=31536000, immutable',
      });
      res.end(content);
    });
  });
});

const HOST = '127.0.0.1';

// Listen on port 0 with large socket backlog (2048) to prevent OS connection drops
server.listen(0, HOST, 2048, async () => {
  const PORT = server.address().port;
  console.log('='.repeat(65));
  console.log('  DURO MAKER - LOCAL HIGH CONCURRENCY LOAD BENCHMARK');
  console.log('='.repeat(65));
  console.log(` Production Static Server running at http://${HOST}:${PORT}`);

  const concurrency = parseInt(process.env.CONCURRENCY || '100', 10);
  const totalRequests = parseInt(process.env.TOTAL_REQUESTS || '2000', 10);

  console.log(` Concurrency          : ${concurrency} simultaneous virtual users`);
  console.log(` Total Requests       : ${totalRequests}`);
  console.log('='.repeat(65));
  console.log('Executing test across SPA routes...\n');

  const ROUTES = [
    '/',
    '/services',
    '/works',
    '/about',
    '/store',
    '/contact',
    '/works/pexels-6980724',
  ];

  const agent = new http.Agent({
    keepAlive: true,
    maxSockets: concurrency * 2,
    maxFreeSockets: concurrency,
    timeout: 10000,
  });

  let completed = 0;
  let successful = 0;
  let failed = 0;
  let bytesReceived = 0;
  const latencies = [];
  const startTime = Date.now();

  function makeRequest(index) {
    return new Promise((resolve) => {
      const route = ROUTES[index % ROUTES.length];
      const reqStartTime = performance.now();

      const req = http.get(
        {
          host: HOST,
          port: PORT,
          path: route,
          agent,
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'DuroMaker-LoadSim/1.0',
          },
        },
        (res) => {
          let size = 0;
          res.on('data', (chunk) => {
            size += chunk.length;
          });
          res.on('end', () => {
            const dur = performance.now() - reqStartTime;
            latencies.push(dur);
            bytesReceived += size;
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

      req.on('error', () => {
        latencies.push(performance.now() - reqStartTime);
        failed++;
        completed++;
        resolve();
      });

      req.setTimeout(5000, () => {
        req.destroy();
      });
    });
  }

  let requestIndex = 0;
  const workers = [];

  async function worker() {
    while (requestIndex < totalRequests) {
      const idx = requestIndex++;
      await makeRequest(idx);
      if (completed % Math.max(1, Math.floor(totalRequests / 10)) === 0) {
        const pct = ((completed / totalRequests) * 100).toFixed(0);
        const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
        const curRps = (completed / (elapsedSec || 1)).toFixed(0);
        process.stdout.write(` Progress: ${completed}/${totalRequests} (${pct}%) | ${curRps} req/s\r`);
      }
    }
  }

  for (let i = 0; i < concurrency; i++) {
    workers.push(worker());
  }

  await Promise.all(workers);

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
  console.log('  LOAD TEST RESULTS & CONCURRENCY CAPACITY');
  console.log('='.repeat(65));
  console.log(` Test Duration        : ${totalDurationSec.toFixed(2)} seconds`);
  console.log(` Total Requests       : ${completed}`);
  console.log(` Successful (200 OK)  : ${successful} (${successRate}%)`);
  console.log(` Failed Requests      : ${failed}`);
  console.log(` Throughput           : ${rps} requests / second`);
  console.log(` Data Transferred     : ${mbReceived} MB`);
  console.log('-'.repeat(65));
  console.log(' Latency Percentiles:');
  console.log(`   Min                : ${min.toFixed(2)} ms`);
  console.log(`   Average (Mean)     : ${avg.toFixed(2)} ms`);
  console.log(`   p50 (Median)       : ${p50.toFixed(2)} ms`);
  console.log(`   p90                : ${p90.toFixed(2)} ms`);
  console.log(`   p95                : ${p95.toFixed(2)} ms`);
  console.log(`   p99                : ${p99.toFixed(2)} ms`);
  console.log(`   Max                : ${max.toFixed(2)} ms`);
  console.log('='.repeat(65));

  server.close(() => {
    process.exit(0);
  });
});
