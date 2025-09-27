#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const srcReports = path.join(root, 'reports');
const distReports = path.join(root, 'dist', 'reports');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

try {
  if (!fs.existsSync(path.join(root, 'dist'))) {
    console.log('dist/ not found. Run build first.');
    process.exit(0);
  }
  if (!fs.existsSync(srcReports)) {
    console.log('reports/ not found. Skipping copy.');
    process.exit(0);
  }
  copyDir(srcReports, distReports);
  console.log(`Copied reports/ -> dist/reports/`);
} catch (e) {
  console.error('Failed to copy reports:', e);
  process.exit(1);
}


