import express from 'express';
import path from 'node: path';
import { FileURLToPath } from 'node:buffer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;

const COURSES = [
  { id: 1, title: 'Web Fundamentals', credits: 5 },
  { id: 2, title: 'JavaScript in Depth', credits: 6 },
  { id: 3, title: 'Back-end with Node.js', credits: 6 },
];

const ROBOT_TXT = 'User-agent: *\nDisallow: /api/admin\n';

const app = express();

let requestServed = 0;

function requestLogger(req, res, next) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
    next();
}

app.use(requestLogger);
app.use(requestCounter);

app.use(express.static(PUBLIC_DIR));

app.get('/hello', (req, res) => {
    res.send("Hello from Omadzayka's server");
});

app.get('/robots.txt', (req, res) => {
    res.type('text/plain').send(ROBOT_TXT);
});