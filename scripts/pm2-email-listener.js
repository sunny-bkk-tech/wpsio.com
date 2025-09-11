import pm2 from "pm2";
import { exec } from "child_process";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

    console.log('PM2 Bus launched');

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
          }
        );
      }
    });
  });
});

// Handle graceful shutdown
process.on('SIGINT', function() {
  pm2.disconnect();
  process.exit();
});