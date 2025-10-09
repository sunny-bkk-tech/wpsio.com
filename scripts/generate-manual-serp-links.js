#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keywordsPath = path.resolve(__dirname, 'serp_keywords.json');
const regionsPath = path.resolve(__dirname, 'serp_regions.json');
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

// Load regions configuration
let regionsConfig;
try {
  regionsConfig = JSON.parse(fs.readFileSync(regionsPath, 'utf8'));
} catch (err) {
  console.warn('⚠️  Could not load serp_regions.json, using default regions');
  regionsConfig = {
    regions: [
      { name: 'China Mainland', code: 'CN', google_hl: 'zh-CN', google_gl: 'cn', uule: '' },
      { name: 'Taiwan', code: 'TW', google_hl: 'zh-TW', google_gl: 'tw', uule: '' },
      { name: 'Hong Kong', code: 'HK', google_hl: 'zh-HK', google_gl: 'hk', uule: '' },
      { name: 'Singapore', code: 'SG', google_hl: 'zh-CN', google_gl: 'sg', uule: 'w+CAIQICIJU2luZ2Fwb3Jl' }
    ],
    monitoring_config: {
      default_regions: ['CN', 'TW', 'HK', 'SG']
    }
  };
}

// Get active regions (use default_regions from config or all regions)
const activeRegionCodes = regionsConfig.monitoring_config?.default_regions || 
                          regionsConfig.regions.map(r => r.code);
const activeRegions = regionsConfig.regions.filter(r => activeRegionCodes.includes(r.code));

// Generate Google search link for a region
function generateGoogleLink(keyword, region) {
  const params = new URLSearchParams({
    q: keyword,
    hl: region.google_hl,
    gl: region.google_gl,
    pws: '0'
  });
  
  if (region.uule) {
    params.set('uule', region.uule);
  }
  
  return `https://www.google.com/search?${params.toString()}`;
}

// Generate Bing search link
function generateBingLink(keyword, lang = 'zh-CN') {
  return `https://www.bing.com/search?q=${enc(keyword)}&setlang=${lang}`;
}

const keywords = JSON.parse(fs.readFileSync(keywordsPath, 'utf8'));
const generatedAt = new Date();

// Build CSV header
const header = ['keyword'];
for (const region of activeRegions) {
  header.push(`google_${region.code}_${region.google_hl.replace('-', '')}`);
}
header.push('bing_zhCN');

const rows = [
  ['Report Generated:', generatedAt.toLocaleString()],
  header
];

// Build CSV rows
for (const kw of keywords) {
  const row = [kw];
  
  // Add Google links for each region
  for (const region of activeRegions) {
    row.push(generateGoogleLink(kw, region));
  }
  
  // Add Bing link
  row.push(generateBingLink(kw));
  
  rows.push(row);
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

async function fetchGoogleSerpTop(keyword, region) {
  const params = {
    engine: 'google',
    q: keyword,
    hl: region.google_hl,
    gl: region.google_gl,
    num: '10',
    api_key: apiKey
  };
  
  if (region.uule) {
    params.uule = region.uule;
  }
  
  const url = `https://serpapi.com/search.json?${new URLSearchParams(params).toString()}`;
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
    const payload = { 
      generatedAt: generatedAt.toISOString(), 
      engine: 'google', 
      regions: activeRegions.map(r => ({ code: r.code, name: r.name })),
      keywords: [] 
    };
    
    for (const kw of keywords) {
      const kwData = { keyword: kw, regions: {} };
      
      for (const region of activeRegions) {
        try {
          const results = await fetchGoogleSerpTop(kw, region);
          kwData.regions[region.code] = results;
          // Small delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (err) {
          kwData.regions[region.code] = { error: String(err) };
        }
      }
      
      payload.keywords.push(kwData);
    }
    
    stampedJsonName = `manual_serp_links-${tsName(generatedAt)}.json`;
    const stampedJsonPath = path.join(outDir, stampedJsonName);
    fs.writeFileSync(stampedJsonPath, JSON.stringify(payload, null, 2), 'utf8');
    
    // latest pointer for JSON as well
    fs.writeFileSync(path.join(outDir, 'manual_serp_links.json'), JSON.stringify(payload, null, 2), 'utf8');
    console.log(`✅ Wrote API results: ${stampedJsonPath}`);
  } catch (e) {
    console.warn('⚠️  SERP API fetch skipped or failed:', e.message);
  }
} else if (wantsApi && !apiKey) {
  console.warn('⚠️  SERP API requested with --with-api but SERPAPI_KEY not set; skipping.');
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
const entry = { 
  file: stampedName, 
  generatedAt: iso, 
  json: stampedJsonName || undefined,
  regions: activeRegions.map(r => r.code),
  keywordCount: keywords.length
};
const byFile = new Map(manifest.reports.map(r => [r.file, r]));
byFile.set(entry.file, entry);
manifest.reports = Array.from(byFile.values())
  .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime());

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');

console.log(`✅ Generated SERP links report`);
console.log(`   📊 Keywords: ${keywords.length}`);
console.log(`   🌍 Regions: ${activeRegions.map(r => r.code).join(', ')}`);
console.log(`   📁 CSV: ${stampedCsvPath}`);
console.log(`   📁 Latest: ${latestCsv}`);
console.log(`   📋 Manifest: ${manifestPath}`);

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
