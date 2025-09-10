#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WPS_FULL_SITE_DIR = path.join(__dirname, '..', 'public', 'wps_full_site');
const HTML_FILES = [
  '012_download_.html',
  '001_index.html',
  '029_cookie-declaration_.html'
];

// Function to update WPS CDN URLs to local paths
function updateWpsUrls(htmlContent) {
  let updated = htmlContent;

  // Replace all website-prod.cache.wpscdn.com URLs with local paths
  updated = updated.replace(
    /https:\/\/website-prod\.cache\.wpscdn\.com\/img\/([^"'\s]+)/g,
    '/wps_full_site/$1'
  );

  return updated;
}

// Function to count replacements in content
function countReplacements(original, updated) {
  const originalMatches = original.match(/https:\/\/website-prod\.cache\.wpscdn\.com\/img\//g) || [];
  const updatedMatches = updated.match(/\/wps_full_site\//g) || [];
  return originalMatches.length;
}

// Main function
async function main() {
  console.log('🔄 Updating HTML files to use local WPS asset paths...\n');

  let totalReplacements = 0;
  let totalFilesUpdated = 0;

  for (const htmlFile of HTML_FILES) {
    const htmlPath = path.join(WPS_FULL_SITE_DIR, htmlFile);

    if (!fs.existsSync(htmlPath)) {
      console.log(`⚠️  HTML file not found: ${htmlFile}`);
      continue;
    }

    const originalContent = fs.readFileSync(htmlPath, 'utf8');
    const updatedContent = updateWpsUrls(originalContent);
    const replacements = countReplacements(originalContent, updatedContent);

    if (replacements > 0) {
      fs.writeFileSync(htmlPath, updatedContent, 'utf8');
      console.log(`✅ ${htmlFile}: Updated ${replacements} URLs`);
      totalReplacements += replacements;
      totalFilesUpdated++;
    } else {
      console.log(`📋 ${htmlFile}: No changes needed`);
    }
  }

  console.log(`\n🎉 Update complete!`);
  console.log(`📊 Total files updated: ${totalFilesUpdated}`);
  console.log(`🔗 Total URLs updated: ${totalReplacements}`);

  if (totalReplacements > 0) {
    console.log(`\n💡 All WPS CDN URLs have been replaced with local paths:`);
    console.log(`   https://website-prod.cache.wpscdn.com/img/ → /wps_full_site/`);
  }
}

// Run the script
main().catch(console.error);
