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