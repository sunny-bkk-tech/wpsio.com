#!/usr/bin/env node

/**
 * Check Softpedia Search Results for wpsio.com
 * This script helps extract and analyze the 621 search results
 */

const SEARCH_TERM = 'www.wpsio.com';
const SOFTPEDIA_SEARCH_URL = `https://www.softpedia.com/dyn-search.php?search_term=${encodeURIComponent(SEARCH_TERM)}`;

console.log('🔍 Softpedia Search Results Analyzer');
console.log('=====================================');
console.log(`📋 Search Term: ${SEARCH_TERM}`);
console.log(`🔗 Search URL: ${SOFTPEDIA_SEARCH_URL}`);
console.log('');

console.log('📝 HOW TO GET THE 621 RESULTS:');
console.log('==============================');
console.log('');
console.log('1. Open your browser and go to:');
console.log(`   ${SOFTPEDIA_SEARCH_URL}`);
console.log('');
console.log('2. The search results page will show the list of 621 results');
console.log('');
console.log('3. Each result URL will look like:');
console.log('   https://www.softpedia.com/get/Office-tools/[category]/[software-name].shtml');
console.log('');
console.log('4. To extract URLs from the page:');
console.log('   - Right-click on the page → "View Page Source"');
console.log('   - Press Ctrl+F (Cmd+F on Mac)');
console.log('   - Search for: ".shtml"');
console.log('   - You\'ll see all the result URLs');
console.log('');

console.log('🔍 BROWSER CONSOLE METHOD (RECOMMENDED):');
console.log('=========================================');
console.log('');
console.log('1. Visit the search results page in your browser:');
console.log(`   ${SOFTPEDIA_SEARCH_URL}`);
console.log('');
console.log('2. Press F12 (or right-click → Inspect)');
console.log('');
console.log('3. Go to Console tab');
console.log('');
console.log('4. Run this JavaScript code:');
console.log('');
console.log('// Extract all .shtml links');
console.log('var links = Array.from(document.querySelectorAll("a[href*=\'.shtml\']"));');
console.log('var urls = links.map(link => link.href).filter((v, i, a) => a.indexOf(v) === i);');
console.log('console.log("Found " + urls.length + " unique URLs");');
console.log('urls.forEach((url, index) => console.log((index + 1) + ". " + url));');
console.log('');
console.log('5. Copy all the URLs to a text file');
console.log('');

console.log('✅ WHAT TO CHECK:');
console.log('================');
console.log('');
console.log('For each result URL, check if it contains:');
console.log('  ✓ A direct link to https://www.wpsio.com');
console.log('  ✓ "Download from www.wpsio.com" link');
console.log('  ✓ "Visit Website: www.wpsio.com" link');
console.log('');
console.log('If a result ONLY mentions "wpsio.com" without a link,');
console.log('it does NOT count as a backlink for Bing.');
console.log('');

console.log('🎯 QUICK CHECK:');
console.log('===============');
console.log('');
console.log('To quickly check if ANY result links to your site:');
console.log('  1. Visit a few random results from the 621');
console.log('  2. Press Ctrl+F (Cmd+F) on each page');
console.log('  3. Search for: "wpsio.com"');
console.log('  4. See if it\'s a clickable link or just text');
console.log('');

console.log('📊 NEXT STEPS:');
console.log('=============');
console.log('');
console.log('1. Extract the 621 result URLs using browser console method');
console.log('2. Check which ones actually link to www.wpsio.com');
console.log('3. If none link to your site, you need to submit to Softpedia');
console.log('4. Submit at: https://www.softpedia.com/get/Office-tools/Office-suites/');
console.log('');

console.log('💡 TIP:');
console.log('=======');
console.log('The 621 results might be:');
console.log('  - Other software mentioning "wpsio.com" in descriptions');
console.log('  - Generic WPS Office listings (not your specific site)');
console.log('  - False positives from the search algorithm');
console.log('');
console.log('Focus on finding results that LINK to your site, not just mention it.');
console.log('');
