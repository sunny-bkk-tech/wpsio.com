#!/usr/bin/env node
/*
Southeast Asia Backlink Tracker
Tracks backlinks specifically from Southeast Asian websites and regions.
Extends the main backlink tracker with regional focus.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Southeast Asian countries and their domains
const SEA_COUNTRIES = {
  'singapore': ['.sg', 'singapore', 'sg'],
  'malaysia': ['.my', 'malaysia', 'my'],
  'thailand': ['.th', 'thailand', 'th'],
  'indonesia': ['.id', 'indonesia', 'id'],
  'vietnam': ['.vn', 'vietnam', 'vn'],
  'philippines': ['.ph', 'philippines', 'ph'],
  'brunei': ['.bn', 'brunei', 'bn'],
  'cambodia': ['.kh', 'cambodia', 'kh'],
  'laos': ['.la', 'laos', 'la'],
  'myanmar': ['.mm', 'myanmar', 'mm']
};

// ASEAN business directories and publications
const SEA_DIRECTORIES = [
  'yellowpages.com.sg',
  'sgbiz.com',
  'yellowpages.com.my',
  'malaysiabusinessdirectory.com',
  'yellowpages.co.th',
  'thailandbusinessdirectory.com',
  'yellowpages.co.id',
  'indonesiabusinessdirectory.com',
  'yellowpages.vn',
  'vietnambusinessdirectory.com',
  'yellowpages.com.ph',
  'philippinesbusinessdirectory.com'
];

const SEA_PUBLICATIONS = [
  'straitstimes.com',
  'todayonline.com',
  'channelnewsasia.com',
  'thestar.com.my',
  'nst.com.my',
  'bangkokpost.com',
  'nationthailand.com',
  'jakartapost.com',
  'kompas.com',
  'vietnamnews.vn',
  'vnexpress.net',
  'inquirer.net',
  'mb.com.ph'
];

const manifestPath = path.resolve(process.cwd(), 'reports/backlinks/backlink_manifest.json');
const seaReportPath = path.resolve(process.cwd(), 'reports/backlinks/sea_backlink_report.json');

function loadManifest() {
  if (!fs.existsSync(manifestPath)) {
    return { backlinks: [], dailyStats: {} };
  }
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
}

function isSEAWebsite(url) {
  const domain = new URL(url).hostname.toLowerCase();
  
  // Check for SEA country domains
  for (const [country, indicators] of Object.entries(SEA_COUNTRIES)) {
    for (const indicator of indicators) {
      if (domain.includes(indicator)) {
        return { isSEA: true, country, type: 'country_domain' };
      }
    }
  }
  
  // Check for SEA directories
  for (const directory of SEA_DIRECTORIES) {
    if (domain.includes(directory)) {
      return { isSEA: true, country: 'directory', type: 'business_directory' };
    }
  }
  
  // Check for SEA publications
  for (const publication of SEA_PUBLICATIONS) {
    if (domain.includes(publication)) {
      return { isSEA: true, country: 'publication', type: 'news_publication' };
    }
  }
  
  return { isSEA: false, country: null, type: null };
}

function generateSEAReport() {
  const manifest = loadManifest();
  const seaBacklinks = [];
  const seaStats = {
    total: 0,
    byCountry: {},
    byType: {},
    byQuality: {},
    bySource: {}
  };
  
  for (const backlink of manifest.backlinks) {
    const seaInfo = isSEAWebsite(backlink.url);
    if (seaInfo.isSEA) {
      seaBacklinks.push({
        ...backlink,
        seaCountry: seaInfo.country,
        seaType: seaInfo.type
      });
      
      seaStats.total++;
      seaStats.byCountry[seaInfo.country] = (seaStats.byCountry[seaInfo.country] || 0) + 1;
      seaStats.byType[backlink.type] = (seaStats.byType[backlink.type] || 0) + 1;
      seaStats.byQuality[backlink.quality] = (seaStats.byQuality[backlink.quality] || 0) + 1;
      seaStats.bySource[seaInfo.type] = (seaStats.bySource[seaInfo.type] || 0) + 1;
    }
  }
  
  const report = {
    generatedAt: new Date().toISOString(),
    summary: seaStats,
    backlinks: seaBacklinks,
    recommendations: generateRecommendations(seaStats)
  };
  
  // Ensure directory exists
  fs.mkdirSync(path.dirname(seaReportPath), { recursive: true });
  fs.writeFileSync(seaReportPath, JSON.stringify(report, null, 2), 'utf8');
  
  return report;
}

function generateRecommendations(stats) {
  const recommendations = [];
  
  // Country recommendations
  const targetCountries = ['singapore', 'malaysia', 'thailand', 'indonesia', 'vietnam', 'philippines'];
  for (const country of targetCountries) {
    if (!stats.byCountry[country] || stats.byCountry[country] < 5) {
      recommendations.push({
        type: 'country_focus',
        country: country,
        message: `Increase backlinks from ${country}. Current: ${stats.byCountry[country] || 0}, Target: 5+`
      });
    }
  }
  
  // Type recommendations
  if (!stats.bySource['business_directory'] || stats.bySource['business_directory'] < 10) {
    recommendations.push({
      type: 'directory_focus',
      message: 'Increase business directory submissions. Current: ' + (stats.bySource['business_directory'] || 0) + ', Target: 10+'
    });
  }
  
  if (!stats.bySource['news_publication'] || stats.bySource['news_publication'] < 5) {
    recommendations.push({
      type: 'publication_focus',
      message: 'Increase news publication backlinks. Current: ' + (stats.bySource['news_publication'] || 0) + ', Target: 5+'
    });
  }
  
  // Quality recommendations
  if (!stats.byQuality['high'] || stats.byQuality['high'] < 10) {
    recommendations.push({
      type: 'quality_focus',
      message: 'Increase high-quality backlinks. Current: ' + (stats.byQuality['high'] || 0) + ', Target: 10+'
    });
  }
  
  return recommendations;
}

function displayReport(report) {
  console.log('\n🌏 Southeast Asia Backlink Report');
  console.log('=====================================');
  console.log(`Total SEA Backlinks: ${report.summary.total}`);
  console.log(`Generated: ${new Date(report.generatedAt).toLocaleString()}`);
  
  console.log('\n📊 By Country:');
  for (const [country, count] of Object.entries(report.summary.byCountry)) {
    console.log(`  ${country}: ${count}`);
  }
  
  console.log('\n📈 By Type:');
  for (const [type, count] of Object.entries(report.summary.byType)) {
    console.log(`  ${type}: ${count}`);
  }
  
  console.log('\n⭐ By Quality:');
  for (const [quality, count] of Object.entries(report.summary.byQuality)) {
    console.log(`  ${quality}: ${count}`);
  }
  
  console.log('\n🔗 By Source:');
  for (const [source, count] of Object.entries(report.summary.bySource)) {
    console.log(`  ${source}: ${count}`);
  }
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    for (const rec of report.recommendations) {
      console.log(`  • ${rec.message}`);
    }
  }
  
  console.log('\n📋 Recent SEA Backlinks:');
  const recent = report.backlinks.slice(-5);
  for (const link of recent) {
    console.log(`  • ${link.domain} (${link.seaCountry}) - ${link.type} - ${link.quality}`);
  }
}

function addSEABacklink(opts) {
  if (!opts.url || !opts.domain) {
    console.error('Error: --url and --domain are required');
    process.exit(1);
  }
  
  const seaInfo = isSEAWebsite(opts.url);
  if (!seaInfo.isSEA) {
    console.error('Error: URL is not from a Southeast Asian website');
    console.log('SEA countries: Singapore, Malaysia, Thailand, Indonesia, Vietnam, Philippines, Brunei, Cambodia, Laos, Myanmar');
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
    status: 'active',
    seaCountry: seaInfo.country,
    seaType: seaInfo.type
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
  
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  
  console.log(`✅ Added SEA backlink: ${opts.domain} (${seaInfo.country}) - ${opts.type} - ${opts.quality}`);
  console.log(`📊 Daily total: ${manifest.dailyStats[today].total}`);
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--report')) {
    const report = generateSEAReport();
    displayReport(report);
  } else if (args.includes('--add')) {
    const opts = {};
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--url' && args[i + 1]) opts.url = args[i + 1];
      if (args[i] === '--domain' && args[i + 1]) opts.domain = args[i + 1];
      if (args[i] === '--type' && args[i + 1]) opts.type = args[i + 1];
      if (args[i] === '--quality' && args[i + 1]) opts.quality = args[i + 1];
      if (args[i] === '--anchor' && args[i + 1]) opts.anchor = args[i + 1];
      if (args[i] === '--notes' && args[i + 1]) opts.notes = args[i + 1];
    }
    addSEABacklink(opts);
  } else {
    console.log('Southeast Asia Backlink Tracker');
    console.log('Usage:');
    console.log('  node sea-backlink-tracker.js --report');
    console.log('  node sea-backlink-tracker.js --add --url "https://example.com" --domain "example.com" --type "guest" --quality "high"');
  }
}

main();
