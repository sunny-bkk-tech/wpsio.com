#!/usr/bin/env node

/**
 * Script to verify all pages have exactly one H1 tag
 * SEO Best Practice: Each page should have exactly 1 H1 tag
 */

const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'index.html', name: 'Home (index.html)' },
  { file: 'src/pages/Home.tsx', name: 'Home (React)' },
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
  { file: 'src/pages/BlogPost.tsx', name: 'BlogPost' },
  { file: 'src/pages/PrivacyPolicy.tsx', name: 'Privacy Policy' },
  { file: 'src/pages/TermsOfUse.tsx', name: 'Terms of Use' },
  { file: 'src/pages/TechSpecs.tsx', name: 'Tech Specs' },
  { file: 'src/pages/Partners.tsx', name: 'Partners' }
];

console.log('\n📊 H1 Tag Verification\n');
console.log('=' .repeat(80));
console.log('SEO Best Practice: Each page should have exactly 1 H1 tag\n');

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
  
  // Count H1 tags
  // Match both <h1> and <h1 style="..."> patterns
  // Exclude H1s inside comments and noscript tags for the main count
  let h1Count = 0;
  let h1Texts = [];
  
  // Remove noscript content for accurate H1 counting (noscript H1s don't count for SEO)
  let contentWithoutNoscript = content;
  const noscriptMatch = content.match(/<noscript>[\s\S]*?<\/noscript>/gi);
  if (noscriptMatch) {
    noscriptMatch.forEach(ns => {
      contentWithoutNoscript = contentWithoutNoscript.replace(ns, '');
    });
  }
  
  // Match H1 tags (direct or via PageWithH1 component)
  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const pageWithH1Regex = /<PageWithH1[^>]*h1Text=["']([^"']+)["']/gi;
  
  let match;
  
  // Check for direct H1 tags
  while ((match = h1Regex.exec(contentWithoutNoscript)) !== null) {
    h1Count++;
    // Extract text content (remove HTML tags)
    const h1Text = match[1].replace(/<[^>]+>/g, '').trim();
    h1Texts.push(h1Text.substring(0, 80) + (h1Text.length > 80 ? '...' : ''));
  }
  
  // Also check for PageWithH1 component usage
  while ((match = pageWithH1Regex.exec(content)) !== null) {
    if (h1Count === 0) {  // Only count if no direct H1 was found
      h1Count++;
      const h1Text = match[1];
      h1Texts.push(h1Text.substring(0, 80) + (h1Text.length > 80 ? '...' : ''));
    }
  }

  totalPages++;
  
  let status;
  let icon;
  if (h1Count === 1) {
    status = 'PASS';
    icon = '✅';
    passedPages++;
  } else if (h1Count === 0) {
    status = 'NO H1';
    icon = '❌';
    failedPages++;
  } else {
    status = 'MULTIPLE H1s';
    icon = '❌';
    failedPages++;
  }

  console.log(`${icon} ${status.padEnd(15)} | ${name.padEnd(25)} | ${h1Count} H1 tag(s)`);
  
  if (h1Texts.length > 0 && h1Count <= 2) {
    h1Texts.forEach((text, idx) => {
      console.log(`   ${''.padEnd(15)} | ${''.padEnd(25)} | ${idx + 1}. "${text}"`);
    });
  }
  
  results.push({ name, h1Count, status, h1Texts, file });
});

console.log('\n' + '='.repeat(80));
console.log(`\n📈 Summary:`);
console.log(`   Total pages checked: ${totalPages}`);
console.log(`   ✅ Passed (1 H1 tag): ${passedPages}`);
console.log(`   ❌ Failed (0 or multiple H1s): ${failedPages}`);
console.log(`   Success rate: ${((passedPages / totalPages) * 100).toFixed(1)}%\n`);

// Show detailed issues
const failed = results.filter(r => r.status !== 'PASS');
if (failed.length > 0) {
  console.log('⚠️  Pages needing attention:\n');
  failed.forEach(({ name, h1Count, h1Texts }) => {
    console.log(`   ${name}: ${h1Count} H1 tag(s)`);
    if (h1Count > 1) {
      h1Texts.forEach((text, idx) => {
        console.log(`      ${idx + 1}. "${text}"`);
      });
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

const reportPath = path.join(__dirname, '..', 'reports', 'h1-tags-audit.json');
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`📄 Full report saved to: reports/h1-tags-audit.json\n`);

// Exit with appropriate code
process.exit(failedPages > 0 ? 1 : 0);

