#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keywordsPath = path.resolve(__dirname, 'serp_keywords.json');
const outDir = path.resolve(process.cwd(), 'reports/serp');
const latestCsv = path.join(outDir, 'manual_serp_links.csv');
const manifestPath = path.join(outDir, 'manifest.json');

function tsName(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}-${hh}${mi}${ss}`;
}

function enc(q) {
  return encodeURIComponent(q);
}

function gLinkCN(q) {
  return `https://www.google.com/search?q=${enc(q)}&hl=zh-CN&pws=0&uule=`; // neutral-ish
}

function gLinkTW(q) {
  return `https://www.google.com/search?q=${enc(q)}&hl=zh-TW&pws=0&uule=`;
}

function bLinkHK(q) {
  return `https://www.bing.com/search?q=${enc(q)}&setlang=zh-HK`;
}

const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));
const generatedAt = new Date();
const rows = [['Report Generated:', generatedAt.toLocaleString()] ,['keyword', 'google_zhCN', 'google_zhTW', 'bing_zhHK']];

for (const kw of keywords) {
  rows.push([kw, gLinkCN(kw), gLinkTW(kw), bLinkHK(kw)]);
}

fs.mkdirSync(outDir, { recursive: true });
const csv = rows.map(r => r.map(v => String(v).includes(',') ? `"${String(v).replaceAll('"','""')}"` : String(v)).join(',')).join('\n');

// 1) Write timestamped file to preserve history
const stampedName = `manual_serp_links-${tsName(generatedAt)}.csv`;
const stampedCsvPath = path.join(outDir, stampedName);
// Proactively remove older stamped files from the same calendar day to avoid duplicates
try {
  const ymd = tsName(generatedAt).split('-')[0];
  const entries = fs.readdirSync(outDir);
  for (const name of entries) {
    if (/^manual_serp_links-\d{8}-\d{6}\.(csv|json)$/.test(name) && name.startsWith(`manual_serp_links-${ymd}-`)) {
      // will be re-created for current run; remove older ones first
      try { fs.unlinkSync(path.join(outDir, name)); } catch {}
    }
  }
} catch {}
fs.writeFileSync(stampedCsvPath, csv, 'utf8');

// 2) Also write/update the latest pointer file for backward compatibility
fs.writeFileSync(latestCsv, csv, 'utf8');

// 3) Optionally fetch SERP API results and write JSON (only if enabled)
const wantsApi = process.argv.includes('--with-api');
const apiKey = process.env.SERPAPI_KEY || '';

async function fetchGoogleSerpTop(keyword) {
  const params = new URLSearchParams({
    engine: 'google',
    q: keyword,
    hl: 'zh-CN',
    num: '10',
    api_key: apiKey
  });
  const url = `https://serpapi.com/search.json?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SERPAPI HTTP ${res.status}`);
  const data = await res.json();
  const results = Array.isArray(data.organic_results) ? data.organic_results : [];
  return results.map((r) => ({
    position: r.position,
    title: r.title,
    link: r.link,
    displayed_link: r.displayed_link
  }));
}

let stampedJsonName = '';
if (wantsApi && apiKey) {
  try {
    const payload = { generatedAt: generatedAt.toISOString(), engine: 'google', keywords: [] };
    for (const kw of keywords) {
      try {
        const results = await fetchGoogleSerpTop(kw);
        payload.keywords.push({ keyword: kw, results });
      } catch (err) {
        payload.keywords.push({ keyword: kw, error: String(err) });
      }
    }
    stampedJsonName = `manual_serp_links-${tsName(generatedAt)}.json`;
    const stampedJsonPath = path.join(outDir, stampedJsonName);
    fs.writeFileSync(stampedJsonPath, JSON.stringify(payload, null, 2), 'utf8');
    // latest pointer for JSON as well
    fs.writeFileSync(path.join(outDir, 'manual_serp_links.json'), JSON.stringify(payload, null, 2), 'utf8');
    console.log(`Wrote ${stampedJsonPath}`);
  } catch (e) {
    console.warn('SERP API fetch skipped or failed:', e);
  }
} else if (wantsApi && !apiKey) {
  console.warn('SERP API requested with --with-api but SERPAPI_KEY not set; skipping.');
}

// 4) Update manifest.json
let manifest = { reports: [] };
if (fs.existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) || { reports: [] };
  } catch {}
}

// Add/replace current entry
const iso = generatedAt.toISOString();
const entry = { file: stampedName, generatedAt: iso, json: stampedJsonName || undefined };
const byFile = new Map(manifest.reports.map(r => [r.file, r]));
byFile.set(entry.file, entry);
manifest.reports = Array.from(byFile.values())
  .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

console.log(`Wrote ${stampedCsvPath}`);
console.log(`Updated latest at ${latestCsv}`);
console.log(`Updated manifest at ${manifestPath}`);

// Copy reports to dist directory if it exists (for production serving)
const distReportsDir = path.resolve(process.cwd(), 'dist/reports/serp');
if (fs.existsSync(path.resolve(process.cwd(), 'dist'))) {
  try {
    if (!fs.existsSync(distReportsDir)) {
      fs.mkdirSync(distReportsDir, { recursive: true });
    }
    
    // Copy all SERP reports to dist
    const serpFiles = fs.readdirSync(outDir);
    for (const file of serpFiles) {
      const srcPath = path.join(outDir, file);
      const destPath = path.join(distReportsDir, file);
      fs.copyFileSync(srcPath, destPath);
    }
    
    console.log('✅ Copied reports to dist/reports/serp/');
  } catch (err) {
    console.warn('⚠️  Failed to copy to dist:', err.message);
  }
}
