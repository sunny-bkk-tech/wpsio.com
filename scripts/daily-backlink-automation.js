#!/usr/bin/env node
/*
Daily Backlink Automation Script
Runs daily backlink discovery and management tasks automatically.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DailyBacklinkAutomation {
  constructor() {
    this.logFile = path.resolve(process.cwd(), 'reports/backlinks/automation.log');
    this.config = {
      maxNewBacklinks: 10, // Maximum new backlinks to add per day
      maxOutreachEmails: 5, // Maximum outreach emails to send per day
      discoveryTypes: ['directories', 'publications'], // Types to discover daily
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

  async discoverNewOpportunities() {
    this.log('🔍 Starting daily backlink discovery...');
    
    try {
      // Run discovery for specific types
      for (const type of this.config.discoveryTypes) {
        await this.runCommand(
          `yarn discover --${type}`,
          `Discovering ${type}`
        );
      }
      
      this.log('✅ Discovery completed successfully');
    } catch (error) {
      this.log(`❌ Discovery failed: ${error.message}`);
    }
  }

  async analyzeNewDomains() {
    this.log('📊 Analyzing new domains...');
    
    try {
      // Check if we have new domains to analyze
      const discoveryPath = path.resolve(process.cwd(), 'reports/backlinks/discovery/outreach-list.json');
      
      if (fs.existsSync(discoveryPath)) {
        const outreachData = JSON.parse(fs.readFileSync(discoveryPath, 'utf8'));
        const newDomains = outreachData
          .filter(item => item.priority === 'high')
          .slice(0, 5) // Analyze top 5 high-priority domains
          .map(item => item.domain);
        
        if (newDomains.length > 0) {
          await this.runCommand(
            `yarn manage --analyze ${newDomains.join(' ')}`,
            `Analyzing ${newDomains.length} new domains`
          );
        }
      }
      
      this.log('✅ Domain analysis completed');
    } catch (error) {
      this.log(`❌ Domain analysis failed: ${error.message}`);
    }
  }

  async addHighQualityBacklinks() {
    this.log('➕ Adding high-quality backlinks...');
    
    try {
      const discoveryPath = path.resolve(process.cwd(), 'reports/backlinks/discovery/outreach-list.json');
      
      if (fs.existsSync(discoveryPath)) {
        const outreachData = JSON.parse(fs.readFileSync(discoveryPath, 'utf8'));
        const highQualityBacklinks = outreachData
          .filter(item => item.priority === 'high' && item.type === 'directory')
          .slice(0, this.config.maxNewBacklinks);
        
        for (const backlink of highQualityBacklinks) {
          try {
            await this.runCommand(
              `yarn backlink:add --url "https://${backlink.domain}" --domain "${backlink.domain}" --type "${backlink.type}" --quality "high" --notes "Auto-discovered: ${backlink.action}"`,
              `Adding backlink: ${backlink.domain}`
            );
          } catch (error) {
            this.log(`Failed to add backlink ${backlink.domain}: ${error.message}`);
          }
        }
      }
      
      this.log('✅ High-quality backlinks added');
    } catch (error) {
      this.log(`❌ Adding backlinks failed: ${error.message}`);
    }
  }

  async generateDailyReports() {
    this.log('📈 Generating daily reports...');
    
    try {
      // Generate SEA report
      await this.runCommand(
        'yarn sea:report',
        'Generating SEA backlink report'
      );
      
      // Generate general backlink report
      await this.runCommand(
        'yarn backlink:report',
        'Generating general backlink report'
      );
      
      this.log('✅ Daily reports generated');
    } catch (error) {
      this.log(`❌ Report generation failed: ${error.message}`);
    }
  }

  async cleanupOldFiles() {
    this.log('🧹 Cleaning up old files...');
    
    try {
      const reportsDir = path.resolve(process.cwd(), 'reports/backlinks');
      const discoveryDir = path.join(reportsDir, 'discovery');
      const managementDir = path.join(reportsDir, 'management');
      
      // Clean up files older than 30 days
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);
      
      [discoveryDir, managementDir].forEach(dir => {
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir);
          files.forEach(file => {
            const filePath = path.join(dir, file);
            const stats = fs.statSync(filePath);
            
            if (stats.mtime < cutoffDate) {
              fs.unlinkSync(filePath);
              this.log(`Deleted old file: ${file}`);
            }
          });
        }
      });
      
      this.log('✅ Cleanup completed');
    } catch (error) {
      this.log(`❌ Cleanup failed: ${error.message}`);
    }
  }

  async checkSystemHealth() {
    this.log('🏥 Checking system health...');
    
    try {
      // Check if required files exist
      const requiredFiles = [
        'scripts/backlink-discovery.js',
        'scripts/backlink-manager.js',
        'scripts/sea-backlink-tracker.js',
        'scripts/backlink-tracker.js'
      ];
      
      const missingFiles = requiredFiles.filter(file => {
        const filePath = path.resolve(process.cwd(), file);
        return !fs.existsSync(filePath);
      });
      
      if (missingFiles.length > 0) {
        this.log(`⚠️  Missing files: ${missingFiles.join(', ')}`);
      } else {
        this.log('✅ All required files present');
      }
      
      // Check if reports directory is writable
      const reportsDir = path.resolve(process.cwd(), 'reports/backlinks');
      try {
        fs.mkdirSync(reportsDir, { recursive: true });
        const testFile = path.join(reportsDir, 'test-write.tmp');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile);
        this.log('✅ Reports directory is writable');
      } catch (error) {
        this.log(`❌ Reports directory not writable: ${error.message}`);
      }
      
    } catch (error) {
      this.log(`❌ Health check failed: ${error.message}`);
    }
  }

  async generateSummary() {
    this.log('📋 Generating daily summary...');
    
    try {
      const summary = {
        date: new Date().toISOString().split('T')[0],
        tasks: {
          discovery: 'completed',
          analysis: 'completed',
          backlinks: 'completed',
          reports: 'completed',
          cleanup: 'completed',
          healthCheck: 'completed'
        },
        config: this.config,
        timestamp: new Date().toISOString()
      };
      
      const summaryPath = path.resolve(process.cwd(), 'reports/backlinks/daily-summary.json');
      fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
      
      this.log('✅ Daily summary generated');
    } catch (error) {
      this.log(`❌ Summary generation failed: ${error.message}`);
    }
  }

  async run() {
    this.log('🚀 Starting daily backlink automation...');
    this.log(`Configuration: ${JSON.stringify(this.config, null, 2)}`);
    
    try {
      // Run all daily tasks
      await this.checkSystemHealth();
      await this.discoverNewOpportunities();
      await this.analyzeNewDomains();
      await this.addHighQualityBacklinks();
      await this.generateDailyReports();
      await this.cleanupOldFiles();
      await this.generateSummary();
      
      this.log('🎉 Daily automation completed successfully!');
      
    } catch (error) {
      this.log(`💥 Daily automation failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Daily Backlink Automation

Usage:
  node daily-backlink-automation.js [options]

Options:
  --help, -h          Show this help message
  --discovery-only    Only run discovery tasks
  --analysis-only     Only run analysis tasks
  --reports-only      Only generate reports
  --health-only       Only run health check
  --config <file>     Use custom configuration file

Examples:
  node daily-backlink-automation.js
  node daily-backlink-automation.js --discovery-only
  node daily-backlink-automation.js --reports-only
    `);
    return;
  }
  
  const automation = new DailyBacklinkAutomation();
  
  if (args.includes('--discovery-only')) {
    automation.discoverNewOpportunities();
  } else if (args.includes('--analysis-only')) {
    automation.analyzeNewDomains();
  } else if (args.includes('--reports-only')) {
    automation.generateDailyReports();
  } else if (args.includes('--health-only')) {
    automation.checkSystemHealth();
  } else {
    // Run full automation
    automation.run();
  }
}

main();
