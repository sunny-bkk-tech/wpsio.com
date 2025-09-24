#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keywordsPath = path.resolve(__dirname, 'serp_keywords.json');
const outDir = path.resolve(process.cwd(), 'reports/serp');
const outCsv = path.join(outDir, 'manual_serp_links.csv');

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
const rows = [['keyword', 'google_zhCN', 'google_zhTW', 'bing_zhHK']];

for (const kw of keywords) {
  rows.push([kw, gLinkCN(kw), gLinkTW(kw), bLinkHK(kw)]);
}

fs.mkdirSync(outDir, { recursive: true });
const csv = rows.map(r => r.map(v => String(v).includes(',') ? `"${String(v).replaceAll('"','""')}"` : String(v)).join(',')).join('\n');
fs.writeFileSync(outCsv, csv, 'utf8');
console.log(`Wrote ${outCsv}`);
