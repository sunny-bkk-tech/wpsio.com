#!/usr/bin/env node
/*
PM2 Build and Deploy Script
Handles building the app, running automation, and reloading PM2 processes.
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PM2BuildDeploy {
  constructor() {
    this.projectRoot = process.cwd();
    this.logFile = path.join(this.projectRoot, 'logs', 'build-deploy.log');
    this.startTime = Date.now();
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    console.log(logMessage.trim());
    
    // Ensure logs directory exists
    const logsDir = path.dirname(this.logFile);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    fs.appendFileSync(this.logFile, logMessage, 'utf8');
  }

  async runCommand(command, description) {
    try {
      this.log(`Starting: ${description}`);
      const output = execSync(command, { 
        encoding: 'utf8',
        cwd: this.projectRoot,
        stdio: 'pipe',
        env: {
          ...process.env,
          NODE_ENV: 'production'
        }
      });
      this.log(`Completed: ${description}`);
      return output;
    } catch (error) {
      this.log(`Error in ${description}: ${error.message}`);
      throw error;
    }
  }

  async runAutomation() {
    this.log('🤖 Running automation...');
    
    try {
      // Run complete automation
      await this.runCommand(
        'yarn automate:complete',
        'Complete automation (backlinks + SERP)'
      );
      
      this.log('✅ Automation completed successfully');
    } catch (error) {
      this.log(`❌ Automation failed: ${error.message}`);
      // Don't fail the entire process if automation fails
    }
  }

  async buildApp() {
    this.log('🔨 Building WPS app...');
    
    try {
      // Try yarn first, fallback to npm if yarn fails
      try {
        // Remove package-lock.json if it exists to avoid conflicts
        const packageLockPath = path.join(this.projectRoot, 'package-lock.json');
        if (fs.existsSync(packageLockPath)) {
          fs.unlinkSync(packageLockPath);
          this.log('Removed package-lock.json to avoid conflicts with yarn');
        }
        
        // Also remove node_modules to ensure clean install
        const nodeModulesPath = path.join(this.projectRoot, 'node_modules');
        if (fs.existsSync(nodeModulesPath)) {
          fs.rmSync(nodeModulesPath, { recursive: true, force: true });
          this.log('Removed node_modules for clean yarn install');
        }
        
        await this.runCommand(
          'yarn install --production=false',
          'Installing dependencies with yarn (including devDependencies)'
        );
        
        
        await this.runCommand(
          'yarn build',
          'Building WPS app with yarn'
        );
      } catch (yarnError) {
        this.log('⚠️  Yarn failed, trying npm...');
        
        await this.runCommand(
          'npm install --include=dev',
          'Installing dependencies with npm'
        );
        
        await this.runCommand(
          'npm run build',
          'Building WPS app with npm'
        );
      }
      
      this.log('✅ App built successfully');
    } catch (error) {
      this.log(`❌ Build failed: ${error.message}`);
      throw error; // Fail the entire process if build fails
    }
  }

  async reloadPM2() {
    this.log('🔄 Reloading PM2 processes...');
    
    try {
      // Reload the main app
      await this.runCommand(
        'pm2 reload wps-app',
        'Reloading WPS app'
      );
      
      // Restart automation processes
      await this.runCommand(
        'pm2 restart wps-automation wps-serp-monitor',
        'Restarting automation processes'
      );
      
      this.log('✅ PM2 processes reloaded successfully');
    } catch (error) {
      this.log(`❌ PM2 reload failed: ${error.message}`);
      throw error;
    }
  }

  async generateReport() {
    this.log('📊 Generating status report...');
    
    try {
      // Generate backlink report
      await this.runCommand(
        'yarn sea:report',
        'Generating SEA backlink report'
      );
      
      // Generate general backlink report
      await this.runCommand(
        'yarn backlink:report',
        'Generating general backlink report'
      );
      
      this.log('✅ Reports generated successfully');
    } catch (error) {
      this.log(`❌ Report generation failed: ${error.message}`);
      // Don't fail the entire process if reports fail
    }
  }

  async savePM2Config() {
    this.log('💾 Saving PM2 configuration...');
    
    try {
      await this.runCommand(
        'pm2 save',
        'Saving PM2 configuration'
      );
      
      this.log('✅ PM2 configuration saved');
    } catch (error) {
      this.log(`❌ PM2 save failed: ${error.message}`);
      // Don't fail the entire process if PM2 save fails
    }
  }

  async generateSummary() {
    const totalTime = Date.now() - this.startTime;
    
    const summary = {
      timestamp: new Date().toISOString(),
      totalTime: `${(totalTime / 1000).toFixed(1)} seconds`,
      tasks: {
        automation: 'completed',
        build: 'completed',
        pm2Reload: 'completed',
        reports: 'completed',
        pm2Save: 'completed'
      },
      nextSteps: [
        'Check app status: pm2 status',
        'View logs: pm2 logs wps-app',
        'Monitor automation: pm2 logs wps-automation',
        'Check backlink status: yarn sea:report'
      ]
    };
    
    const summaryPath = path.join(this.projectRoot, 'logs', 'build-deploy-summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');
    
    this.log('📋 Build and deploy summary generated');
  }

  async run() {
    this.log('🚀 Starting PM2 build and deploy process...');
    
    try {
      // Run automation first
      await this.runAutomation();
      
      // Build the app
      await this.buildApp();
      
      // Reload PM2 processes
      await this.reloadPM2();
      
      // Generate reports
      await this.generateReport();
      
      // Save PM2 configuration
      await this.savePM2Config();
      
      // Generate summary
      await this.generateSummary();
      
      const totalTime = Date.now() - this.startTime;
      this.log(`🎉 PM2 build and deploy completed successfully in ${(totalTime / 1000).toFixed(1)} seconds!`);
      
      // Display next steps
      this.log('\n📋 Next Steps:');
      this.log('1. Check app status: pm2 status');
      this.log('2. View app logs: pm2 logs wps-app');
      this.log('3. Monitor automation: pm2 logs wps-automation');
      this.log('4. Check backlink status: yarn sea:report');
      this.log('5. View build logs: tail -f logs/build-deploy.log');
      
    } catch (error) {
      this.log(`💥 PM2 build and deploy failed: ${error.message}`);
      process.exit(1);
    }
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
PM2 Build and Deploy Script

Usage:
  node pm2-build-deploy.js [options]

Options:
  --help, -h          Show this help message
  --automation-only   Only run automation
  --build-only        Only build the app
  --reload-only       Only reload PM2 processes
  --reports-only      Only generate reports

Examples:
  node pm2-build-deploy.js
  node pm2-build-deploy.js --build-only
  node pm2-build-deploy.js --reload-only
    `);
    return;
  }
  
  const buildDeploy = new PM2BuildDeploy();
  
  if (args.includes('--automation-only')) {
    buildDeploy.runAutomation()
      .then(() => buildDeploy.generateSummary());
  } else if (args.includes('--build-only')) {
    buildDeploy.buildApp()
      .then(() => buildDeploy.generateSummary());
  } else if (args.includes('--reload-only')) {
    buildDeploy.reloadPM2()
      .then(() => buildDeploy.generateSummary());
  } else if (args.includes('--reports-only')) {
    buildDeploy.generateReport()
      .then(() => buildDeploy.generateSummary());
  } else {
    // Run complete build and deploy
    buildDeploy.run();
  }
}

main();
