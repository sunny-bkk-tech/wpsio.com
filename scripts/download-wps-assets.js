#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WPS_FULL_SITE_DIR = path.join(__dirname, '..', 'wps_full_site');
const HTML_FILES = [
  '012_download_.html',
  '001_index.html',
  '029_cookie-declaration_.html'
];

// Function to extract all WPS CDN URLs from HTML content
function extractWpsUrls(htmlContent) {
  const urls = [];
  // More specific regex to capture only the filename up to common file extensions
  const urlRegex = /https:\/\/website-prod\.cache\.wpscdn\.com\/img\/([^"'\s]+\.(?:png|jpg|jpeg|svg|gif|webp))/g;
  let match;

  while ((match = urlRegex.exec(htmlContent)) !== null) {
    const filename = match[1];
    // Skip if filename is too long (likely captured extra content)
    if (filename.length < 200 && !filename.includes(')') && !filename.includes('}')) {
      urls.push(filename);
    }
  }

  return urls;
}

// Function to check if file exists locally
function fileExists(filename) {
  const filePath = path.join(WPS_FULL_SITE_DIR, filename);
  return fs.existsSync(filePath);
}

// Function to download a file from WPS CDN
function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const url = `https://website-prod.cache.wpscdn.com/img/${filename}`;
    const filePath = path.join(WPS_FULL_SITE_DIR, filename);

    console.log(`Downloading: ${filename}`);

    const file = fs.createWriteStream(filePath);
    const request = https.get(url, { timeout: 10000 }, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {}); // Delete the file on error
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
    });

    request.on('timeout', () => {
      request.destroy();
      file.close();
      fs.unlink(filePath, () => {});
      reject(new Error('Timeout'));
    });

    request.on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(err);
    });

    file.on('error', (err) => {
      file.close();
      fs.unlink(filePath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Main function
async function main() {
  console.log('🔍 Scanning HTML files for WPS CDN assets...\n');

  const allFiles = new Set();

  // Scan all HTML files for WPS CDN URLs
  for (const htmlFile of HTML_FILES) {
    const htmlPath = path.join(WPS_FULL_SITE_DIR, htmlFile);

    if (!fs.existsSync(htmlPath)) {
      console.log(`⚠️  HTML file not found: ${htmlFile}`);
      continue;
    }

    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const urls = extractWpsUrls(htmlContent);

    urls.forEach(url => allFiles.add(url));
    console.log(`📄 ${htmlFile}: Found ${urls.length} WPS CDN assets`);
  }

  console.log(`\n📊 Total unique assets found: ${allFiles.size}\n`);

  // Check which files are missing and download them
  const missingFiles = Array.from(allFiles).filter(filename => !fileExists(filename));

  if (missingFiles.length === 0) {
    console.log('✅ All assets are already downloaded!');
    return;
  }

  console.log(`📥 Downloading ${missingFiles.length} missing assets...\n`);

  const downloadPromises = missingFiles.map(filename => downloadFile(filename));

  try {
    const results = await Promise.allSettled(downloadPromises);

    // Check results
    let successCount = 0;
    let failureCount = 0;

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successCount++;
      } else {
        failureCount++;
        console.error(`❌ Failed to download: ${missingFiles[index]} - ${result.reason?.message || 'Unknown error'}`);
      }
    });

    console.log(`\n🎉 Download complete!`);
    console.log(`✅ Successfully downloaded: ${successCount} files`);
    if (failureCount > 0) {
      console.log(`❌ Failed to download: ${failureCount} files`);
    }

  } catch (error) {
    console.error('💥 Error during download process:', error);
  }
}

// Run the script
main().catch(console.error);
