#!/usr/bin/env node
/*
Automation Scheduler
Sets up automated daily runs for backlink and SERP monitoring.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutomationScheduler {
  constructor() {
    this.projectRoot = process.cwd();
    this.cronFile = path.join(this.projectRoot, 'automation.cron');
    this.pm2Config = path.join(this.projectRoot, 'ecosystem.config.js');
  }

  generateCronJobs() {
    const cronJobs = [
      '# WPS Office Backlink & SERP Automation',
      '# Generated automatically - do not edit manually',
      '',
      '# Daily complete automation at 9 AM (backlinks + SERP)',
      '0 9 * * * cd ' + this.projectRoot + ' && yarn automate:complete >> logs/automation.log 2>&1',
      '',
      '# Weekly deep discovery on Mondays at 8 AM',
      '0 8 * * 1 cd ' + this.projectRoot + ' && yarn free-discover --all >> logs/automation.log 2>&1',
      '',
      '# Daily SERP monitoring at 2 PM',
      '0 14 * * * cd ' + this.projectRoot + ' && yarn automate:complete --serp-only >> logs/automation.log 2>&1',
      '',
      '# Weekly cleanup on Sundays at 11 PM',
      '0 23 * * 0 cd ' + this.projectRoot + ' && yarn automate:complete --cleanup-only >> logs/automation.log 2>&1',
      '',
      '# Daily reports at 6 PM',
      '0 18 * * * cd ' + this.projectRoot + ' && yarn automate:complete --reports-only >> logs/automation.log 2>&1'
    ];

    return cronJobs.join('\n');
  }

  generatePM2Config() {
    const pm2Config = `module.exports = {
  apps: [
    {
      name: 'wps-automation',
      script: 'scripts/complete-automation.js',
      cwd: '${this.projectRoot}',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      },
      cron_restart: '0 9 * * *', // Restart daily at 9 AM
      log_file: 'logs/automation.log',
      out_file: 'logs/automation-out.log',
      error_file: 'logs/automation-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    },
    {
      name: 'wps-serp-monitor',
      script: 'scripts/complete-automation.js',
      args: '--serp-only',
      cwd: '${this.projectRoot}',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      cron_restart: '0 14 * * *', // Restart daily at 2 PM
      log_file: 'logs/serp-monitor.log',
      out_file: 'logs/serp-monitor-out.log',
      error_file: 'logs/serp-monitor-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};`;

    return pm2Config;
  }

  generateSystemdService() {
    const serviceContent = `[Unit]
Description=WPS Office Backlink Automation
After=network.target

[Service]
Type=simple
User=${process.env.USER || 'root'}
WorkingDirectory=${this.projectRoot}
ExecStart=/usr/bin/node scripts/complete-automation.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`;

    return serviceContent;
  }

  setupLogging() {
    const logsDir = path.join(this.projectRoot, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
      console.log('✅ Created logs directory');
    }
  }

  installCron() {
    try {
      // Generate cron file
      const cronContent = this.generateCronJobs();
      fs.writeFileSync(this.cronFile, cronContent, 'utf8');
      
      // Install cron job
      execSync(`crontab ${this.cronFile}`, { stdio: 'inherit' });
      console.log('✅ Cron jobs installed successfully');
      console.log('📅 Scheduled jobs:');
      console.log('  - Daily complete automation: 9:00 AM');
      console.log('  - Weekly deep discovery: Monday 8:00 AM');
      console.log('  - Daily SERP monitoring: 2:00 PM');
      console.log('  - Weekly cleanup: Sunday 11:00 PM');
      console.log('  - Daily reports: 6:00 PM');
      
    } catch (error) {
      console.error('❌ Failed to install cron jobs:', error.message);
      console.log('📝 Manual installation:');
      console.log(`   crontab ${this.cronFile}`);
    }
  }

  installPM2() {
    try {
      // Check if PM2 is installed
      execSync('pm2 --version', { stdio: 'pipe' });
      
      // Generate PM2 config
      const pm2Config = this.generatePM2Config();
      fs.writeFileSync(this.pm2Config, pm2Config, 'utf8');
      
      console.log('✅ PM2 configuration generated');
      console.log('📝 To start with PM2:');
      console.log('   pm2 start ecosystem.config.js');
      console.log('   pm2 save');
      console.log('   pm2 startup');
      
    } catch (error) {
      console.log('⚠️  PM2 not installed. Install with: npm install -g pm2');
    }
  }

  generateSystemdService() {
    const serviceContent = `[Unit]
Description=WPS Office Backlink Automation
After=network.target

[Service]
Type=simple
User=${process.env.USER || 'root'}
WorkingDirectory=${this.projectRoot}
ExecStart=/usr/bin/node scripts/complete-automation.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target`;

    return serviceContent;
  }

  showManualInstructions() {
    console.log('\n📋 Manual Setup Instructions:');
    console.log('=============================');
    
    console.log('\n🕒 Option 1: Cron Jobs (Recommended)');
    console.log('1. Install cron jobs:');
    console.log(`   crontab ${this.cronFile}`);
    console.log('2. Verify installation:');
    console.log('   crontab -l');
    console.log('3. Check logs:');
    console.log('   tail -f logs/automation.log');
    
    console.log('\n🔄 Option 2: PM2 Process Manager');
    console.log('1. Install PM2: npm install -g pm2');
    console.log('2. Start automation: pm2 start ecosystem.config.js');
    console.log('3. Save PM2 config: pm2 save');
    console.log('4. Setup startup: pm2 startup');
    console.log('5. Monitor: pm2 monit');
    
    console.log('\n🐧 Option 3: Systemd Service (Linux)');
    console.log('1. Create service file:');
    console.log('   sudo nano /etc/systemd/system/wps-automation.service');
    console.log('2. Copy the generated service content');
    console.log('3. Enable and start:');
    console.log('   sudo systemctl enable wps-automation');
    console.log('   sudo systemctl start wps-automation');
    
    console.log('\n📊 Monitoring Commands:');
    console.log('  yarn sea:report          # Check backlink status');
    console.log('  yarn automate:complete   # Run manual automation');
    console.log('  tail -f logs/automation.log  # View automation logs');
  }

  run() {
    console.log('🚀 Setting up WPS Office Automation Scheduler...');
    
    this.setupLogging();
    this.installCron();
    this.installPM2();
    this.showManualInstructions();
    
    console.log('\n✅ Automation scheduler setup complete!');
    console.log('🎯 Your backlink and SERP monitoring will now run automatically.');
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Automation Scheduler Setup

Usage:
  node schedule-automation.js [options]

Options:
  --help, -h          Show this help message
  --cron-only         Only setup cron jobs
  --pm2-only          Only setup PM2 configuration
  --instructions-only Show manual setup instructions

Examples:
  node schedule-automation.js
  node schedule-automation.js --cron-only
  yarn schedule:automation
    `);
    return;
  }
  
  const scheduler = new AutomationScheduler();
  
  if (args.includes('--cron-only')) {
    scheduler.setupLogging();
    scheduler.installCron();
  } else if (args.includes('--pm2-only')) {
    scheduler.setupLogging();
    scheduler.installPM2();
  } else if (args.includes('--instructions-only')) {
    scheduler.showManualInstructions();
  } else {
    scheduler.run();
  }
}

main();
