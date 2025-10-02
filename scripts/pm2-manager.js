#!/usr/bin/env node
/*
PM2 Manager Script
Simple interface for managing PM2 processes for WPS Office.
*/

import { execSync } from 'child_process';

class PM2Manager {
  constructor() {
    this.processes = [
      'wps-app',
      'wps-automation', 
      'wps-serp-monitor',
      'wps-build-deploy'
    ];
  }

  runCommand(command) {
    try {
      const output = execSync(command, { 
        encoding: 'utf8',
        stdio: 'inherit'
      });
      return output;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }

  start() {
    console.log('🚀 Starting all PM2 processes...');
    this.runCommand('pm2 start ecosystem.config.cjs');
    this.runCommand('pm2 save');
    console.log('✅ All processes started and saved');
  }

  stop() {
    console.log('🛑 Stopping all PM2 processes...');
    this.runCommand('pm2 stop all');
    console.log('✅ All processes stopped');
  }

  restart() {
    console.log('🔄 Restarting all PM2 processes...');
    this.runCommand('pm2 restart all');
    console.log('✅ All processes restarted');
  }

  reload() {
    console.log('🔄 Reloading all PM2 processes...');
    this.runCommand('pm2 reload all');
    console.log('✅ All processes reloaded');
  }

  status() {
    console.log('📊 PM2 Process Status:');
    this.runCommand('pm2 status');
  }

  logs() {
    console.log('📋 PM2 Logs:');
    this.runCommand('pm2 logs --lines 50');
  }

  monit() {
    console.log('📊 Opening PM2 Monitor...');
    this.runCommand('pm2 monit');
  }

  buildDeploy() {
    console.log('🔨 Running build and deploy...');
    this.runCommand('yarn pm2:build-deploy');
  }

  delete() {
    console.log('🗑️  Deleting all PM2 processes...');
    this.runCommand('pm2 delete all');
    console.log('✅ All processes deleted');
  }

  setup() {
    console.log('⚙️  Setting up PM2 for WPS Office...');
    
    // Install PM2 if not installed
    try {
      execSync('pm2 --version', { stdio: 'pipe' });
    } catch (error) {
      console.log('📦 Installing PM2...');
      this.runCommand('npm install -g pm2');
    }
    
    // Start processes
    this.start();
    
    // Setup startup
    console.log('🔧 Setting up PM2 startup...');
    this.runCommand('pm2 startup');
    
    console.log('✅ PM2 setup complete!');
    console.log('\n📋 Available commands:');
    console.log('  yarn pm2:start     - Start all processes');
    console.log('  yarn pm2:stop      - Stop all processes');
    console.log('  yarn pm2:restart   - Restart all processes');
    console.log('  yarn pm2:reload    - Reload all processes');
    console.log('  yarn pm2:status    - Show process status');
    console.log('  yarn pm2:logs      - Show logs');
    console.log('  yarn pm2:monit     - Open monitor');
    console.log('  yarn pm2:build-deploy - Build and deploy');
  }

  showHelp() {
    console.log(`
PM2 Manager for WPS Office

Usage:
  node pm2-manager.js [command]

Commands:
  setup           Setup PM2 and start all processes
  start           Start all processes
  stop            Stop all processes
  restart         Restart all processes
  reload          Reload all processes
  status          Show process status
  logs            Show logs
  monit           Open PM2 monitor
  build-deploy    Run build and deploy
  delete          Delete all processes
  help            Show this help

Examples:
  node pm2-manager.js setup
  node pm2-manager.js start
  node pm2-manager.js status
  yarn pm2:start
  yarn pm2:status
    `);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  const manager = new PM2Manager();
  
  switch (command) {
    case 'setup':
      manager.setup();
      break;
    case 'start':
      manager.start();
      break;
    case 'stop':
      manager.stop();
      break;
    case 'restart':
      manager.restart();
      break;
    case 'reload':
      manager.reload();
      break;
    case 'status':
      manager.status();
      break;
    case 'logs':
      manager.logs();
      break;
    case 'monit':
      manager.monit();
      break;
    case 'build-deploy':
      manager.buildDeploy();
      break;
    case 'delete':
      manager.delete();
      break;
    case 'help':
    default:
      manager.showHelp();
      break;
  }
}

main();
