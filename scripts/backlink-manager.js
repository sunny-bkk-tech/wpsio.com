#!/usr/bin/env node
/*
Advanced Backlink Manager
Integrates with external APIs and services for comprehensive backlink management.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Configuration
const CONFIG = {
  outputDir: path.resolve(process.cwd(), 'reports/backlinks/management'),
  maxConcurrent: 3,
  delay: 2000, // 2 second delay between requests
  timeout: 15000, // 15 second timeout
  userAgent: 'Mozilla/5.0 (compatible; BacklinkManager/1.0)'
};

// API Keys (set in .env file) - Optional, tools work without them
const API_KEYS = {
  ahrefs: process.env.AHREFS_API_KEY || null,
  majestic: process.env.MAJESTIC_API_KEY || null,
  moz: process.env.MOZ_API_KEY || null,
  serpapi: process.env.SERPAPI_KEY || null,
  hunter: process.env.HUNTER_API_KEY || null
};

class BacklinkManager {
  constructor() {
    this.results = {
      discovered: [],
      analyzed: [],
      outreach: [],
      generatedAt: new Date().toISOString()
    };
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'User-Agent': CONFIG.userAgent,
            ...options.headers
          },
          timeout: CONFIG.timeout
        });
        return response;
      } catch (error) {
        if (i === retries - 1) throw error;
        await this.delay(2000 * (i + 1));
      }
    }
  }

  // Ahrefs API integration for competitor analysis
  async analyzeWithAhrefs(domain) {
    if (!API_KEYS.ahrefs) {
      console.log('⚠️  Ahrefs API key not found. Skipping Ahrefs analysis.');
      return null;
    }

    try {
      const url = `https://apiv2.ahrefs.com/v2/backlinks`;
      const params = new URLSearchParams({
        target: domain,
        mode: 'domain',
        limit: 100,
        order_by: 'ahrefs_rank:desc'
      });

      const response = await this.fetchWithRetry(`${url}?${params}`, {
        headers: {
          'Authorization': `Bearer ${API_KEYS.ahrefs}`
        }
      });

      if (!response.ok) {
        throw new Error(`Ahrefs API error: ${response.status}`);
      }

      const data = await response.json();
      return {
        source: 'ahrefs',
        domain,
        backlinks: data.backlinks || [],
        total: data.total || 0,
        analyzedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Ahrefs analysis failed for ${domain}:`, error.message);
      return null;
    }
  }

  // Majestic API integration for backlink analysis
  async analyzeWithMajestic(domain) {
    if (!API_KEYS.majestic) {
      console.log('⚠️  Majestic API key not found. Skipping Majestic analysis.');
      return null;
    }

    try {
      const url = `https://api.majestic.com/api/json`;
      const params = new URLSearchParams({
        app_api_key: API_KEYS.majestic,
        cmd: 'GetBackLinkData',
        item: domain,
        Count: 100,
        Mode: 0
      });

      const response = await this.fetchWithRetry(`${url}?${params}`);
      const data = await response.json();

      return {
        source: 'majestic',
        domain,
        backlinks: data.DataTables.BackLinks.Data || [],
        total: data.DataTables.BackLinks.Data?.length || 0,
        analyzedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Majestic analysis failed for ${domain}:`, error.message);
      return null;
    }
  }

  // Free email discovery using common patterns
  async findContactEmails(domain) {
    try {
      const url = `https://${domain}`;
      const response = await this.fetchWithRetry(url);
      
      if (!response.ok) {
        return {
          domain,
          emails: [],
          total: 0,
          discoveredAt: new Date().toISOString(),
          method: 'free_pattern_matching'
        };
      }

      const html = await response.text();
      const emails = this.extractEmailsFromHTML(html);
      
      // Also try common contact page patterns
      const contactEmails = await this.findContactPageEmails(domain);
      const allEmails = [...new Set([...emails, ...contactEmails])];

      return {
        domain,
        emails: allEmails,
        total: allEmails.length,
        discoveredAt: new Date().toISOString(),
        method: 'free_pattern_matching'
      };
    } catch (error) {
      console.error(`Email discovery failed for ${domain}:`, error.message);
      return {
        domain,
        emails: [],
        total: 0,
        error: error.message,
        discoveredAt: new Date().toISOString(),
        method: 'free_pattern_matching'
      };
    }
  }

  extractEmailsFromHTML(html) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = html.match(emailRegex) || [];
    
    // Filter out common non-contact emails
    const filteredEmails = emails.filter(email => {
      const lowerEmail = email.toLowerCase();
      return !lowerEmail.includes('noreply') && 
             !lowerEmail.includes('no-reply') &&
             !lowerEmail.includes('donotreply') &&
             !lowerEmail.includes('example.com') &&
             !lowerEmail.includes('test.com');
    });
    
    return [...new Set(filteredEmails)];
  }

  async findContactPageEmails(domain) {
    const contactPages = [
      '/contact',
      '/contact-us',
      '/about',
      '/about-us',
      '/team',
      '/staff',
      '/info'
    ];

    const emails = [];
    
    for (const page of contactPages) {
      try {
        const url = `https://${domain}${page}`;
        const response = await this.fetchWithRetry(url);
        
        if (response.ok) {
          const html = await response.text();
          const pageEmails = this.extractEmailsFromHTML(html);
          emails.push(...pageEmails);
        }
        
        await this.delay(500); // Small delay between requests
      } catch (error) {
        // Continue to next page if this one fails
        continue;
      }
    }
    
    return [...new Set(emails)];
  }

  // Free resource page discovery using DuckDuckGo
  async findResourcePages(keywords) {
    console.log('🔍 Using free resource page discovery (DuckDuckGo)...');
    const resourcePages = [];

    for (const keyword of keywords) {
      try {
        const searchResults = await this.searchDuckDuckGo(keyword);
        
        searchResults.forEach(result => {
          if (this.isResourcePage(result.title, result.snippet)) {
            resourcePages.push({
              title: result.title,
              url: result.url,
              snippet: result.snippet,
              keyword: keyword,
              discoveredAt: new Date().toISOString(),
              method: 'duckduckgo_free'
            });
          }
        });

        await this.delay(CONFIG.delay);
      } catch (error) {
        console.error(`Resource page discovery failed for "${keyword}":`, error.message);
      }
    }

    return resourcePages;
  }

  async searchDuckDuckGo(query) {
    try {
      // Use DuckDuckGo's instant answer API (free)
      const url = `https://api.duckduckgo.com/`;
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        no_html: '1',
        skip_disambig: '1'
      });

      const response = await this.fetchWithRetry(`${url}?${params}`);
      const data = await response.json();

      const results = [];
      
      // Extract related topics
      if (data.RelatedTopics) {
        data.RelatedTopics.forEach(topic => {
          if (topic.FirstURL && topic.Text) {
            results.push({
              title: topic.Text.split(' - ')[0] || topic.Text,
              url: topic.FirstURL,
              snippet: topic.Text
            });
          }
        });
      }

      // Extract abstract if available
      if (data.AbstractURL && data.Abstract) {
        results.push({
          title: data.Heading || query,
          url: data.AbstractURL,
          snippet: data.Abstract
        });
      }

      return results.slice(0, 10); // Limit to 10 results
    } catch (error) {
      console.error(`DuckDuckGo search failed for "${query}":`, error.message);
      return [];
    }
  }

  isResourcePage(title, snippet) {
    const resourceKeywords = [
      'best', 'top', 'list', 'resources', 'tools', 'software', 'recommendations',
      'directory', 'guide', 'comparison', 'review', 'alternatives'
    ];

    const text = `${title} ${snippet}`.toLowerCase();
    return resourceKeywords.some(keyword => text.includes(keyword));
  }

  // Analyze domain authority and metrics
  async analyzeDomainMetrics(domain) {
    try {
      const url = `https://${domain}`;
      const response = await this.fetchWithRetry(url);
      
      if (!response.ok) {
        return {
          domain,
          accessible: false,
          status: response.status,
          analyzedAt: new Date().toISOString()
        };
      }

      const html = await response.text();
      const title = this.extractTitle(html);
      const description = this.extractDescription(html);
      const hasContactForm = this.hasContactForm(html);
      const hasAboutPage = this.hasAboutPage(html);
      const socialLinks = this.extractSocialLinks(html);

      return {
        domain,
        accessible: true,
        status: response.status,
        title,
        description,
        hasContactForm,
        hasAboutPage,
        socialLinks,
        analyzedAt: new Date().toISOString()
      };
    } catch (error) {
      return {
        domain,
        accessible: false,
        error: error.message,
        analyzedAt: new Date().toISOString()
      };
    }
  }

  extractTitle(html) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return titleMatch ? titleMatch[1].trim() : null;
  }

  extractDescription(html) {
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    return descMatch ? descMatch[1].trim() : null;
  }

  hasContactForm(html) {
    return /contact|about|reach|get.*touch/i.test(html);
  }

  hasAboutPage(html) {
    return /about|company|team|story/i.test(html);
  }

  extractSocialLinks(html) {
    const socialLinks = [];
    const socialPatterns = {
      facebook: /facebook\.com\/[^"'\s]+/gi,
      twitter: /twitter\.com\/[^"'\s]+/gi,
      linkedin: /linkedin\.com\/[^"'\s]+/gi,
      instagram: /instagram\.com\/[^"'\s]+/gi
    };

    Object.entries(socialPatterns).forEach(([platform, pattern]) => {
      const matches = html.match(pattern);
      if (matches) {
        socialLinks.push({
          platform,
          urls: [...new Set(matches)]
        });
      }
    });

    return socialLinks;
  }

  // Generate outreach templates
  generateOutreachTemplates() {
    return {
      guestPost: {
        subject: 'Guest Post Opportunity - WPS Office for Southeast Asian Businesses',
        template: `Hi [Name],

I hope this email finds you well. I've been following [Website] and really enjoyed your recent article on [specific article].

I'm reaching out because I've written a comprehensive guide on "WPS Office for Southeast Asian Businesses" that I believe would be valuable for your audience. The article covers:

• WPS Office features specifically beneficial for ASEAN markets
• Localization and language support for Southeast Asia
• Cost-effective alternatives to Microsoft Office
• Real case studies from Singapore, Malaysia, Thailand, and other ASEAN countries

Would you be interested in featuring this content? I'm happy to customize it to match your site's style and audience.

Best regards,
[Your Name]`
      },
      directory: {
        subject: 'Business Directory Listing Request - WPS Office',
        template: `Hi [Name],

I hope you're doing well. I came across your business directory and was impressed by the quality of listings.

I would like to request a listing for WPS Office, a comprehensive office software solution that's gaining popularity in Southeast Asia. Our software offers:

• Free and paid versions
• Full compatibility with Microsoft Office formats
• Multilingual support for ASEAN markets
• Cloud synchronization and collaboration features

Would you consider adding WPS Office to your directory? I'd be happy to provide any additional information you need.

Thank you for your time.

Best regards,
[Your Name]`
      },
      partnership: {
        subject: 'Partnership Opportunity - WPS Office Integration',
        template: `Hi [Name],

I hope this email finds you well. I've been following [Company] and am impressed by your innovative solutions.

I'm reaching out to explore a potential partnership between WPS Office and [Company]. WPS Office is a leading office software solution with strong presence in Southeast Asia, and I believe there could be valuable integration opportunities.

Some potential collaboration areas:
• API integration for document processing
• Cross-promotion opportunities
• Joint marketing initiatives for ASEAN markets
• Technical partnerships for enhanced user experience

Would you be interested in discussing this further? I'd be happy to schedule a call to explore the possibilities.

Best regards,
[Your Name]`
      }
    };
  }

  // Generate bulk operations
  async generateBulkOperations(domains, operation = 'analyze') {
    const operations = [];

    for (const domain of domains) {
      switch (operation) {
        case 'analyze':
          operations.push({
            type: 'analyze',
            domain,
            action: () => this.analyzeDomainMetrics(domain)
          });
          break;
        case 'emails':
          operations.push({
            type: 'emails',
            domain,
            action: () => this.findContactEmails(domain)
          });
          break;
        case 'backlinks':
          operations.push({
            type: 'backlinks',
            domain,
            action: () => this.analyzeWithAhrefs(domain)
          });
          break;
      }
    }

    return operations;
  }

  // Execute bulk operations with rate limiting
  async executeBulkOperations(operations) {
    const results = [];
    const chunks = this.chunkArray(operations, CONFIG.maxConcurrent);

    for (const chunk of chunks) {
      const promises = chunk.map(async (op) => {
        try {
          const result = await op.action();
          return { ...result, operation: op.type, domain: op.domain };
        } catch (error) {
          return { 
            operation: op.type, 
            domain: op.domain, 
            error: error.message,
            failed: true
          };
        }
      });

      const chunkResults = await Promise.all(promises);
      results.push(...chunkResults);

      if (chunks.indexOf(chunk) < chunks.length - 1) {
        await this.delay(CONFIG.delay);
      }
    }

    return results;
  }

  chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  // Save results to files
  async saveResults() {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Save main results
    const resultsPath = path.join(CONFIG.outputDir, `backlink-analysis-${timestamp}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2), 'utf8');

    // Save outreach templates
    const templates = this.generateOutreachTemplates();
    const templatesPath = path.join(CONFIG.outputDir, `outreach-templates-${timestamp}.json`);
    fs.writeFileSync(templatesPath, JSON.stringify(templates, null, 2), 'utf8');

    // Generate CSV for easy import
    const csvPath = path.join(CONFIG.outputDir, `backlink-opportunities-${timestamp}.csv`);
    this.generateCSV(csvPath);

    return {
      resultsPath,
      templatesPath,
      csvPath
    };
  }

  generateCSV(filePath) {
    const headers = ['Domain', 'Type', 'Priority', 'Status', 'Title', 'Contact Form', 'About Page', 'Social Links', 'Notes'];
    const rows = [headers.join(',')];

    this.results.discovered.forEach(item => {
      const row = [
        item.domain,
        item.type || 'unknown',
        item.priority || 'medium',
        item.accessible ? 'accessible' : 'inaccessible',
        `"${item.title || ''}"`,
        item.hasContactForm ? 'Yes' : 'No',
        item.hasAboutPage ? 'Yes' : 'No',
        `"${item.socialLinks?.map(s => s.platform).join(', ') || ''}"`,
        `"${item.notes || ''}"`
      ];
      rows.push(row.join(','));
    });

    fs.writeFileSync(filePath, rows.join('\n'), 'utf8');
  }

  displaySummary() {
    console.log('\n📊 Backlink Management Summary');
    console.log('==============================');
    console.log(`Total domains analyzed: ${this.results.discovered.length}`);
    console.log(`Accessible domains: ${this.results.discovered.filter(d => d.accessible).length}`);
    console.log(`Domains with contact forms: ${this.results.discovered.filter(d => d.hasContactForm).length}`);
    console.log(`Domains with about pages: ${this.results.discovered.filter(d => d.hasAboutPage).length}`);
    
    if (this.results.analyzed.length > 0) {
      console.log(`\n🔍 Analysis Results:`);
      this.results.analyzed.forEach(result => {
        console.log(`  ${result.domain}: ${result.source} - ${result.total} backlinks`);
      });
    }
  }

  async run(domains, operations = ['analyze']) {
    console.log('🚀 Starting backlink management...');
    console.log(`Domains to process: ${domains.length}`);
    console.log(`Operations: ${operations.join(', ')}`);

    try {
      for (const operation of operations) {
        console.log(`\n🔄 Running ${operation} operation...`);
        
        const ops = await this.generateBulkOperations(domains, operation);
        const results = await this.executeBulkOperations(ops);
        
        if (operation === 'analyze') {
          this.results.discovered.push(...results);
        } else if (operation === 'backlinks') {
          this.results.analyzed.push(...results);
        }
      }

      const savedFiles = await this.saveResults();
      
      this.displaySummary();
      
      console.log('\n💾 Files saved:');
      Object.entries(savedFiles).forEach(([key, path]) => {
        console.log(`  ${key}: ${path}`);
      });

    } catch (error) {
      console.error('❌ Management failed:', error.message);
      process.exit(1);
    }
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Advanced Backlink Manager

Usage:
  node backlink-manager.js [options] <domains...>

Options:
  --help, -h          Show this help message
  --analyze           Analyze domain metrics (default)
  --emails            Find contact emails
  --backlinks         Analyze backlinks with Ahrefs
  --all               Run all operations
  --file <path>       Read domains from file (one per line)

Examples:
  node backlink-manager.js --analyze example.com test.com
  node backlink-manager.js --all --file domains.txt
  node backlink-manager.js --emails --backlinks example.com
    `);
    return;
  }

  let domains = [];
  let operations = ['analyze'];

  // Parse arguments
  if (args.includes('--file')) {
    const fileIndex = args.indexOf('--file');
    const filePath = args[fileIndex + 1];
    if (filePath && fs.existsSync(filePath)) {
      domains = fs.readFileSync(filePath, 'utf8')
        .split('\n')
        .map(d => d.trim())
        .filter(d => d && !d.startsWith('#'));
    } else {
      console.error('❌ File not found or not specified');
      return;
    }
  } else {
    // Get domains from command line arguments
    domains = args.filter(arg => !arg.startsWith('--'));
  }

  if (domains.length === 0) {
    console.error('❌ No domains specified');
    return;
  }

  // Determine operations
  if (args.includes('--all')) {
    operations = ['analyze', 'emails', 'backlinks'];
  } else {
    if (args.includes('--emails')) operations.push('emails');
    if (args.includes('--backlinks')) operations.push('backlinks');
  }

  const manager = new BacklinkManager();
  manager.run(domains, operations);
}

main();
