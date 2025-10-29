#!/usr/bin/env node

/**
 * Quick Backlink Building Script for wpsio.com
 * This script helps you get started with the most important directory submissions
 */

const SITE_URL = 'https://www.wpsio.com';
const SITE_NAME = 'WPS Office中文版';
const SITE_DESCRIPTION = '免费下载WPS Office中文版！完美兼容Microsoft Office，支持Word、Excel、PPT文档编辑。适用于Windows、Mac、Linux、Android和iOS。';

console.log('🚀 WPS Office - Backlink Building Quick Start');
console.log('=============================================');
console.log(`📝 Site: ${SITE_NAME}`);
console.log(`🌐 URL: ${SITE_URL}`);
console.log(`📄 Description: ${SITE_DESCRIPTION}`);
console.log('');

console.log('🎯 PHASE 1: Software Directories (Start Here!)');
console.log('===============================================');
console.log('');

const directories = [
  {
    name: 'Softpedia',
    url: 'https://www.softpedia.com/get/Office-tools/Office-suites/WPS-Office.shtml',
    priority: 'HIGH',
    instructions: 'Submit as "WPS Office Alternative" - Free office suite'
  },
  {
    name: 'AlternativeTo',
    url: 'https://alternativeto.net/software/wps-office/',
    priority: 'HIGH',
    instructions: 'Submit as Microsoft Office alternative'
  },
  {
    name: 'FileHippo',
    url: 'https://filehippo.com/download_wps-office/',
    priority: 'HIGH',
    instructions: 'Submit as free office software'
  },
  {
    name: 'CNET Download',
    url: 'https://download.cnet.com/WPS-Office/',
    priority: 'HIGH',
    instructions: 'Submit as office productivity software'
  },
  {
    name: 'GetApp',
    url: 'https://www.getapp.com/office-productivity-software/a/wps-office/',
    priority: 'MEDIUM',
    instructions: 'Submit as business software'
  },
  {
    name: 'SourceForge',
    url: 'https://sourceforge.net/projects/wps-office/',
    priority: 'MEDIUM',
    instructions: 'Submit as open source office suite'
  }
];

directories.forEach((dir, index) => {
  console.log(`${index + 1}. ${dir.name} (${dir.priority} Priority)`);
  console.log(`   URL: ${dir.url}`);
  console.log(`   Instructions: ${dir.instructions}`);
  console.log('');
});

console.log('🎯 PHASE 2: Social Media Profiles (Quick Wins!)');
console.log('================================================');
console.log('');

const socialProfiles = [
  {
    platform: 'LinkedIn Company Page',
    url: 'https://www.linkedin.com/company/wpsio',
    instructions: 'Create company page with website link'
  },
  {
    platform: 'Facebook Business Page',
    url: 'https://www.facebook.com/wpsio',
    instructions: 'Create business page with website link'
  },
  {
    platform: 'Twitter Business Account',
    url: 'https://twitter.com/wpsio',
    instructions: 'Create business account with website link'
  },
  {
    platform: 'Instagram Business',
    url: 'https://www.instagram.com/wpsio',
    instructions: 'Create business profile with website link'
  },
  {
    platform: 'YouTube Channel',
    url: 'https://www.youtube.com/@wpsio',
    instructions: 'Create channel with website link in description'
  }
];

socialProfiles.forEach((profile, index) => {
  console.log(`${index + 1}. ${profile.platform}`);
  console.log(`   URL: ${profile.url}`);
  console.log(`   Instructions: ${profile.instructions}`);
  console.log('');
});

console.log('🎯 PHASE 3: Business Directories');
console.log('===============================');
console.log('');

const businessDirectories = [
  {
    name: 'Google My Business',
    url: 'https://business.google.com/',
    instructions: 'Create business listing with website'
  },
  {
    name: 'Yelp',
    url: 'https://www.yelp.com/',
    instructions: 'Create business profile with website'
  },
  {
    name: 'Yellow Pages',
    url: 'https://www.yellowpages.com/',
    instructions: 'Create business listing with website'
  },
  {
    name: 'Better Business Bureau',
    url: 'https://www.bbb.org/',
    instructions: 'Create business profile with website'
  }
];

businessDirectories.forEach((dir, index) => {
  console.log(`${index + 1}. ${dir.name}`);
  console.log(`   URL: ${dir.url}`);
  console.log(`   Instructions: ${dir.instructions}`);
  console.log('');
});

console.log('📊 SUCCESS METRICS TO TRACK');
console.log('===========================');
console.log('');

const metrics = [
  'Backlink count in Bing Webmaster Tools',
  'Domain authority growth',
  'Bing search result appearances',
  'Social media profile growth',
  'Directory listing confirmations'
];

metrics.forEach((metric, index) => {
  console.log(`${index + 1}. ${metric}`);
});

console.log('');
console.log('⏰ TIMELINE EXPECTATIONS');
console.log('=======================');
console.log('');
console.log('Week 1-2: Submit to directories and create social profiles');
console.log('Week 3-4: Start seeing initial backlinks in Bing Webmaster Tools');
console.log('Month 2: Site should start appearing in Bing search results');
console.log('Month 3: Significant improvement in Bing rankings');
console.log('');

console.log('🎉 NEXT STEPS:');
console.log('==============');
console.log('1. Start with HIGH priority software directories');
console.log('2. Create social media profiles');
console.log('3. Monitor progress in Bing Webmaster Tools');
console.log('4. Continue building backlinks consistently');
console.log('');

console.log('💡 TIP: Focus on quality over quantity. Better to have 10 high-quality');
console.log('   backlinks than 100 low-quality ones.');
console.log('');

console.log('📞 Need help? Check the BACKLINK_BUILDING_STRATEGY.md file for detailed');
console.log('   instructions and advanced strategies.');
