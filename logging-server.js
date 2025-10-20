// A simple Node.js server for logging visitor data AND serving the app.
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import path from 'path';
import fs from 'fs';
import geoip from 'geoip-lite';
import { fileURLToPath } from 'url';

// ES module equivalents for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOG_FILE_PATH = path.join(__dirname, 'visitor_logs.jsonl');

const app = express();
const PORT = process.env.PORT || 8080; // Use the main application port

// Configure pino with file output
const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
}, pino.destination({
  dest: LOG_FILE_PATH,
  sync: false, // Async writes for better performance
  mkdir: true
}));

// Middleware setup
app.set('trust proxy', 1); // Trust the first proxy in front of the app (e.g., Nginx)
app.use(cors());
app.use(express.json());

// API endpoint to get all logs (visitor logs only, filter out server startup logs)
app.get('/api/logs', (req, res) => {
  fs.readFile(LOG_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // If the file doesn't exist yet, return an empty array
        return res.json([]);
      }
      console.error('Failed to read log file:', err);
      return res.status(500).send({ error: 'Failed to read logs' });
    }
    // The file is a series of JSON objects, one per line (JSONL format)
    const allLogs = data.trim().split('\n').filter(line => line).map(line => {
      try {
        return JSON.parse(line);
      } catch (e) {
        return null;
      }
    }).filter(log => log !== null);
    
    // Filter to only show visitor logs (those with 'event' field or 'path' starting with /)
    const visitorLogs = allLogs.filter(log => 
      log.event === 'page_view' || (log.path && !log.msg?.includes('Server started'))
    );
    
    res.json(visitorLogs.reverse()); // Show newest logs first
  });
});


// API logging endpoint
app.post('/api/log', (req, res) => {
  // Use req.ip which is more reliable behind a proxy when 'trust proxy' is set
  let ip = req.ip; 
  
  // For testing: allow X-Forwarded-For header to simulate different IPs
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0].trim();
  }
  
  // Clean IPv6-mapped IPv4 addresses (remove ::ffff: prefix)
  if (ip && ip.startsWith('::ffff:')) {
    ip = ip.substring(7);
  }
  
  // Look up country from IP address
  const geo = geoip.lookup(ip);
  
  // Get country code from geo lookup, or 'Unknown' if not found
  const country = geo ? geo.country : 'Unknown';
  
  const logData = { 
    ip, 
    country,
    city: geo?.city || '',
    region: geo?.region || '',
    ...req.body 
  };
  logger.info(logData, `Page View: ${logData.path} from ${country}`);
  res.status(200).send({ status: 'ok' });
});

// API endpoint to run SEO check
app.post('/api/run-seo-check', async (req, res) => {
  const logsDir = path.join(__dirname, 'logs');
  const today = new Date().toISOString().split('T')[0];
  const reportPath = path.join(logsDir, `seo-report-${today}.json`);
  
  try {
    // First, check if we have a recent report (within last 5 minutes)
    if (fs.existsSync(reportPath)) {
      const stats = fs.statSync(reportPath);
      const fileAge = Date.now() - stats.mtimeMs;
      const fiveMinutes = 5 * 60 * 1000;
      
      // If report is less than 5 minutes old, return it immediately
      if (fileAge < fiveMinutes) {
        const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        console.log('Returning cached SEO report (less than 5 minutes old)');
        return res.json(reportData);
      }
    }
    
    // Run check in background with shorter timeout
    const { exec } = await import('child_process');
    const seoCheckPath = path.join(__dirname, 'scripts', 'seo-daily-check.cjs');
    
    // Start the check but don't wait for it to complete if it's slow
    const checkProcess = exec(`node "${seoCheckPath}"`, {
      cwd: __dirname,
      timeout: 15000 // 15 second timeout
    });
    
    // Wait with a promise that has its own timeout
    const checkPromise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        checkProcess.kill();
        reject(new Error('Check timeout'));
      }, 15000);
      
      checkProcess.on('close', (code) => {
        clearTimeout(timeout);
        resolve(code);
      });
      
      checkProcess.on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });
    
    try {
      await checkPromise;
    } catch (execError) {
      // Check timed out or failed - try to read existing report
      console.log('SEO check timed out or failed, reading existing report if available');
    }
    
    // Read the report file (should exist whether check completed or not)
    if (fs.existsSync(reportPath)) {
      const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      return res.json(reportData);
    } else {
      return res.status(503).json({ 
        error: 'SEO check in progress',
        message: 'First-time check is running. Please try again in 30 seconds.',
        details: 'Report file not yet generated'
      });
    }
  } catch (error) {
    console.error('SEO check error:', error.message);
    
    // Last resort: try to read any existing report
    if (fs.existsSync(reportPath)) {
      const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      return res.json(reportData);
    }
    
    res.status(503).json({ 
      error: 'SEO check unavailable', 
      message: 'The check is taking longer than expected. Please try again in a moment.',
      details: error.message 
    });
  }
});

// API endpoint to get SEO reports history
app.get('/api/seo-reports', (req, res) => {
  try {
    const logsDir = path.join(__dirname, 'logs');
    
    if (!fs.existsSync(logsDir)) {
      return res.json([]);
    }
    
    // Find all seo-report-*.json files
    const files = fs.readdirSync(logsDir)
      .filter(file => file.startsWith('seo-report-') && file.endsWith('.json'))
      .sort()
      .reverse(); // Newest first
    
    const reports = files.slice(0, 30).map(file => {
      const filePath = path.join(logsDir, file);
      try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        return null;
      }
    }).filter(report => report !== null);
    
    res.json(reports);
  } catch (error) {
    console.error('Failed to read SEO reports:', error);
    res.status(500).json({ error: 'Failed to read SEO reports' });
  }
});

// --- Static File Serving ---
// Serve the built React application
const buildPath = path.join(__dirname, 'dist');

// Serve static files from dist
app.use(express.static(buildPath, {
  index: false // Don't serve index.html automatically
}));

// For any other request (that's not an API route), serve the index.html file so client-side routing works
app.get('*', (req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  const startupMsg = `Server started on http://localhost:${PORT}. Serving files from ${buildPath}`;
  logger.info(startupMsg);
  console.log(`✓ ${startupMsg}`);
  console.log(`✓ Visitor logs: ${LOG_FILE_PATH}`);
  console.log(`✓ Log viewer: http://localhost:${PORT}/logs`);
});

