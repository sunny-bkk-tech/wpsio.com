#!/usr/bin/env node

/**
 * Script to verify all meta descriptions are between 150-160 characters
 * Recommended by Bing Webmaster Tools for optimal SEO
 */

const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'src/pages/Home.tsx', name: 'Home' },
  { file: 'src/pages/About.tsx', name: 'About' },
  { file: 'src/pages/Download.tsx', name: 'Download' },
  { file: 'src/pages/WpsOfficeDownload.tsx', name: 'WPS Office Download' },
  { file: 'src/pages/WpsVsMicrosoft.tsx', name: 'WPS vs Microsoft' },
  { file: 'src/pages/Writer.tsx', name: 'Writer' },
  { file: 'src/pages/Spreadsheet.tsx', name: 'Spreadsheet' },
  { file: 'src/pages/Presentation.tsx', name: 'Presentation' },
  { file: 'src/pages/PDF.tsx', name: 'PDF' },
  { file: 'src/pages/Windows.tsx', name: 'Windows' },
  { file: 'src/pages/Mac.tsx', name: 'Mac' },
  { file: 'src/pages/Linux.tsx', name: 'Linux' },
  { file: 'src/pages/Android.tsx', name: 'Android' },
  { file: 'src/pages/iOS.tsx', name: 'iOS' },
  { file: 'src/pages/Support.tsx', name: 'Support' },
  { file: 'src/pages/Pricing.tsx', name: 'Pricing' },
  { file: 'src/pages/Education.tsx', name: 'Education' },
  { file: 'src/pages/Templates.tsx', name: 'Templates' },
  { file: 'src/pages/Blog.tsx', name: 'Blog' },
  { file: 'src/pages/PrivacyPolicy.tsx', name: 'Privacy Policy' },
  { file: 'src/pages/TermsOfUse.tsx', name: 'Terms of Use' },
  { file: 'src/pages/TechSpecs.tsx', name: 'Tech Specs' },
  { file: 'src/pages/Partners.tsx', name: 'Partners' },
  { file: 'index.html', name: 'index.html (static)' }
];

console.log('\n📊 Meta Description Length Verification\n');
console.log('=' .repeat(80));
console.log('Optimal range: 150-160 characters (recommended by Bing)\n');

let totalPages = 0;
let passedPages = 0;
let failedPages = 0;
const results = [];

pages.forEach(({ file, name }) => {
  const filePath = path.join(__dirname, '..', file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  SKIP: ${name} - File not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract description from useSEO or meta tag
  let description = null;
  
  if (file.endsWith('.html')) {
    const metaMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"\s*\/>/);
    if (metaMatch) {
      description = metaMatch[1];
    }
  } else {
    // Look for description inside useSEO block (match first description field after useSEO)
    const useSEOIndex = content.indexOf('useSEO(');
    if (useSEOIndex !== -1) {
      const afterUseSEO = content.substring(useSEOIndex);
      const descMatch = afterUseSEO.match(/^\s*useSEO\s*\(\s*\{[\s\S]*?description:\s*['"]([^'"]+)['"]/);
      if (descMatch) {
        description = descMatch[1];
      }
    }
  }

  if (!description) {
    console.log(`❌ FAIL: ${name} - No description found`);
    failedPages++;
    results.push({ name, length: 0, status: 'MISSING', description: null });
    return;
  }

  const length = description.length;
  totalPages++;
  
  let status;
  let icon;
  if (length >= 150 && length <= 160) {
    status = 'PERFECT';
    icon = '✅';
    passedPages++;
  } else if (length >= 140 && length < 150) {
    status = 'GOOD';
    icon = '✓';
    passedPages++;
  } else if (length > 160 && length <= 170) {
    status = 'ACCEPTABLE';
    icon = '⚠️';
    passedPages++;
  } else if (length < 140) {
    status = 'TOO SHORT';
    icon = '❌';
    failedPages++;
  } else {
    status = 'TOO LONG';
    icon = '❌';
    failedPages++;
  }

  console.log(`${icon} ${status.padEnd(12)} | ${name.padEnd(25)} | ${length} chars`);
  results.push({ name, length, status, description });
});

console.log('\n' + '='.repeat(80));
console.log(`\n📈 Summary:`);
console.log(`   Total pages checked: ${totalPages}`);
console.log(`   ✅ Passed (140-170 chars): ${passedPages}`);
console.log(`   ❌ Failed (outside range): ${failedPages}`);
console.log(`   Success rate: ${((passedPages / totalPages) * 100).toFixed(1)}%\n`);

// Show detailed issues
const failed = results.filter(r => r.status === 'TOO SHORT' || r.status === 'TOO LONG');
if (failed.length > 0) {
  console.log('⚠️  Pages needing attention:\n');
  failed.forEach(({ name, length, description }) => {
    console.log(`   ${name}: ${length} chars`);
    if (description && description.length < 100) {
      console.log(`   "${description}"`);
    }
  });
  console.log();
}

// Save report
const report = {
  timestamp: new Date().toISOString(),
  summary: {
    total: totalPages,
    passed: passedPages,
    failed: failedPages,
    successRate: ((passedPages / totalPages) * 100).toFixed(1)
  },
  results
};

const reportPath = path.join(__dirname, '..', 'reports', 'meta-descriptions-audit.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`📄 Full report saved to: reports/meta-descriptions-audit.json\n`);

// Exit with appropriate code
process.exit(failedPages > 0 ? 1 : 0);

