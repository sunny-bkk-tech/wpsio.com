#!/usr/bin/env node
/**
 * Backlink Monitoring Script
 * Monitors for new toxic backlinks and alerts when action is needed
 * Run daily via cron: 0 9 * * * node scripts/backlink-monitor.cjs
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const CONFIG = {
  domain: 'wpsio.com',
  alertEmail: 'sunnythai786@gmail.com',
  disavowFile: path.join(__dirname, '..', 'disavow.txt'),
  reportDir: path.join(__dirname, '..', 'reports', 'backlinks'),
  toxicThreshold: 30, // Toxic score threshold (0-100)
  checkFrequency: 'daily'
};

// Known toxic patterns
const TOXIC_PATTERNS = [
  /exlinko\.com/i,
  /seo-blind-spots/i,
  /buybacklinks/i,
  /linkfarm/i,
  /pbn/i,
  /expired.*domain/i,
  /fiverr\.com\/gigs.*backlink/i,
  /anchorurl/i,
  /toplikevideo/i
];

/**
 * Check if a domain matches toxic patterns
 */
function isToxicDomain(domain) {
  return TOXIC_PATTERNS.some(pattern => pattern.test(domain));
}

/**
 * Read existing disavow file
 */
function readDisavowFile() {
  try {
    const content = fs.readFileSync(CONFIG.disavowFile, 'utf8');
    const domains = [];
    
    content.split('\n').forEach(line => {
      line = line.trim();
      if (line.startsWith('domain:')) {
        domains.push(line.replace('domain:', '').trim());
      } else if (line && !line.startsWith('#')) {
        // Individual URL
        domains.push(line);
      }
    });
    
    return domains;
  } catch (error) {
    console.error('Error reading disavow file:', error.message);
    return [];
  }
}

/**
 * Append new toxic domain to disavow file
 */
function appendToDisavow(domain, reason) {
  try {
    const timestamp = new Date().toISOString().split('T')[0];
    const entry = `\n# Added: ${timestamp} - ${reason}\ndomain:${domain}\n`;
    
    fs.appendFileSync(CONFIG.disavowFile, entry, 'utf8');
    console.log(`✅ Added ${domain} to disavow file`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to append to disavow file:`, error.message);
    return false;
  }
}

/**
 * Generate backlink monitoring report
 */
function generateReport(results) {
  const timestamp = new Date().toISOString();
  const date = timestamp.split('T')[0];
  
  const report = {
    timestamp,
    domain: CONFIG.domain,
    summary: {
      totalChecked: results.length,
      toxicFound: results.filter(r => r.isToxic).length,
      newlyDisavowed: results.filter(r => r.newlyDisavowed).length,
      alreadyDisavowed: results.filter(r => r.alreadyDisavowed).length
    },
    toxicLinks: results.filter(r => r.isToxic),
    recommendations: [],
    nextActions: []
  };
  
  // Add recommendations
  if (report.summary.toxicFound > 0) {
    report.recommendations.push('Submit updated disavow.txt to Google Search Console');
    report.recommendations.push('Review toxic links and contact webmasters for removal if possible');
    report.recommendations.push('Monitor rankings for any negative impact');
  }
  
  if (report.summary.toxicFound === 0) {
    report.recommendations.push('✅ No new toxic backlinks detected');
    report.nextActions.push('Continue monitoring daily');
  } else {
    report.nextActions.push(`🚨 Action Required: ${report.summary.toxicFound} toxic link(s) found`);
    report.nextActions.push('1. Review the toxic links in this report');
    report.nextActions.push('2. Upload updated disavow.txt to Google Search Console');
    report.nextActions.push('3. Consider reaching out to remove links manually');
  }
  
  // Save report
  const reportPath = path.join(CONFIG.reportDir, `backlink-monitor-${date}.json`);
  
  // Ensure directory exists
  if (!fs.existsSync(CONFIG.reportDir)) {
    fs.mkdirSync(CONFIG.reportDir, { recursive: true });
  }
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n📊 Report saved: ${reportPath}`);
  
  return report;
}

/**
 * Main monitoring function
 */
async function monitorBacklinks() {
  console.log('🔍 Starting Backlink Monitoring...\n');
  console.log(`Domain: ${CONFIG.domain}`);
  console.log(`Disavow File: ${CONFIG.disavowFile}\n`);
  
  // Read existing disavow list
  const disavowedDomains = readDisavowFile();
  console.log(`📋 Currently disavowing ${disavowedDomains.length} domains\n`);
  
  // Simulate backlink check (in production, integrate with Semrush/Ahrefs API)
  // For now, we'll check against known toxic patterns
  const mockBacklinks = [
    'example.com',
    'goodsite.org',
    'exlinko.com',
    'buybacklinks.com'
  ];
  
  const results = mockBacklinks.map(domain => {
    const isToxic = isToxicDomain(domain);
    const alreadyDisavowed = disavowedDomains.includes(domain);
    let newlyDisavowed = false;
    let reason = '';
    
    if (isToxic) {
      reason = 'Matches toxic pattern';
      if (!alreadyDisavowed) {
        newlyDisavowed = appendToDisavow(domain, reason);
      } else {
        console.log(`⏭️  ${domain} - Already disavowed`);
      }
    } else {
      console.log(`✅ ${domain} - Clean`);
    }
    
    return {
      domain,
      isToxic,
      alreadyDisavowed,
      newlyDisavowed,
      reason,
      checkedAt: new Date().toISOString()
    };
  });
  
  // Generate report
  const report = generateReport(results);
  
  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 BACKLINK MONITORING SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total Checked: ${report.summary.totalChecked}`);
  console.log(`Toxic Found: ${report.summary.toxicFound}`);
  console.log(`Newly Disavowed: ${report.summary.newlyDisavowed}`);
  console.log(`Already Disavowed: ${report.summary.alreadyDisavowed}`);
  console.log('='.repeat(60));
  
  if (report.summary.toxicFound > 0) {
    console.log('\n🚨 ACTION REQUIRED:');
    report.nextActions.forEach(action => console.log(`  ${action}`));
  } else {
    console.log('\n✅ All clear! No toxic backlinks detected.');
  }
  
  console.log('\n✅ Backlink monitoring complete!');
  
  return report;
}

// Run if called directly
if (require.main === module) {
  monitorBacklinks()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('❌ Backlink monitoring failed:', error);
      process.exit(1);
    });
}

module.exports = { monitorBacklinks, isToxicDomain, readDisavowFile };

