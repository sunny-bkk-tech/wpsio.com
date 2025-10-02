#!/usr/bin/env node
/*
Backlink Discovery and Management Tool
Discovers potential backlink opportunities and helps manage outreach campaigns.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  outputDir: path.resolve(process.cwd(), 'reports/backlinks/discovery'),
  maxConcurrent: 5,
  delay: 1000, // 1 second delay between requests
  timeout: 10000, // 10 second timeout
  userAgent: 'Mozilla/5.0 (compatible; BacklinkDiscovery/1.0)'
};

// Southeast Asian business directories and publications
const SEA_TARGETS = {
  directories: [
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
    'philippinesbusinessdirectory.com',
    'businessdirectory.sg',
    'malaysia-business-directory.com',
    'thailand-business-directory.com',
    'indonesia-business-directory.com',
    'vietnam-business-directory.com',
    'philippines-business-directory.com'
  ],
  publications: [
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
    'mb.com.ph',
    'techinasia.com',
    'e27.co',
    'startupnews.asia'
  ],
  techBlogs: [
    'hardwarezone.com.sg',
    'soyacincau.com',
    'lowyat.net',
    'techgoondu.com',
    'techxcite.com',
    'detik.com',
    'vnexpress.net',
    'gmanetwork.com'
  ]
};

// Competitor analysis targets
const COMPETITORS = [
  'microsoft.com',
  'libreoffice.org',
  'openoffice.org',
  'google.com/docs',
  'zoho.com',
  'onlyoffice.com'
];

class BacklinkDiscovery {
  constructor() {
    this.results = {
      directories: [],
      publications: [],
      techBlogs: [],
      competitors: [],
      brokenLinks: [],
      resourcePages: [],
      generatedAt: new Date().toISOString()
    };
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: { 'User-Agent': CONFIG.userAgent },
          timeout: CONFIG.timeout
        });
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.delay(2000);
      }
    }
  }

  async checkDomainStatus(domain) {
    try {
      const url = `https://${domain}`;
      const response = await this.fetchWithRetry(url);
      
      return {
        domain,
        status: response.status,
        accessible: response.ok,
        title: await this.extractTitle(response),
        hasContactForm: await this.checkContactForm(response),
        hasAboutPage: await this.checkAboutPage(response),
        lastChecked: new Date().toISOString()
      };
    } catch (error) {
      return {
        domain,
        status: 'error',
        accessible: false,
        error: error.message,
        lastChecked: new Date().toISOString()
      };
    }
  }

  async extractTitle(response) {
    try {
      const html = await response.text();
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return titleMatch ? titleMatch[1].trim() : null;
    } catch {
      return null;
    }
  }

  async checkContactForm(response) {
    try {
      const html = await response.text();
      return /contact|about|reach|get.*touch/i.test(html);
    } catch {
      return false;
    }
  }

  async checkAboutPage(response) {
    try {
      const html = await response.text();
      return /about|company|team|story/i.test(html);
    } catch {
      return false;
    }
  }

  async discoverDirectories() {
    console.log('🔍 Discovering business directories...');
    
    for (const domain of SEA_TARGETS.directories) {
      console.log(`  Checking ${domain}...`);
      const result = await this.checkDomainStatus(domain);
      this.results.directories.push(result);
      await this.delay(CONFIG.delay);
    }
  }

  async discoverPublications() {
    console.log('📰 Discovering publications...');
    
    for (const domain of SEA_TARGETS.publications) {
      console.log(`  Checking ${domain}...`);
      const result = await this.checkDomainStatus(domain);
      this.results.publications.push(result);
      await this.delay(CONFIG.delay);
    }
  }

  async discoverTechBlogs() {
    console.log('💻 Discovering tech blogs...');
    
    for (const domain of SEA_TARGETS.techBlogs) {
      console.log(`  Checking ${domain}...`);
      const result = await this.checkDomainStatus(domain);
      this.results.techBlogs.push(result);
      await this.delay(CONFIG.delay);
    }
  }

  async analyzeCompetitors() {
    console.log('🏆 Analyzing competitors...');
    
    for (const domain of COMPETITORS) {
      console.log(`  Analyzing ${domain}...`);
      const result = await this.checkDomainStatus(domain);
      this.results.competitors.push(result);
      await this.delay(CONFIG.delay);
    }
  }

  async discoverBrokenLinks() {
    console.log('🔗 Discovering broken link opportunities...');
    
    // This would typically use a service like Ahrefs API or similar
    // For now, we'll create a placeholder structure
    this.results.brokenLinks = [
      {
        domain: 'example.com',
        brokenUrl: 'https://example.com/old-office-software',
        context: 'Office software recommendations page',
        opportunity: 'Replace with WPS Office link',
        priority: 'high'
      }
    ];
  }

  async discoverResourcePages() {
    console.log('📚 Discovering resource page opportunities...');
    
    // This would typically use a service to find resource pages
    // For now, we'll create a placeholder structure
    this.results.resourcePages = [
      {
        domain: 'example.com',
        page: '/resources/office-software',
        title: 'Best Office Software for Businesses',
        opportunity: 'Add WPS Office to the list',
        priority: 'high'
      }
    ];
  }

  generateOutreachList() {
    const outreachList = [];
    
    // Add accessible directories
    this.results.directories
      .filter(d => d.accessible)
      .forEach(d => {
        outreachList.push({
          domain: d.domain,
          type: 'directory',
          priority: 'high',
          action: 'Submit business listing',
          notes: `Title: ${d.title || 'N/A'}`
        });
      });
    
    // Add accessible publications
    this.results.publications
      .filter(p => p.accessible)
      .forEach(p => {
        outreachList.push({
          domain: p.domain,
          type: 'publication',
          priority: 'high',
          action: 'Pitch guest post',
          notes: `Title: ${p.title || 'N/A'}, Contact form: ${p.hasContactForm ? 'Yes' : 'No'}`
        });
      });
    
    // Add accessible tech blogs
    this.results.techBlogs
      .filter(t => t.accessible)
      .forEach(t => {
        outreachList.push({
          domain: t.domain,
          type: 'tech_blog',
          priority: 'medium',
          action: 'Pitch guest post or collaboration',
          notes: `Title: ${t.title || 'N/A'}, Contact form: ${t.hasContactForm ? 'Yes' : 'No'}`
        });
      });
    
    return outreachList;
  }

  generateBulkAddScript(outreachList) {
    const script = `#!/bin/bash
# Auto-generated backlink addition script
# Generated on ${new Date().toISOString()}

echo "Adding discovered backlink opportunities..."

`;
    
    outreachList.forEach((item, index) => {
      script += `# ${item.domain} - ${item.type} - ${item.priority}
yarn backlink:add --url "https://${item.domain}" --domain "${item.domain}" --type "${item.type}" --quality "${item.priority}" --notes "${item.action}: ${item.notes}"

`;
    });
    
    return script;
  }

  async saveResults() {
    // Ensure output directory exists
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    
    // Save discovery results
    const resultsPath = path.join(CONFIG.outputDir, 'discovery-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2), 'utf8');
    
    // Generate outreach list
    const outreachList = this.generateOutreachList();
    const outreachPath = path.join(CONFIG.outputDir, 'outreach-list.json');
    fs.writeFileSync(outreachPath, JSON.stringify(outreachList, null, 2), 'utf8');
    
    // Generate bulk add script
    const bulkScript = this.generateBulkAddScript(outreachList);
    const scriptPath = path.join(CONFIG.outputDir, 'bulk-add-backlinks.sh');
    fs.writeFileSync(scriptPath, bulkScript, 'utf8');
    
    // Make script executable
    fs.chmodSync(scriptPath, '755');
    
    return {
      resultsPath,
      outreachPath,
      scriptPath,
      totalOpportunities: outreachList.length
    };
  }

  displaySummary() {
    console.log('\n📊 Discovery Summary');
    console.log('==================');
    console.log(`Directories: ${this.results.directories.filter(d => d.accessible).length}/${this.results.directories.length} accessible`);
    console.log(`Publications: ${this.results.publications.filter(p => p.accessible).length}/${this.results.publications.length} accessible`);
    console.log(`Tech Blogs: ${this.results.techBlogs.filter(t => t.accessible).length}/${this.results.techBlogs.length} accessible`);
    console.log(`Competitors: ${this.results.competitors.filter(c => c.accessible).length}/${this.results.competitors.length} accessible`);
    
    const outreachList = this.generateOutreachList();
    console.log(`\n🎯 Total Outreach Opportunities: ${outreachList.length}`);
    
    const byType = outreachList.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n📈 By Type:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });
    
    const byPriority = outreachList.reduce((acc, item) => {
      acc[item.priority] = (acc[item.priority] || 0) + 1;
      return acc;
    }, {});
    
    console.log('\n⭐ By Priority:');
    Object.entries(byPriority).forEach(([priority, count]) => {
      console.log(`  ${priority}: ${count}`);
    });
  }

  async run() {
    console.log('🚀 Starting backlink discovery...');
    console.log(`Output directory: ${CONFIG.outputDir}`);
    
    try {
      await this.discoverDirectories();
      await this.discoverPublications();
      await this.discoverTechBlogs();
      await this.analyzeCompetitors();
      await this.discoverBrokenLinks();
      await this.discoverResourcePages();
      
      const savedFiles = await this.saveResults();
      
      this.displaySummary();
      
      console.log('\n💾 Files saved:');
      console.log(`  Results: ${savedFiles.resultsPath}`);
      console.log(`  Outreach list: ${savedFiles.outreachPath}`);
      console.log(`  Bulk script: ${savedFiles.scriptPath}`);
      
      console.log('\n🔧 Next steps:');
      console.log('1. Review the outreach list in reports/backlinks/discovery/outreach-list.json');
      console.log('2. Run the bulk add script: bash reports/backlinks/discovery/bulk-add-backlinks.sh');
      console.log('3. Start outreach campaigns based on the discovered opportunities');
      
    } catch (error) {
      console.error('❌ Discovery failed:', error.message);
      process.exit(1);
    }
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Backlink Discovery Tool

Usage:
  node backlink-discovery.js [options]

Options:
  --help, -h          Show this help message
  --directories       Only discover business directories
  --publications      Only discover publications
  --tech-blogs        Only discover tech blogs
  --competitors       Only analyze competitors
  --all               Discover all opportunities (default)

Examples:
  node backlink-discovery.js --all
  node backlink-discovery.js --directories --publications
    `);
    return;
  }
  
  const discovery = new BacklinkDiscovery();
  
  if (args.includes('--directories')) {
    discovery.discoverDirectories().then(() => {
      discovery.saveResults();
      discovery.displaySummary();
    });
  } else if (args.includes('--publications')) {
    discovery.discoverPublications().then(() => {
      discovery.saveResults();
      discovery.displaySummary();
    });
  } else if (args.includes('--tech-blogs')) {
    discovery.discoverTechBlogs().then(() => {
      discovery.saveResults();
      discovery.displaySummary();
    });
  } else if (args.includes('--competitors')) {
    discovery.analyzeCompetitors().then(() => {
      discovery.saveResults();
      discovery.displaySummary();
    });
  } else {
    // Run all discoveries
    discovery.run();
  }
}

main();
