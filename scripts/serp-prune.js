#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const dir = path.join(root, 'reports', 'serp');
const manifestPath = path.join(dir, 'manifest.json');

function listFiles() {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.csv') || f.endsWith('.json'));
}

function parseStamp(name) {
  const m = name.match(/manual_serp_links-(\d{8})-(\d{6})\.(csv|json)$/);
  if (!m) return null;
  const [, ymd, hms, ext] = m;
  return { ymd, hms, ext, stamp: `${ymd}-${hms}` };
}

function buildGroups(files) {
  const groups = new Map();
  for (const f of files) {
    const p = parseStamp(f);
    if (!p) continue;
    const key = p.ymd; // group by calendar day
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ file: f, ...p });
  }
  return groups;
}

function prune() {
  if (!fs.existsSync(dir)) {
    console.log('No reports/serp directory found.');
    return;
  }

  const files = listFiles();
  const toDelete = [];
  
  // Never delete pointer files
  const protectedFiles = new Set(['manual_serp_links.csv', 'manual_serp_links.json', 'manifest.json']);
  
  // Get all stamped CSV files
  const csvFiles = files
    .filter(f => f.endsWith('.csv') && parseStamp(f))
    .map(f => ({ file: f, stamp: parseStamp(f) }))
    .sort((a, b) => b.stamp.stamp.localeCompare(a.stamp.stamp));
  
  // Get all stamped JSON files
  const jsonFiles = files
    .filter(f => f.endsWith('.json') && parseStamp(f))
    .map(f => ({ file: f, stamp: parseStamp(f) }))
    .sort((a, b) => b.stamp.stamp.localeCompare(a.stamp.stamp));
  
  // Keep only the latest 1 CSV and 1 JSON (change to 3 or 5 if you want to keep more)
  const keepCount = 1;
  
  // Mark old CSVs for deletion
  csvFiles.slice(keepCount).forEach(item => toDelete.push(item.file));
  
  // Mark old JSONs for deletion
  jsonFiles.slice(keepCount).forEach(item => toDelete.push(item.file));
  
  // Delete old files
  const finalDelete = toDelete.filter(f => !protectedFiles.has(f));
  for (const f of finalDelete) {
    try {
      fs.unlinkSync(path.join(dir, f));
      console.log('Deleted', f);
    } catch (e) {
      console.warn('Failed to delete', f, e);
    }
  }

  // Rebuild manifest from remaining stamped files (sorted desc)
  const remaining = listFiles().filter(f => parseStamp(f) && f.endsWith('.csv'));
  const entries = remaining
    .map(f => ({ f, p: parseStamp(f) }))
    .sort((a, b) => b.p.stamp.localeCompare(a.p.stamp))
    .map(({ f, p }) => {
      // attach json if present
      const jsonName = `manual_serp_links-${p.stamp}.json`;
      const jsonExists = fs.existsSync(path.join(dir, jsonName));
      // best effort generatedAt from stamp
      const iso = `${p.ymd.substring(0,4)}-${p.ymd.substring(4,6)}-${p.ymd.substring(6,8)}T${p.hms.substring(0,2)}:${p.hms.substring(2,4)}:${p.hms.substring(4,6)}.000Z`;
      return { file: f, generatedAt: iso, json: jsonExists ? jsonName : undefined };
    });

  const manifest = { reports: entries };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('Rewrote manifest with', entries.length, 'entries');
}

prune();


