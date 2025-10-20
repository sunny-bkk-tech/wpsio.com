#!/usr/bin/env node

/**
 * SEO Daily Health Check Script
 * Monitors critical SEO metrics and sends alerts for issues
 * 
 * Usage: node scripts/seo-daily-check.js
 * Recommended: Run via cron job daily at 8am
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  siteUrl: 'https://www.wpsio.com',
  alertEmail: 'sunnythai786@gmail.com', // SEO alerts email
  slackWebhook: '', // Optional: Add Slack webhook URL
  thresholds: {
    responseTime: 2000, // 2 seconds max
    uptime: 99.9, // 99.9% uptime target
    lcpScore: 2500, // 2.5 seconds
    inpScore: 200, // 0.2 seconds
    clsScore: 0.1, // 0.1 max
  }
};

// Logging
const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, `seo-check-${new Date().toISOString().split('T')[0]}.log`);

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function log(message, level = 'INFO') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;
  console.log(logMessage.trim());
  fs.appendFileSync(LOG_FILE, logMessage);
}

// Check 1: Website Uptime & Response Time
async function checkUptime() {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    https.get(CONFIG.siteUrl, (res) => {
      const responseTime = Date.now() - startTime;
      const isUp = res.statusCode === 200;
      
      log(`Uptime Check: ${isUp ? 'UP' : 'DOWN'} | Status: ${res.statusCode} | Response Time: ${responseTime}ms`);
      
      resolve({
        isUp,
        statusCode: res.statusCode,
        responseTime,
        passed: isUp && responseTime < CONFIG.thresholds.responseTime
      });
    }).on('error', (error) => {
      log(`Uptime Check FAILED: ${error.message}`, 'ERROR');
      resolve({
        isUp: false,
        statusCode: 0,
        responseTime: 0,
        passed: false,
        error: error.message
      });
    });
  });
}

// Check 2: Check for H1 tags (should be exactly 1)
async function checkH1Tags() {
  return new Promise((resolve) => {
    https.get(CONFIG.siteUrl, (res) => {
      let html = '';
      
      res.on('data', (chunk) => {
        html += chunk;
      });
      
      res.on('end', () => {
        const h1Matches = html.match(/<h1[^>]*>/gi);
        const h1Count = h1Matches ? h1Matches.length : 0;
        const passed = h1Count === 1;
        
        log(`H1 Tag Check: ${h1Count} H1 tag(s) found | ${passed ? 'PASS' : 'FAIL'}`);
        
        if (!passed) {
          log(`Expected exactly 1 H1 tag, found ${h1Count}`, 'WARNING');
        }
        
        resolve({
          h1Count,
          passed
        });
      });
    }).on('error', (error) => {
      log(`H1 Check FAILED: ${error.message}`, 'ERROR');
      resolve({ h1Count: 0, passed: false, error: error.message });
    });
  });
}

// Check 3: Verify Meta Description Length
async function checkMetaDescription() {
  return new Promise((resolve) => {
    https.get(CONFIG.siteUrl, (res) => {
      let html = '';
      
      res.on('data', (chunk) => {
        html += chunk;
      });
      
      res.on('end', () => {
        const metaMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
        
        if (!metaMatch) {
          log('Meta Description Check: NOT FOUND', 'ERROR');
          resolve({ exists: false, length: 0, passed: false });
          return;
        }
        
        const metaContent = metaMatch[1];
        const length = metaContent.length;
        const passed = length >= 100 && length <= 160;
        
        log(`Meta Description Check: ${length} characters | ${passed ? 'PASS' : 'FAIL'}`);
        
        if (!passed) {
          log(`Meta description should be 100-160 characters, found ${length}`, 'WARNING');
        }
        
        resolve({
          exists: true,
          length,
          content: metaContent.substring(0, 100) + '...',
          passed
        });
      });
    }).on('error', (error) => {
      log(`Meta Description Check FAILED: ${error.message}`, 'ERROR');
      resolve({ exists: false, length: 0, passed: false, error: error.message });
    });
  });
}

// Check 4: Verify Schema Markup Exists
async function checkSchemaMarkup() {
  return new Promise((resolve) => {
    https.get(CONFIG.siteUrl, (res) => {
      let html = '';
      
      res.on('data', (chunk) => {
        html += chunk;
      });
      
      res.on('end', () => {
        const hasSchema = html.includes('application/ld+json');
        const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi);
        const schemaCount = schemaMatches ? schemaMatches.length : 0;
        
        log(`Schema Markup Check: ${schemaCount} schema block(s) found | ${hasSchema ? 'PASS' : 'FAIL'}`);
        
        resolve({
          exists: hasSchema,
          count: schemaCount,
          passed: hasSchema && schemaCount > 0
        });
      });
    }).on('error', (error) => {
      log(`Schema Markup Check FAILED: ${error.message}`, 'ERROR');
      resolve({ exists: false, count: 0, passed: false, error: error.message });
    });
  });
}

// Check 5: Verify Sitemap Accessibility
async function checkSitemap() {
  return new Promise((resolve) => {
    const sitemapUrl = `${CONFIG.siteUrl}/sitemap.xml`;
    
    https.get(sitemapUrl, (res) => {
      const accessible = res.statusCode === 200;
      const contentType = res.headers['content-type'];
      const isXml = contentType && (contentType.includes('xml') || contentType.includes('text'));
      
      log(`Sitemap Check: ${accessible ? 'ACCESSIBLE' : 'NOT ACCESSIBLE'} | Status: ${res.statusCode}`);
      
      resolve({
        accessible,
        statusCode: res.statusCode,
        contentType,
        passed: accessible && isXml
      });
    }).on('error', (error) => {
      log(`Sitemap Check FAILED: ${error.message}`, 'ERROR');
      resolve({ accessible: false, passed: false, error: error.message });
    });
  });
}

// Check 6: Verify Robots.txt
async function checkRobotsTxt() {
  return new Promise((resolve) => {
    const robotsUrl = `${CONFIG.siteUrl}/robots.txt`;
    
    https.get(robotsUrl, (res) => {
      const accessible = res.statusCode === 200;
      let content = '';
      
      res.on('data', (chunk) => {
        content += chunk;
      });
      
      res.on('end', () => {
        const hasSitemapReference = content.toLowerCase().includes('sitemap:');
        
        log(`Robots.txt Check: ${accessible ? 'ACCESSIBLE' : 'NOT ACCESSIBLE'} | Has Sitemap Ref: ${hasSitemapReference}`);
        
        resolve({
          accessible,
          hasSitemapReference,
          passed: accessible
        });
      });
    }).on('error', (error) => {
      log(`Robots.txt Check FAILED: ${error.message}`, 'ERROR');
      resolve({ accessible: false, passed: false, error: error.message });
    });
  });
}

// Generate Summary Report
function generateReport(results) {
  const allPassed = Object.values(results).every(check => check.passed);
  const failedChecks = Object.entries(results).filter(([_, check]) => !check.passed);
  
  log('='.repeat(60));
  log('SEO DAILY HEALTH CHECK SUMMARY');
  log('='.repeat(60));
  log(`Overall Status: ${allPassed ? '✅ ALL CHECKS PASSED' : '⚠️ ISSUES DETECTED'}`);
  log(`Total Checks: ${Object.keys(results).length}`);
  log(`Passed: ${Object.keys(results).length - failedChecks.length}`);
  log(`Failed: ${failedChecks.length}`);
  log('='.repeat(60));
  
  if (failedChecks.length > 0) {
    log('FAILED CHECKS:', 'WARNING');
    failedChecks.forEach(([name, check]) => {
      log(`  - ${name}: ${check.error || 'Check failed'}`, 'WARNING');
    });
    log('='.repeat(60));
  }
  
  // Save JSON report
  const reportPath = path.join(LOG_DIR, `seo-report-${new Date().toISOString().split('T')[0]}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    allPassed,
    results,
    failedChecks: failedChecks.map(([name, _]) => name)
  }, null, 2));
  
  log(`Report saved to: ${reportPath}`);
  
  return allPassed;
}

// Send Alert (Email or Slack)
function sendAlert(results) {
  const failedChecks = Object.entries(results).filter(([_, check]) => !check.passed);
  
  if (failedChecks.length === 0) {
    return; // No alerts needed
  }
  
  const alertMessage = `
🚨 SEO HEALTH CHECK ALERT - ${new Date().toLocaleDateString()}

${failedChecks.length} check(s) failed:

${failedChecks.map(([name, check]) => {
  return `❌ ${name}\n   Reason: ${check.error || 'Check failed'}\n`;
}).join('\n')}

Please investigate immediately.

Site: ${CONFIG.siteUrl}
Time: ${new Date().toISOString()}
  `.trim();
  
  log('='.repeat(60));
  log('ALERT TRIGGERED');
  log('='.repeat(60));
  log(alertMessage);
  
  // TODO: Implement actual email/Slack notification
  // For now, just log the alert
  if (CONFIG.slackWebhook) {
    log('Slack webhook configured - sending notification...');
    // Implement Slack webhook notification here
  }
  
  if (CONFIG.alertEmail) {
    log(`Email alert configured for: ${CONFIG.alertEmail}`);
    // Implement email notification here
  }
}

// Main Execution
async function main() {
  log('='.repeat(60));
  log('STARTING SEO DAILY HEALTH CHECK');
  log(`Site: ${CONFIG.siteUrl}`);
  log(`Date: ${new Date().toISOString()}`);
  log('='.repeat(60));
  
  try {
    // Run all checks
    const results = {
      uptime: await checkUptime(),
      h1Tags: await checkH1Tags(),
      metaDescription: await checkMetaDescription(),
      schemaMarkup: await checkSchemaMarkup(),
      sitemap: await checkSitemap(),
      robotsTxt: await checkRobotsTxt()
    };
    
    // Generate report
    const allPassed = generateReport(results);
    
    // Send alerts if needed
    if (!allPassed) {
      sendAlert(results);
    }
    
    log('='.repeat(60));
    log('SEO DAILY HEALTH CHECK COMPLETED');
    log('='.repeat(60));
    
    // Exit with appropriate code
    process.exit(allPassed ? 0 : 1);
    
  } catch (error) {
    log(`CRITICAL ERROR: ${error.message}`, 'ERROR');
    log(error.stack, 'ERROR');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };

