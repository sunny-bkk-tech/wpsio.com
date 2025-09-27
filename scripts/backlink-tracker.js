#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reportsDir = path.resolve(process.cwd(), 'reports/backlinks');
const manifestPath = path.join(reportsDir, 'backlink_manifest.json');
const dailyReportPath = path.join(reportsDir, `backlink_daily_${new Date().toISOString().split('T')[0]}.json`);

// Ensure reports directory exists
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { 
    action: 'add', // add, report, summary
    url: '',
    domain: '',
    anchor: '',
    type: 'manual', // manual, guest, directory, social, partnership
    quality: 'medium', // high, medium, low
    notes: ''
  };
  
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--url') out.url = args[++i] || '';
    else if (a === '--domain') out.domain = args[++i] || '';
    else if (a === '--anchor') out.anchor = args[++i] || '';
    else if (a === '--type') out.type = args[++i] || out.type;
    else if (a === '--quality') out.quality = args[++i] || out.quality;
    else if (a === '--notes') out.notes = args[++i] || '';
    else if (a === '--report') out.action = 'report';
    else if (a === '--summary') out.action = 'summary';
  }
  
  return out;
}

function loadManifest() {
  if (!fs.existsSync(manifestPath)) {
    return { backlinks: [], dailyStats: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return { backlinks: [], dailyStats: {} };
  }
}

function saveManifest(data) {
  fs.writeFileSync(manifestPath, JSON.stringify(data, null, 2), 'utf8');
}

function addBacklink(opts) {
  if (!opts.url || !opts.domain) {
    console.error('Error: --url and --domain are required');
    process.exit(1);
  }
  
  const manifest = loadManifest();
  const today = new Date().toISOString().split('T')[0];
  
  const backlink = {
    id: Date.now().toString(),
    url: opts.url,
    domain: opts.domain,
    anchor: opts.anchor || '',
    type: opts.type,
    quality: opts.quality,
    notes: opts.notes,
    dateAdded: today,
    status: 'active'
  };
  
  // Check for duplicates
  const exists = manifest.backlinks.find(b => b.url === opts.url);
  if (exists) {
    console.log('Backlink already exists:', opts.url);
    return;
  }
  
  manifest.backlinks.push(backlink);
  
  // Update daily stats
  if (!manifest.dailyStats[today]) {
    manifest.dailyStats[today] = {
      total: 0,
      byType: {},
      byQuality: {}
    };
  }
  
  manifest.dailyStats[today].total++;
  manifest.dailyStats[today].byType[opts.type] = (manifest.dailyStats[today].byType[opts.type] || 0) + 1;
  manifest.dailyStats[today].byQuality[opts.quality] = (manifest.dailyStats[today].byQuality[opts.quality] || 0) + 1;
  
  saveManifest(manifest);
  
  // Write daily report
  const dailyReport = {
    date: today,
    newBacklinks: [backlink],
    stats: manifest.dailyStats[today]
  };
  
  fs.writeFileSync(dailyReportPath, JSON.stringify(dailyReport, null, 2), 'utf8');
  
  console.log(`✅ Added backlink: ${opts.domain} (${opts.type}, ${opts.quality})`);
  console.log(`📊 Daily total: ${manifest.dailyStats[today].total}`);
}

function generateReport() {
  const manifest = loadManifest();
  const today = new Date().toISOString().split('T')[0];
  
  console.log('\n📈 BACKLINK TRACKING REPORT');
  console.log('='.repeat(50));
  
  // Overall stats
  const total = manifest.backlinks.length;
  const active = manifest.backlinks.filter(b => b.status === 'active').length;
  
  console.log(`\n📊 OVERALL STATISTICS`);
  console.log(`Total backlinks: ${total}`);
  console.log(`Active backlinks: ${active}`);
  
  // By type
  const byType = {};
  const byQuality = {};
  
  manifest.backlinks.forEach(b => {
    byType[b.type] = (byType[b.type] || 0) + 1;
    byQuality[b.quality] = (byQuality[b.quality] || 0) + 1;
  });
  
  console.log(`\n🔗 BY TYPE:`);
  Object.entries(byType).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`);
  });
  
  console.log(`\n⭐ BY QUALITY:`);
  Object.entries(byQuality).forEach(([quality, count]) => {
    console.log(`  ${quality}: ${count}`);
  });
  
  // Recent activity (last 7 days)
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoStr = weekAgo.toISOString().split('T')[0];
  
  const recent = manifest.backlinks.filter(b => b.dateAdded >= weekAgoStr);
  console.log(`\n📅 RECENT ACTIVITY (Last 7 days): ${recent.length} new backlinks`);
  
  recent.forEach(b => {
    console.log(`  • ${b.domain} (${b.type}, ${b.quality}) - ${b.dateAdded}`);
  });
  
  // Today's stats
  if (manifest.dailyStats[today]) {
    const todayStats = manifest.dailyStats[today];
    console.log(`\n📊 TODAY'S PROGRESS:`);
    console.log(`  New backlinks: ${todayStats.total}`);
    console.log(`  By type: ${JSON.stringify(todayStats.byType)}`);
    console.log(`  By quality: ${JSON.stringify(todayStats.byQuality)}`);
  } else {
    console.log(`\n📊 TODAY'S PROGRESS: No backlinks added yet`);
  }
  
  console.log('\n' + '='.repeat(50));
}

function generateSummary() {
  const manifest = loadManifest();
  
  // Calculate weekly and monthly totals
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const weekAgoStr = weekAgo.toISOString().split('T')[0];
  const monthAgoStr = monthAgo.toISOString().split('T')[0];
  
  const weekly = manifest.backlinks.filter(b => b.dateAdded >= weekAgoStr).length;
  const monthly = manifest.backlinks.filter(b => b.dateAdded >= monthAgoStr).length;
  
  console.log('\n📋 BACKLINK SUMMARY');
  console.log('='.repeat(30));
  console.log(`Total backlinks: ${manifest.backlinks.length}`);
  console.log(`This week: ${weekly}`);
  console.log(`This month: ${monthly}`);
  
  // Top domains
  const domainCount = {};
  manifest.backlinks.forEach(b => {
    domainCount[b.domain] = (domainCount[b.domain] || 0) + 1;
  });
  
  const topDomains = Object.entries(domainCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  
  console.log('\n🏆 TOP DOMAINS:');
  topDomains.forEach(([domain, count]) => {
    console.log(`  ${domain}: ${count} links`);
  });
  
  console.log('\n' + '='.repeat(30));
}

function showHelp() {
  console.log(`
🔗 BACKLINK TRACKER

USAGE:
  yarn backlink:add --url <url> --domain <domain> [options]
  yarn backlink:report
  yarn backlink:summary

OPTIONS:
  --url <url>        Backlink URL
  --domain <domain>  Domain name
  --anchor <text>    Anchor text used
  --type <type>      Type: manual, guest, directory, social, partnership
  --quality <level>  Quality: high, medium, low
  --notes <text>     Additional notes
  --report           Generate detailed report
  --summary          Generate summary

EXAMPLES:
  yarn backlink:add --url "https://example.com/wps-review" --domain "example.com" --type "guest" --quality "high"
  yarn backlink:report
  yarn backlink:summary
`);
}

function main() {
  const opts = parseArgs();
  
  if (opts.action === 'add') {
    if (!opts.url || !opts.domain) {
      showHelp();
      process.exit(1);
    }
    addBacklink(opts);
  } else if (opts.action === 'report') {
    generateReport();
  } else if (opts.action === 'summary') {
    generateSummary();
  } else {
    showHelp();
  }
}

main();
