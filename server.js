import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;

// ---- Hard-coded data -------------------------------------------------------
const COURSES = [
  { id: 1, title: 'Web Fundamentals', credits: 5 },
  { id: 2, title: 'JavaScript in Depth', credits: 6 },
  { id: 3, title: 'Back-end with Node.js', credits: 6 },
  { id: 4, title: 'Databases', credits: 4 },
];

const ROBOTS_TXT = 'User-agent: *\nDisallow: /api/admin\n';

const app = express();

// ---- Middleware (registered BEFORE the routes) -----------------------------
let requestsServed = 0;

function requestLogger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
}

function requestCounter(req, res, next) {
  requestsServed += 1;
  next();
}

app.use(requestLogger);
app.use(requestCounter);

// ---- Static files ----------------------------------------------------------
// Serves public/index.html at "/" plus styles.css and app.js.
app.use(express.static(PUBLIC_DIR));

// ---- Routes ----------------------------------------------------------------
app.get('/hello', (req, res) => {
  res.send("Hello from Ada's server");
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(ROBOTS_TXT);
});

app.get('/old-page', (req, res) => {
  res.redirect('/hello'); // 302 Found
});

app.get('/api/courses', (req, res) => {
  res.json(COURSES);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    nodeVersion: process.version,
    uptimeSeconds: Math.round(process.uptime()),
  });
});

app.get('/api/headers', (req, res) => {
  res.json({
    userAgent: req.get('User-Agent') ?? null,
    accept: req.get('Accept') ?? null,
  });
});

app.post('/api/subscribe', (req, res) => {
  res.status(201).json({ subscribed: true });
});

app.get('/api/admin', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.get('/api/stats', (req, res) => {
  res.json({ requestsServed });
});

// ---- 404 fallback (LAST, so it never hides a real route) -------------------
// app.use without a path matches everything that reached this point.
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(404).send('<h1>404</h1><p>Page not found.</p>');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
