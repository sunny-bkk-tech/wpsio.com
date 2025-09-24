#!/usr/bin/env node
/*
 Minimal SERP rank checker using SerpAPI.
 - Engines: Google, Bing
 - Outputs CSV to dist/serp_ranks.csv
 - Configure SERPAPI_KEY in .env or environment
 - Keywords come from scripts/serp_keywords.json if present, else default list below
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const SERPAPI_KEY = process.env.SERPAPI_KEY || '';
if (!SERPAPI_KEY) {
  console.error('SERPAPI_KEY not set. Create a .env with SERPAPI_KEY=your_key');
  process.exit(1);
}

const DOMAIN = 'wpsio.com';
const OUTPUT_CSV = path.resolve(process.cwd(), 'reports/serp/serp_ranks.csv');

function loadKeywords() {
  const customPath = path.resolve(__dirname, 'serp_keywords.json');
  if (fs.existsSync(customPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(customPath, 'utf8'));
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {}
  }
  return [
    // Branded
    'wps io', 'wpsio', 'wps io 下载', 'wps io 下載', 'wps io 辦公',
    // Platform
    'wps for windows 下載', 'wps for mac 下載', 'wps for linux 下載',
    // Features
    'pdf 编辑 免费', 'pdf 編輯 免費',
    // Generic suite
    '免费办公软件', '免費辦公軟體'
  ];
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'rank-checker/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return await res.json();
}

function extractOrganic(results) {
  if (!results) return [];
  // SerpAPI standardizes to organic_results for both engines
  if (Array.isArray(results.organic_results)) return results.organic_results;
  // Fallbacks
  if (Array.isArray(results.web_results)) return results.web_results;
  return [];
}

function findPosition(organic, domain) {
  for (let i = 0; i < organic.length; i += 1) {
    const item = organic[i];
    const link = item.link || item.url || '';
    if (typeof link === 'string' && link.includes(domain)) {
      const position = item.position || (i + 1);
      const page = Math.floor((position - 1) / 10) + 1;
      return { position, page, url: link };
    }
  }
  return null;
}

function buildGoogleUrl(query) {
  const params = new URLSearchParams({
    engine: 'google',
    api_key: SERPAPI_KEY,
    q: query,
    hl: 'zh-CN',
    gl: 'hk',
    num: '100',
  });
  return `https://serpapi.com/search.json?${params.toString()}`;
}

function buildBingUrl(query) {
  const params = new URLSearchParams({
    engine: 'bing',
    api_key: SERPAPI_KEY,
    q: query,
    cc: 'HK',
    count: '50',
  });
  return `https://serpapi.com/search.json?${params.toString()}`;
}

async function run() {
  const keywords = loadKeywords();
  const rows = [['keyword', 'engine', 'rank', 'page', 'url']];

  for (const kw of keywords) {
    // Google
    try {
      const gUrl = buildGoogleUrl(kw);
      const gJson = await fetchJson(gUrl);
      const gOrganic = extractOrganic(gJson);
      const gHit = findPosition(gOrganic, DOMAIN);
      rows.push([kw, 'google', gHit?.position ?? '', gHit?.page ?? '', gHit?.url ?? '']);
      // Be gentle to API rate limits
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      rows.push([kw, 'google', 'ERR', 'ERR', String(e.message || e)]);
    }

    // Bing
    try {
      const bUrl = buildBingUrl(kw);
      const bJson = await fetchJson(bUrl);
      const bOrganic = extractOrganic(bJson);
      const bHit = findPosition(bOrganic, DOMAIN);
      rows.push([kw, 'bing', bHit?.position ?? '', bHit?.page ?? '', bHit?.url ?? '']);
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      rows.push([kw, 'bing', 'ERR', 'ERR', String(e.message || e)]);
    }
  }

  // Write CSV
  const csv = rows.map(r => r.map(v => String(v).includes(',') ? `"${String(v).replaceAll('"', '""')}"` : String(v)).join(',')).join('\n');
  fs.mkdirSync(path.dirname(OUTPUT_CSV), { recursive: true });
  fs.writeFileSync(OUTPUT_CSV, csv, 'utf8');
  console.log(`Wrote ${OUTPUT_CSV}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


