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

