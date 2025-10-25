#!/usr/bin/env node

/**
 * Bing IndexNow API Submission Script
 * This script submits your site URLs to Bing's IndexNow API for faster indexing
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

// Configuration
const SITE_URL = 'https://www.wpsio.com';
const INDEXNOW_KEY = 'wpsio-com-2025-indexnow-key';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// URLs to submit for indexing
const URLS_TO_SUBMIT = [
  'https://www.wpsio.com/',
  'https://www.wpsio.com/about',
  'https://www.wpsio.com/download',
  'https://www.wpsio.com/support',
  'https://www.wpsio.com/pricing',
  'https://www.wpsio.com/education',
  'https://www.wpsio.com/writer',
  'https://www.wpsio.com/spreadsheet',
  'https://www.wpsio.com/presentation',
  'https://www.wpsio.com/pdf',
  'https://www.wpsio.com/windows',
  'https://www.wpsio.com/mac',
  'https://www.wpsio.com/android',
  'https://www.wpsio.com/ios',
  'https://www.wpsio.com/linux',
  'https://www.wpsio.com/blog',
  'https://www.wpsio.com/blog/wps-office-2024-new-features',
  'https://www.wpsio.com/blog/excel-formulas-beginners-guide',
  'https://www.wpsio.com/blog/powerpoint-design-tips',
  'https://www.wpsio.com/blog/wps-office-2024',
  'https://www.wpsio.com/blog/excel'
];

/**
 * Submit URLs to IndexNow API
 */
async function submitToIndexNow() {
  console.log('🚀 Starting IndexNow submission to Bing...');
  console.log(`📝 Submitting ${URLS_TO_SUBMIT.length} URLs`);
  
  const payload = {
    host: 'www.wpsio.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/indexnow-key.txt`,
    urlList: URLS_TO_SUBMIT
  };

  const postData = JSON.stringify(payload);
  
  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      'User-Agent': 'WPS-IndexNow-Submitter/1.0'
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log(`📊 Response Status: ${res.statusCode}`);
        console.log(`📄 Response Headers:`, res.headers);
        
        if (res.statusCode === 200 || res.statusCode === 202) {
          console.log('✅ IndexNow submission successful!');
          console.log('📋 Submitted URLs:');
          URLS_TO_SUBMIT.forEach((url, index) => {
            console.log(`   ${index + 1}. ${url}`);
          });
          resolve({ success: true, status: res.statusCode, data });
        } else {
          console.log('❌ IndexNow submission failed');
          console.log('📄 Response:', data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Submit sitemap to Bing Webmaster Tools
 */
async function submitSitemapToBing() {
  console.log('\n🗺️  Submitting sitemap to Bing Webmaster Tools...');
  console.log('📋 Sitemap URL: https://www.wpsio.com/sitemap.xml');
  console.log('💡 To submit manually:');
  console.log('   1. Go to https://www.bing.com/webmasters');
  console.log('   2. Add your site: https://www.wpsio.com');
  console.log('   3. Verify ownership using BingSiteAuth.xml');
  console.log('   4. Submit sitemap: https://www.wpsio.com/sitemap.xml');
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('🎯 WPS Office - Bing IndexNow Submission');
    console.log('=====================================');
    
    // Submit to IndexNow API
    await submitToIndexNow();
    
    // Provide sitemap submission instructions
    await submitSitemapToBing();
    
    console.log('\n🎉 IndexNow submission completed!');
    console.log('⏰ Note: It may take 24-48 hours for URLs to appear in Bing search results');
    console.log('📈 Monitor your site\'s indexing status in Bing Webmaster Tools');
    
  } catch (error) {
    console.error('❌ Error during submission:', error.message);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { submitToIndexNow, submitSitemapToBing };
