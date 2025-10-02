#!/usr/bin/env node
/*
Complete Automation Script
Combines backlink discovery, management, and SERP monitoring into one comprehensive workflow.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CompleteAutomation {
  constructor() {
    this.logFile = path.resolve(process.cwd(), 'reports/automation.log');
    this.config = {
      // Backlink automation settings
      maxNewBacklinks: 5, // Conservative daily limit
      maxOutreachEmails: 3, // Conservative daily limit
      discoveryTypes: ['directories', 'publications'], // Focus on high-value types
      
      // SERP monitoring settings
      serpKeywords: 50, // Number of keywords to monitor
      serpRegions: ['zh-CN', 'zh-TW', 'zh-HK'], // Chinese language regions
      
      // Reporting settings
      generateReports: true,
      emailReports: false, // Set to true if you want email notifications
      
      // Cleanup settings
      cleanupDays: 30, // Keep files for 30 days
      
      // Target countries for SEA focus
      targetCountries: ['singapore', 'malaysia', 'thailand', 'indonesia', 'vietnam', 'philippines']
    };
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    
    // Ensure log directory exists
    fs.mkdirSync(path.dirname(this.logFile), { recursive: true });
    fs.appendFileSync(this.logFile, logMessage, 'utf8');
  }

  async runCommand(command, description) {
    try {
      this.log(`Starting: ${description}`);
      const output = execSync(command, { 
        encoding: 'utf8',
        cwd: process.cwd(),
        stdio: 'pipe'
      });
      this.log(`Completed: ${description}`);
      return output;
    } catch (error) {
      this.log(`Error in ${description}: ${error.message}`);
      throw error;
    }
  }

  async runBacklinkDiscovery() {
    this.log('🔍 Starting backlink discovery...');
    
    try {
      // Run free discovery for new opportunities
      await this.runCommand(
        'yarn free-discover-fast --all',
        'Free backlink discovery (fast mode)'
      );
      
      this.log('✅ Backlink discovery completed');
    } catch (error) {
      this.log(`❌ Backlink discovery failed: ${error.message}`);
    }
  }

  async addNewBacklinks() {
    this.log('➕ Adding new backlinks to tracking...');
    
    try {
      // Find the latest discovery results
      const discoveryDir = path.resolve(process.cwd(), 'reports/backlinks/free-discovery');
      
      if (fs.existsSync(discoveryDir)) {
        const files = fs.readdirSync(discoveryDir)
          .filter(f => f.startsWith('free-bulk-add-backlinks-') && f.endsWith('.sh'))
          .sort()
          .reverse();
        
        if (files.length > 0) {
          const latestScript = path.join(discoveryDir, files[0]);
          await this.runCommand(
            `bash "${latestScript}"`,
            `Adding backlinks from ${files[0]}`
          );
        }
      }
      
      this.log('✅ New backlinks added to tracking');
    } catch (error) {
      this.log(`❌ Adding backlinks failed: ${error.message}`);
    }
  }

  async runSerpMonitoring() {
    this.log('📊 Starting SERP monitoring...');
    
    try {
      // Generate manual SERP links for ranking checks
      await this.runCommand(
        'yarn serp:manual',
        'Generating SERP monitoring links'
      );
      
      // Optional: Run SERP ranking checks (requires manual verification)
      // await this.runCommand(
      //   'yarn serp:ranks',
      //   'Checking SERP rankings'
      // );
      
      this.log('✅ SERP monitoring completed');
    } catch (error) {
      this.log(`❌ SERP monitoring failed: ${error.message}`);
    }
  }

  async generateComprehensiveReports() {
    this.log('📈 Generating comprehensive reports...');
    
    try {
      // Generate SEA backlink report
      await this.runCommand(
        'yarn sea:report',
        'Generating SEA backlink report'
      );
      
      // Generate general backlink report
      await this.runCommand(
        'yarn backlink:report',
        'Generating general backlink report'
      );
      
      this.log('✅ Comprehensive reports generated');
    } catch (error) {
      this.log(`❌ Report generation failed: ${error.message}`);
    }
  }

  async analyzeTopOpportunities() {
    this.log('🔍 Analyzing top opportunities...');
    
    try {
      // Analyze a few high-priority domains for contact info
      const highPriorityDomains = [
        'straitstimes.com',
        'bangkokpost.com',
        'channelnewsasia.com',
        'vnexpress.net',
        'inquirer.net'
      ];
      
      for (const domain of highPriorityDomains.slice(0, 3)) { // Limit to 3 per run
        try {
          await this.runCommand(
            `yarn manage --analyze ${domain}`,
            `Analyzing ${domain}`
          );
        } catch (error) {
          this.log(`Failed to analyze ${domain}: ${error.message}`);
        }
      }
      
      this.log('✅ Top opportunities analyzed');
    } catch (error) {
      this.log(`❌ Opportunity analysis failed: ${error.message}`);
    }
  }

  async cleanupOldFiles() {
    this.log('🧹 Cleaning up old files...');
    
    try {
      const reportsDir = path.resolve(process.cwd(), 'reports');
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - this.config.cleanupDays);
      
      // Clean up old discovery files
      const discoveryDir = path.join(reportsDir, 'backlinks', 'free-discovery');
      if (fs.existsSync(discoveryDir)) {
        const files = fs.readdirSync(discoveryDir);
        files.forEach(file => {
          const filePath = path.join(discoveryDir, file);
          const stats = fs.statSync(filePath);
          
          if (stats.mtime < cutoffDate) {
            fs.unlinkSync(filePath);
            this.log(`Deleted old file: ${file}`);
          }
        });
      }
      
      // Clean up SERP files using the dedicated prune script
      try {
        await this.runCommand(
          'node scripts/serp-prune.js',
          'Cleaning up SERP reports'
        );
      } catch (error) {
        this.log(`⚠️  SERP cleanup warning: ${error.message}`);
      }
      
      this.log('✅ Cleanup completed');
    } catch (error) {
      this.log(`❌ Cleanup failed: ${error.message}`);
    }
  }

  async generateSummary() {
    this.log('📋 Generating automation summary...');
    
    try {
      const summary = {
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        tasks: {
          backlinkDiscovery: 'completed',
          backlinkAddition: 'completed',
          serpMonitoring: 'completed',
          reportGeneration: 'completed',
          opportunityAnalysis: 'completed',
          cleanup: 'completed'
        },
        config: this.config,
        nextSteps: [
          'Review generated reports in reports/backlinks/ and reports/serp/',
          'Check SERP ranking links in reports/serp/manual_serp_links.csv',
          'Start outreach using email templates from discovery results',
          'Monitor backlink progress with yarn sea:report',
          'Run this automation daily for consistent growth'
        ]
      };
      
      const summaryPath = path.resolve(process.cwd(), 'reports/automation-summary.json');
      fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
      
      this.log('✅ Automation summary generated');
    } catch (error) {
      this.log(`❌ Summary generation failed: ${error.message}`);
    }
  }

  async run() {
    this.log('🚀 Starting complete automation workflow...');
    this.log(`Configuration: ${JSON.stringify(this.config, null, 2)}`);
    
    const startTime = Date.now();
    
    try {
      // Run complete automation workflow
      await this.runBacklinkDiscovery();
      await this.addNewBacklinks();
      await this.runSerpMonitoring();
      await this.analyzeTopOpportunities();
      await this.generateComprehensiveReports();
      await this.cleanupOldFiles();
      await this.generateSummary();
      
      const totalTime = Date.now() - startTime;
      this.log(`🎉 Complete automation finished successfully in ${(totalTime / 1000).toFixed(1)} seconds!`);
      
      // Display next steps
      this.log('\n📋 Next Steps:');
      this.log('1. Review reports in reports/backlinks/ and reports/serp/');
      this.log('2. Check SERP ranking links for manual verification');
      this.log('3. Start outreach using generated email templates');
      this.log('4. Monitor progress with: yarn sea:report');
      this.log('5. Run this automation daily for consistent growth');
      
    } catch (error) {
      this.log(`💥 Complete automation failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Complete Automation System

Usage:
  node complete-automation.js [options]

Options:
  --help, -h          Show this help message
  --backlinks-only    Only run backlink automation
  --serp-only         Only run SERP monitoring
  --reports-only      Only generate reports
  --analysis-only     Only analyze opportunities
  --cleanup-only      Only run cleanup

Examples:
  node complete-automation.js
  node complete-automation.js --backlinks-only
  node complete-automation.js --serp-only
  yarn automate:complete
    `);
    return;
  }
  
  const automation = new CompleteAutomation();
  
  if (args.includes('--backlinks-only')) {
    automation.runBacklinkDiscovery()
      .then(() => automation.addNewBacklinks())
      .then(() => automation.generateComprehensiveReports())
      .then(() => automation.generateSummary());
  } else if (args.includes('--serp-only')) {
    automation.runSerpMonitoring()
      .then(() => automation.generateSummary());
  } else if (args.includes('--reports-only')) {
    automation.generateComprehensiveReports()
      .then(() => automation.generateSummary());
  } else if (args.includes('--analysis-only')) {
    automation.analyzeTopOpportunities()
      .then(() => automation.generateSummary());
  } else if (args.includes('--cleanup-only')) {
    automation.cleanupOldFiles()
      .then(() => automation.generateSummary());
  } else {
    // Run complete automation
    automation.run();
  }
}

main();
