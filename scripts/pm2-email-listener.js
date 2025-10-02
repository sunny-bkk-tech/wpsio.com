import { exec } from "child_process";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pm2 = require('pm2');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

pm2.connect(function(err) {
  if (err) {
    console.error('Error connecting to PM2:', err);
    process.exit(1);
  }

  pm2.launchBus(function(err, bus) {
    if (err) {
      console.error('Error launching PM2 bus:', err);
      pm2.disconnect();
      return;
    }

    console.log('PM2 Bus launched - monitoring for process exits...');

    bus.on('process:event', function(data) {
      if (data.event === 'exit') {
        console.log(`Process ${data.process.name} exited at ${new Date().toISOString()}`);
        
        // Use __dirname to get the current script's directory
        const reportMailerPath = join(__dirname, 'reportmailer.js');
        
        exec(
          `node "${reportMailerPath}" "${data.process.name}"`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing notify script: ${error}`);
              return;
            }
            console.log(`Notification sent for ${data.process.name}`);
            if (stdout) console.log(stdout);
            if (stderr) console.error(stderr);
          }
        );
      }
    });
  });
});

// Handle graceful shutdown
process.on('SIGINT', function() {
  console.log('Shutting down PM2 email listener...');
  pm2.disconnect();
  process.exit();
});

process.on('SIGTERM', function() {
  console.log('Shutting down PM2 email listener...');
  pm2.disconnect();
  process.exit();
});
