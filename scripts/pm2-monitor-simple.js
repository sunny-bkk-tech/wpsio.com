#!/usr/bin/env node
/**
 * Simple PM2 Monitor using CLI
 * Watches PM2 processes and sends email notifications when they crash
 * No PM2 module dependency required - uses pm2 jlist command
 */

import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CHECK_INTERVAL = 30000; // Check every 30 seconds
const STATE_FILE = join(__dirname, '..', 'logs', 'pm2-monitor-state.json');

// Track process states
let processStates = {};

function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const data = fs.readFileSync(STATE_FILE, 'utf8');
      processStates = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading state:', err);
    processStates = {};
  }
}

function saveState() {
  try {
    const logsDir = dirname(STATE_FILE);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    fs.writeFileSync(STATE_FILE, JSON.stringify(processStates, null, 2));
  } catch (err) {
    console.error('Error saving state:', err);
  }
}

function sendNotification(processName, status) {
  const reportMailerPath = join(__dirname, 'reportmailer.js');
  
  exec(
    `node "${reportMailerPath}" "${processName}" "${status}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error sending notification: ${error.message}`);
        return;
      }
      console.log(`Notification sent for ${processName} (${status})`);
      if (stdout) console.log(stdout);
    }
  );
}

function checkProcesses() {
  exec('pm2 jlist', (error, stdout, stderr) => {
    if (error) {
      console.error('Error checking PM2 processes:', error.message);
      return;
    }

    try {
      const processes = JSON.parse(stdout);
      const now = Date.now();

      processes.forEach(proc => {
        const name = proc.name;
        const status = proc.pm2_env.status;
        const restarts = proc.pm2_env.restart_time || 0;

        // Initialize state if new process
        if (!processStates[name]) {
          processStates[name] = {
            status: status,
            restarts: restarts,
            lastCheck: now
          };
          return;
        }

        // Check for status change
        const oldStatus = processStates[name].status;
        const oldRestarts = processStates[name].restarts;

        // Process crashed or stopped
        if (oldStatus === 'online' && (status === 'stopped' || status === 'errored')) {
          console.log(`🚨 Process ${name} changed from ${oldStatus} to ${status}`);
          sendNotification(name, status);
        }

        // Process restarted (crash with auto-restart)
        if (restarts > oldRestarts) {
          console.log(`🔄 Process ${name} restarted (restart count: ${restarts})`);
          sendNotification(name, 'restarted');
        }

        // Update state
        processStates[name] = {
          status: status,
          restarts: restarts,
          lastCheck: now
        };
      });

      saveState();

    } catch (parseError) {
      console.error('Error parsing PM2 output:', parseError.message);
    }
  });
}

// Load previous state
loadState();

console.log('🔍 PM2 Monitor started - checking processes every 30 seconds...');
console.log('📧 Email notifications will be sent when processes crash or restart');

// Initial check
checkProcesses();

// Check periodically
setInterval(checkProcesses, CHECK_INTERVAL);

// Handle graceful shutdown
process.on('SIGINT', function() {
  console.log('\n👋 Shutting down PM2 monitor...');
  saveState();
  process.exit();
});

process.on('SIGTERM', function() {
  console.log('\n👋 Shutting down PM2 monitor...');
  saveState();
  process.exit();
});

