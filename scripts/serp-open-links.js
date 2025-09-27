#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportsDir = path.resolve(process.cwd(), 'reports/serp');
const manifestPath = path.join(reportsDir, 'manifest.json');
const latestCsvPath = path.join(reportsDir, 'manual_serp_links.csv');

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { file: '', engine: 'google_zhCN', limit: 0, delayMs: 750 };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--file') out.file = args[++i] || '';
    else if (a === '--engine') out.engine = args[++i] || out.engine;
    else if (a === '--limit') out.limit = parseInt(args[++i] || '0', 10) || 0;
    else if (a === '--delay') out.delayMs = parseInt(args[++i] || '750', 10) || 750;
  }
  return out;
}

function getDefaultFileFromManifest() {
  try {
    if (!fs.existsSync(manifestPath)) return latestCsvPath;
    const json = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (Array.isArray(json.reports) && json.reports.length > 0) {
      // first is newest
      const latest = json.reports[0].file;
      return path.join(reportsDir, latest);
    }
  } catch {}
  return latestCsvPath;
}

function detectOpener() {
  const platform = process.platform;
  if (platform === 'darwin') return 'open';
  if (platform === 'win32') return 'start';
  return 'xdg-open';
}

function openUrl(url) {
  const opener = detectOpener();
  if (opener === 'start') {
    // Windows: use cmd /c start
    spawn('cmd', ['/c', 'start', '""', url], { stdio: 'ignore', detached: true });
    return;
    }
  spawn(opener, [url], { stdio: 'ignore', detached: true });
}

function parseCsv(text) {
  // Simple CSV split (fields have no embedded commas in our generator)
  return text.split('\n').map((r) => r.split(','));
}

async function main() {
  const opts = parseArgs();
  const filePath = opts.file
    ? path.resolve(process.cwd(), opts.file)
    : getDefaultFileFromManifest();

  if (!fs.existsSync(filePath)) {
    console.error(`CSV not found: ${filePath}`);
    process.exit(1);
  }

  const csv = fs.readFileSync(filePath, 'utf8');
  const rows = parseCsv(csv);
  if (!rows.length) {
    console.error('CSV is empty.');
    process.exit(1);
  }

  // Determine header index
  const headerRowIndex = rows[0][0] === 'Report Generated:' ? 1 : 0;
  const dataStartIndex = rows[0][0] === 'Report Generated:' ? 2 : 1;
  const header = rows[headerRowIndex];

  const colIndex = {
    keyword: 0,
    google_zhCN: 1,
    google_zhTW: 2,
    bing_zhHK: 3,
  };

  if (opts.engine && !(opts.engine in colIndex)) {
    console.error(`Unknown engine: ${opts.engine}. Use one of: ${Object.keys(colIndex).join(', ')}`);
    process.exit(1);
  }

  const urlCol = colIndex[opts.engine];
  const dataRows = rows.slice(dataStartIndex).filter((r) => r.length > urlCol && r[urlCol]);
  const total = opts.limit > 0 ? Math.min(opts.limit, dataRows.length) : dataRows.length;

  console.log(`Opening ${total} ${opts.engine} links from ${path.relative(process.cwd(), filePath)} ...`);
  console.log('Close tabs or adjust delay with --delay <ms> to control pacing.');

  for (let i = 0; i < total; i++) {
    const row = dataRows[i];
    const keyword = row[colIndex.keyword];
    const url = row[urlCol];
    console.log(`${i + 1}/${total}: ${keyword}`);
    openUrl(url);
    // eslint-disable-next-line no-await-in-loop
    await new Promise((res) => setTimeout(res, opts.delayMs));
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


