#!/usr/bin/env node
/*
Free Backlink Discovery Tool
Discovers potential backlink opportunities using only free, publicly available data sources.
No API keys required!
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  outputDir: path.resolve(process.cwd(), 'reports/backlinks/free-discovery'),
  maxConcurrent: 10, // Increased from 3 to 10
  delay: 200, // Reduced from 2000ms to 200ms
  timeout: 8000, // Reduced from 10s to 8s
  userAgent: 'Mozilla/5.0 (compatible; FreeBacklinkDiscovery/1.0)',
  batchSize: 5, // Process domains in batches
  fastMode: false, // Enable for even faster execution
  maxRetries: 2, // Reduced retries for faster failure handling
  progressInterval: 1000 // Progress update interval in ms
};

// Comprehensive list of Southeast Asian business directories and publications
const SEA_TARGETS = {
  directories: [
    // Singapore
    'yellowpages.com.sg',
    'sgbiz.com',
    'sgdirectory.com',
    'singapore-business-directory.com',
    'sgcompany.com',
    
    // Malaysia
    'yellowpages.com.my',
    'malaysiabusinessdirectory.com',
    'mybusinessdirectory.com',
    'malaysia-company-directory.com',
    'mycompany.com',
    
    // Thailand
    'yellowpages.co.th',
    'thailandbusinessdirectory.com',
    'thaidirectory.com',
    'thailand-company-directory.com',
    'thai-business.com',
    
    // Indonesia
    'yellowpages.co.id',
    'indonesiabusinessdirectory.com',
    'indodirectory.com',
    'indonesia-company-directory.com',
    'indonesia-business.com',
    
    // Vietnam
    'yellowpages.vn',
    'vietnambusinessdirectory.com',
    'vietdirectory.com',
    'vietnam-company-directory.com',
    'vietnam-business.com',
    
    // Philippines
    'yellowpages.com.ph',
    'philippinesbusinessdirectory.com',
    'phildirectory.com',
    'philippines-company-directory.com',
    'philippines-business.com',
    
    // Regional
    'asean-business-directory.com',
    'southeast-asia-directory.com',
    'asia-business-directory.com'
  ],
  
  publications: [
    // Singapore
    'straitstimes.com',
    'todayonline.com',
    'channelnewsasia.com',
    'business-times.com.sg',
    'sg.news.yahoo.com',
    
    // Malaysia
    'thestar.com.my',
    'nst.com.my',
    'malaymail.com',
    'freemalaysiatoday.com',
    'my.news.yahoo.com',
    
    // Thailand
    'bangkokpost.com',
    'nationthailand.com',
    'thaipbs.or.th',
    'khaosodenglish.com',
    'th.news.yahoo.com',
    
    // Indonesia
    'jakartapost.com',
    'kompas.com',
    'detik.com',
    'tempo.co',
    'id.news.yahoo.com',
    
    // Vietnam
    'vietnamnews.vn',
    'vnexpress.net',
    'tuoitrenews.vn',
    'thanhnien.vn',
    'vn.news.yahoo.com',
    
    // Philippines
    'inquirer.net',
    'mb.com.ph',
    'gmanetwork.com',
    'philstar.com',
    'ph.news.yahoo.com',
    
    // Regional
    'techinasia.com',
    'e27.co',
    'startupnews.asia',
    'asean.news',
    'southeast-asia-news.com'
  ],
  
  techBlogs: [
    // Singapore
    'hardwarezone.com.sg',
    'soyacincau.com',
    'techgoondu.com',
    'sg.techcrunch.com',
    
    // Malaysia
    'lowyat.net',
    'soyacincau.com',
    'malaysia.techcrunch.com',
    
    // Thailand
    'techxcite.com',
    'thailand.techcrunch.com',
    
    // Indonesia
    'detik.com',
    'indonesia.techcrunch.com',
    
    // Vietnam
    'vnexpress.net',
    'vietnam.techcrunch.com',
    
    // Philippines
    'gmanetwork.com',
    'philippines.techcrunch.com',
    
    // Regional
    'techinasia.com',
    'e27.co',
    'startupnews.asia'
  ],
  
  businessBlogs: [
    'asean-business.com',
    'southeast-asia-business.com',
    'asia-business-review.com',
    'asean-entrepreneur.com',
    'southeast-asia-startup.com',
    'asia-productivity.com',
    'asean-productivity.com',
    'southeast-asia-efficiency.com'
  ]
};

class FreeBacklinkDiscovery {
  constructor(fastMode = false) {
    this.results = {
      directories: [],
      publications: [],
      techBlogs: [],
      businessBlogs: [],
      resourcePages: [],
      competitors: [],
      generatedAt: new Date().toISOString()
    };
    
    // Adjust configuration for fast mode
    if (fastMode) {
      CONFIG.delay = 50; // Even faster
      CONFIG.batchSize = 10; // Larger batches
      CONFIG.timeout = 5000; // Shorter timeout
      CONFIG.maxConcurrent = 15; // More concurrent requests
      CONFIG.maxRetries = 1; // Single retry for speed
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Process domains in parallel batches for much faster execution
  async processDomainsInParallel(domains, processFunction, type) {
    console.log(`🔍 Discovering ${type}...`);
    
    const results = [];
    const batches = this.chunkArray(domains, CONFIG.batchSize);
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`  Processing batch ${i + 1}/${batches.length} (${batch.length} domains)...`);
      
      // Process batch in parallel with timeout protection
      const batchPromises = batch.map(async (domain, index) => {
        try {
          console.log(`    [${i + 1}/${batches.length}] Analyzing ${index + 1}/${batch.length}: ${domain}`);
          
          // Add timeout wrapper to prevent hanging
          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), CONFIG.timeout + 2000);
          });
          
          const result = await Promise.race([
            processFunction(domain),
            timeoutPromise
          ]);
          
          console.log(`    ✅ Completed: ${domain} (${result.accessible ? 'accessible' : 'not accessible'})`);
          return result;
        } catch (error) {
          console.log(`    ❌ Failed to analyze ${domain}: ${error.message}`);
          return {
            domain,
            accessible: false,
            error: error.message,
            analyzedAt: new Date().toISOString()
          };
        }
      });
      
      try {
        const batchResults = await Promise.allSettled(batchPromises);
        const successfulResults = batchResults
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);
        
        results.push(...successfulResults);
        
        // Log batch completion
        const successCount = successfulResults.filter(r => r.accessible).length;
        console.log(`  ✅ Batch ${i + 1} completed: ${successCount}/${batch.length} accessible`);
        
      } catch (error) {
        console.log(`  ❌ Batch ${i + 1} failed: ${error.message}`);
        // Add failed results for this batch
        batch.forEach(domain => {
          results.push({
            domain,
            accessible: false,
            error: `Batch processing failed: ${error.message}`,
            analyzedAt: new Date().toISOString()
          });
        });
      }
      
      // Small delay between batches to be respectful
      if (i < batches.length - 1) {
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

  async fetchWithRetry(url, retries = CONFIG.maxRetries) {
    for (let i = 0; i < retries; i++) {
      try {
        // Create AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeout);
        
        const response = await fetch(url, {
          headers: { 'User-Agent': CONFIG.userAgent },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${CONFIG.timeout}ms`);
        }
        if (i === retries - 1) throw error;
        await this.delay(1000 * (i + 1)); // Shorter delay between retries
      }
    }
  }

  async analyzeDomain(domain) {
    try {
      const url = `https://${domain}`;
      const response = await this.fetchWithRetry(url);
      
      if (!response.ok) {
        return {
          domain,
          accessible: false,
          status: response.status,
          error: `HTTP ${response.status}`,
          analyzedAt: new Date().toISOString()
        };
      }

      const html = await response.text();
      const title = this.extractTitle(html);
      const description = this.extractDescription(html);
      const hasContactForm = this.hasContactForm(html);
      const hasAboutPage = this.hasAboutPage(html);
      const socialLinks = this.extractSocialLinks(html);
      const emails = this.extractEmails(html);
      const phoneNumbers = this.extractPhoneNumbers(html);
      const backlinkOpportunities = this.findBacklinkOpportunities(html);

      return {
        domain,
        accessible: true,
        status: response.status,
        title,
        description,
        hasContactForm,
        hasAboutPage,
        socialLinks,
        emails,
        phoneNumbers,
        backlinkOpportunities,
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
    return /contact|about|reach|get.*touch|write.*us/i.test(html);
  }

  hasAboutPage(html) {
    return /about|company|team|story|who.*we/i.test(html);
  }

  extractSocialLinks(html) {
    const socialLinks = [];
    const socialPatterns = {
      facebook: /facebook\.com\/[^"'\s]+/gi,
      twitter: /twitter\.com\/[^"'\s]+/gi,
      linkedin: /linkedin\.com\/[^"'\s]+/gi,
      instagram: /instagram\.com\/[^"'\s]+/gi,
      youtube: /youtube\.com\/[^"'\s]+/gi
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

  extractEmails(html) {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = html.match(emailRegex) || [];
    
    // Filter out common non-contact emails
    const filteredEmails = emails.filter(email => {
      const lowerEmail = email.toLowerCase();
      return !lowerEmail.includes('noreply') && 
             !lowerEmail.includes('no-reply') &&
             !lowerEmail.includes('donotreply') &&
             !lowerEmail.includes('example.com') &&
             !lowerEmail.includes('test.com') &&
             !lowerEmail.includes('placeholder');
    });
    
    return [...new Set(filteredEmails)];
  }

  extractPhoneNumbers(html) {
    const phoneRegex = /(\+?[0-9]{1,4}[\s\-]?)?(\(?[0-9]{2,4}\)?[\s\-]?)?[0-9]{3,4}[\s\-]?[0-9]{3,4}/g;
    const phones = html.match(phoneRegex) || [];
    return [...new Set(phones)];
  }

  findBacklinkOpportunities(html) {
    const opportunities = [];
    
    // Look for resource pages, directories, or lists
    if (/best.*software|top.*tools|software.*list|office.*software|productivity.*tools/i.test(html)) {
      opportunities.push({
        type: 'resource_page',
        description: 'Potential resource page for office software',
        priority: 'high'
      });
    }
    
    // Look for guest posting opportunities
    if (/guest.*post|write.*for.*us|contribute|submit.*article/i.test(html)) {
      opportunities.push({
        type: 'guest_posting',
        description: 'Guest posting opportunity',
        priority: 'high'
      });
    }
    
    // Look for partnership opportunities
    if (/partnership|collaborate|partner.*with|work.*with.*us/i.test(html)) {
      opportunities.push({
        type: 'partnership',
        description: 'Partnership opportunity',
        priority: 'medium'
      });
    }
    
    return opportunities;
  }

  async discoverDirectories() {
    const results = await this.processDomainsInParallel(
      SEA_TARGETS.directories, 
      this.analyzeDomain.bind(this), 
      'business directories'
    );
    this.results.directories = results;
  }

  async discoverPublications() {
    const results = await this.processDomainsInParallel(
      SEA_TARGETS.publications, 
      this.analyzeDomain.bind(this), 
      'publications'
    );
    this.results.publications = results;
  }

  async discoverTechBlogs() {
    const results = await this.processDomainsInParallel(
      SEA_TARGETS.techBlogs, 
      this.analyzeDomain.bind(this), 
      'tech blogs'
    );
    this.results.techBlogs = results;
  }

  async discoverBusinessBlogs() {
    const results = await this.processDomainsInParallel(
      SEA_TARGETS.businessBlogs, 
      this.analyzeDomain.bind(this), 
      'business blogs'
    );
    this.results.businessBlogs = results;
  }

  async discoverResourcePages() {
    console.log('📚 Discovering resource pages...');
    
    const keywords = [
      'best office software southeast asia',
      'free office software asean',
      'office software comparison asia',
      'productivity tools southeast asia',
      'business software asia',
      'office alternatives asia',
      'wps office vs microsoft office asia',
      'free office suite asia'
    ];

    // Process keywords in parallel batches
    const keywordBatches = this.chunkArray(keywords, 3);
    const allResourcePages = [];

    for (let i = 0; i < keywordBatches.length; i++) {
      const batch = keywordBatches[i];
      console.log(`  Processing keyword batch ${i + 1}/${keywordBatches.length}...`);
      
      const batchPromises = batch.map(async (keyword) => {
        try {
          console.log(`    Searching for: ${keyword}`);
          const results = await this.searchDuckDuckGo(keyword);
          
          return results
            .filter(result => this.isResourcePage(result.title, result.snippet))
            .map(result => ({
              ...result,
              keyword,
              discoveredAt: new Date().toISOString()
            }));
        } catch (error) {
          console.log(`    ❌ Failed to search for "${keyword}": ${error.message}`);
          return [];
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      allResourcePages.push(...batchResults.flat());
      
      // Small delay between batches
      if (i < keywordBatches.length - 1) {
        await this.delay(CONFIG.delay);
      }
    }
    
    this.results.resourcePages = allResourcePages;
  }

  async searchDuckDuckGo(query) {
    try {
      const url = `https://api.duckduckgo.com/`;
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        no_html: '1',
        skip_disambig: '1'
      });

      const response = await this.fetchWithRetry(`${url}?${params}`);
      const data = await response.json();

      const searchResults = [];
      
      if (data.RelatedTopics) {
        data.RelatedTopics.forEach(topic => {
          if (topic.FirstURL && topic.Text) {
            searchResults.push({
              title: topic.Text.split(' - ')[0] || topic.Text,
              url: topic.FirstURL,
              snippet: topic.Text
            });
          }
        });
      }

      if (data.AbstractURL && data.Abstract) {
        searchResults.push({
          title: data.Heading || query,
          url: data.AbstractURL,
          snippet: data.Abstract
        });
      }

      return searchResults.slice(0, 5);
    } catch (error) {
      console.error(`Search failed for "${query}":`, error.message);
      return [];
    }
  }

  isResourcePage(title, snippet) {
    const resourceKeywords = [
      'best', 'top', 'list', 'resources', 'tools', 'software', 'recommendations',
      'directory', 'guide', 'comparison', 'review', 'alternatives', 'free'
    ];

    const text = `${title} ${snippet}`.toLowerCase();
    return resourceKeywords.some(keyword => text.includes(keyword));
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
          title: d.title,
          hasContactForm: d.hasContactForm,
          emails: d.emails,
          opportunities: d.backlinkOpportunities,
          notes: `Title: ${d.title || 'N/A'}, Contact form: ${d.hasContactForm ? 'Yes' : 'No'}`
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
          title: p.title,
          hasContactForm: p.hasContactForm,
          emails: p.emails,
          opportunities: p.backlinkOpportunities,
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
          title: t.title,
          hasContactForm: t.hasContactForm,
          emails: t.emails,
          opportunities: t.backlinkOpportunities,
          notes: `Title: ${t.title || 'N/A'}, Contact form: ${t.hasContactForm ? 'Yes' : 'No'}`
        });
      });
    
    // Add business blogs
    this.results.businessBlogs
      .filter(b => b.accessible)
      .forEach(b => {
        outreachList.push({
          domain: b.domain,
          type: 'business_blog',
          priority: 'medium',
          action: 'Pitch business content',
          title: b.title,
          hasContactForm: b.hasContactForm,
          emails: b.emails,
          opportunities: b.backlinkOpportunities,
          notes: `Title: ${b.title || 'N/A'}, Contact form: ${b.hasContactForm ? 'Yes' : 'No'}`
        });
      });
    
    // Add resource pages
    this.results.resourcePages.forEach(r => {
      outreachList.push({
        domain: new URL(r.url).hostname,
        type: 'resource_page',
        priority: 'high',
        action: 'Request inclusion in resource list',
        title: r.title,
        url: r.url,
        keyword: r.keyword,
        notes: `Resource page: ${r.title}, Keyword: ${r.keyword}`
      });
    });
    
    return outreachList;
  }

  generateBulkAddScript(outreachList) {
    let script = `#!/bin/bash
# Auto-generated backlink addition script (FREE VERSION)
# Generated on ${new Date().toISOString()}
# No API keys required!

echo "Adding discovered backlink opportunities..."

`;
    
    outreachList.forEach((item, index) => {
      script += `# ${item.domain} - ${item.type} - ${item.priority}
yarn backlink:add --url "https://${item.domain}" --domain "${item.domain}" --type "${item.type}" --quality "${item.priority}" --notes "${item.action}: ${item.notes}"

`;
    });
    
    return script;
  }

  generateEmailTemplates() {
    return {
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
      guestPost: {
        subject: 'Guest Post Opportunity - WPS Office for Southeast Asian Businesses',
        template: `Hi [Name],

I hope this email finds you well. I've been following [Website] and really enjoyed your recent content.

I'm reaching out because I've written a comprehensive guide on "WPS Office for Southeast Asian Businesses" that I believe would be valuable for your audience. The article covers:

• WPS Office features specifically beneficial for ASEAN markets
• Localization and language support for Southeast Asia
• Cost-effective alternatives to Microsoft Office
• Real case studies from Singapore, Malaysia, Thailand, and other ASEAN countries

Would you be interested in featuring this content? I'm happy to customize it to match your site's style and audience.

Best regards,
[Your Name]`
      },
      resourcePage: {
        subject: 'Resource Page Addition Request - WPS Office',
        template: `Hi [Name],

I noticed your excellent resource page on [topic]. I believe WPS Office would be a valuable addition to your list.

WPS Office is a comprehensive office software solution that's particularly popular in Southeast Asia, offering:

• Free and premium versions
• Full Microsoft Office compatibility
• Multilingual support for ASEAN markets
• Strong presence in Singapore, Malaysia, Thailand, Indonesia, Vietnam, and Philippines

Would you consider adding WPS Office to your resources? I'd be happy to provide any additional information you need.

Thank you,
[Your Name]`
      }
    };
  }

  async saveResults() {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    // Save discovery results
    const resultsPath = path.join(CONFIG.outputDir, `free-discovery-results-${timestamp}.json`);
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2), 'utf8');
    
    // Generate outreach list
    const outreachList = this.generateOutreachList();
    const outreachPath = path.join(CONFIG.outputDir, `free-outreach-list-${timestamp}.json`);
    fs.writeFileSync(outreachPath, JSON.stringify(outreachList, null, 2), 'utf8');
    
    // Generate bulk add script
    const bulkScript = this.generateBulkAddScript(outreachList);
    const scriptPath = path.join(CONFIG.outputDir, `free-bulk-add-backlinks-${timestamp}.sh`);
    fs.writeFileSync(scriptPath, bulkScript, 'utf8');
    fs.chmodSync(scriptPath, '755');
    
    // Generate email templates
    const templates = this.generateEmailTemplates();
    const templatesPath = path.join(CONFIG.outputDir, `free-email-templates-${timestamp}.json`);
    fs.writeFileSync(templatesPath, JSON.stringify(templates, null, 2), 'utf8');
    
    // Generate CSV for easy import
    const csvPath = path.join(CONFIG.outputDir, `free-opportunities-${timestamp}.csv`);
    this.generateCSV(csvPath, outreachList);
    
    return {
      resultsPath,
      outreachPath,
      scriptPath,
      templatesPath,
      csvPath,
      totalOpportunities: outreachList.length
    };
  }

  generateCSV(filePath, outreachList) {
    const headers = ['Domain', 'Type', 'Priority', 'Action', 'Title', 'Contact Form', 'Emails', 'Opportunities', 'Notes'];
    const rows = [headers.join(',')];

    outreachList.forEach(item => {
      const row = [
        item.domain,
        item.type || 'unknown',
        item.priority || 'medium',
        `"${item.action || ''}"`,
        `"${item.title || ''}"`,
        item.hasContactForm ? 'Yes' : 'No',
        `"${item.emails?.join(', ') || ''}"`,
        `"${item.opportunities?.map(o => o.type).join(', ') || ''}"`,
        `"${item.notes || ''}"`
      ];
      rows.push(row.join(','));
    });

    fs.writeFileSync(filePath, rows.join('\n'), 'utf8');
  }

  displaySummary() {
    console.log('\n📊 Free Backlink Discovery Summary');
    console.log('===================================');
    console.log(`Directories: ${this.results.directories.filter(d => d.accessible).length}/${this.results.directories.length} accessible`);
    console.log(`Publications: ${this.results.publications.filter(p => p.accessible).length}/${this.results.publications.length} accessible`);
    console.log(`Tech Blogs: ${this.results.techBlogs.filter(t => t.accessible).length}/${this.results.techBlogs.length} accessible`);
    console.log(`Business Blogs: ${this.results.businessBlogs.filter(b => b.accessible).length}/${this.results.businessBlogs.length} accessible`);
    console.log(`Resource Pages: ${this.results.resourcePages.length} discovered`);
    
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
    
    // Show domains with contact forms
    const withContactForms = outreachList.filter(item => item.hasContactForm).length;
    console.log(`\n📧 Domains with Contact Forms: ${withContactForms}`);
    
    // Show domains with emails found
    const withEmails = outreachList.filter(item => item.emails && item.emails.length > 0).length;
    console.log(`📬 Domains with Emails Found: ${withEmails}`);
  }

  async run() {
    console.log('🚀 Starting FREE backlink discovery...');
    console.log('💰 No API keys required - using only free data sources!');
    console.log('⚡ Optimized for speed with parallel processing!');
    console.log(`Output directory: ${CONFIG.outputDir}`);
    console.log(`Configuration: timeout=${CONFIG.timeout}ms, batchSize=${CONFIG.batchSize}, maxRetries=${CONFIG.maxRetries}`);
    
    const startTime = Date.now();
    
    try {
      // Cleanup old files first to prevent duplicates
      await this.cleanupOldFiles();
      // Run all discovery types in parallel for maximum speed
      console.log('\n🔄 Starting parallel discovery...');
      const discoveryPromises = [
        this.discoverDirectories().then(() => console.log('✅ Directories discovery completed')),
        this.discoverPublications().then(() => console.log('✅ Publications discovery completed')),
        this.discoverTechBlogs().then(() => console.log('✅ Tech blogs discovery completed')),
        this.discoverBusinessBlogs().then(() => console.log('✅ Business blogs discovery completed')),
        this.discoverResourcePages().then(() => console.log('✅ Resource pages discovery completed'))
      ];
      
      await Promise.all(discoveryPromises);
      
      const discoveryTime = Date.now() - startTime;
      console.log(`\n✅ Discovery completed in ${(discoveryTime / 1000).toFixed(1)} seconds!`);
      
      const savedFiles = await this.saveResults();
      
      this.displaySummary();
      
      const totalTime = Date.now() - startTime;
      console.log(`\n⏱️  Total execution time: ${(totalTime / 1000).toFixed(1)} seconds`);
      
      console.log('\n💾 Files saved:');
      console.log(`  Results: ${savedFiles.resultsPath}`);
      console.log(`  Outreach list: ${savedFiles.outreachPath}`);
      console.log(`  Bulk script: ${savedFiles.scriptPath}`);
      console.log(`  Email templates: ${savedFiles.templatesPath}`);
      console.log(`  CSV file: ${savedFiles.csvPath}`);
      
      console.log('\n🔧 Next steps:');
      console.log('1. Review the outreach list in the generated JSON file');
      console.log('2. Run the bulk add script: bash [script-path]');
      console.log('3. Use the email templates for outreach campaigns');
      console.log('4. Import the CSV file into your preferred spreadsheet tool');
      
    } catch (error) {
      console.error('❌ Discovery failed:', error.message);
      process.exit(1);
    }
  }

  // Cleanup old files to prevent duplicates
  async cleanupOldFiles() {
    try {
      const files = fs.readdirSync(CONFIG.outputDir);
      const now = Date.now();
      const oneDayAgo = now - (24 * 60 * 60 * 1000); // 24 hours ago
      
      let cleanedCount = 0;
      
      // Group files by type and keep only the most recent of each type
      const fileGroups = {
        'free-discovery-results': [],
        'free-outreach-list': [],
        'free-bulk-add-backlinks': [],
        'free-email-templates': [],
        'free-opportunities': []
      };
      
      for (const file of files) {
        const filePath = path.join(CONFIG.outputDir, file);
        const stats = fs.statSync(filePath);
        
        // Remove files older than 1 day
        if (stats.mtime.getTime() < oneDayAgo) {
          fs.unlinkSync(filePath);
          cleanedCount++;
          continue;
        }
        
        // Group files by type for same-day cleanup
        for (const [type, group] of Object.entries(fileGroups)) {
          if (file.startsWith(type)) {
            group.push({ file, path: filePath, mtime: stats.mtime });
            break;
          }
        }
      }
      
      // For each file type, keep only the most recent file
      for (const [type, group] of Object.entries(fileGroups)) {
        if (group.length > 1) {
          // Sort by modification time (newest first)
          group.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
          
          // Remove all but the most recent
          for (let i = 1; i < group.length; i++) {
            fs.unlinkSync(group[i].path);
            cleanedCount++;
          }
        }
      }
      
      if (cleanedCount > 0) {
        console.log(`🧹 Cleaned up ${cleanedCount} old/duplicate files`);
      }
    } catch (error) {
      console.log('⚠️  Cleanup warning:', error.message);
    }
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Free Backlink Discovery Tool

Usage:
  node free-backlink-discovery.js [options]

Options:
  --help, -h          Show this help message
  --fast              Enable fast mode (even faster execution)
  --directories       Only discover business directories
  --publications      Only discover publications
  --tech-blogs        Only discover tech blogs
  --business-blogs    Only discover business blogs
  --resource-pages    Only discover resource pages
  --all               Discover all opportunities (default)

Examples:
  node free-backlink-discovery.js --all
  node free-backlink-discovery.js --fast --all
  node free-backlink-discovery.js --directories --publications
  yarn free-discover --all
  yarn free-discover --fast --all
    `);
    return;
  }
  
  const fastMode = args.includes('--fast');
  const discovery = new FreeBacklinkDiscovery(fastMode);
  
  if (fastMode) {
    console.log('⚡ Fast mode enabled - maximum speed optimization!');
  }
  
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
  } else if (args.includes('--business-blogs')) {
    discovery.discoverBusinessBlogs().then(() => {
      discovery.saveResults();
      discovery.displaySummary();
    });
  } else if (args.includes('--resource-pages')) {
    discovery.discoverResourcePages().then(() => {
      discovery.saveResults();
      discovery.displaySummary();
    });
  } else {
    // Run all discoveries
    discovery.run();
  }
}

main();
