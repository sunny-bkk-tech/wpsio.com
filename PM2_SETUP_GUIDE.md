# 🚀 PM2 Setup Guide for WPS Office

## 🎯 **Simple Setup - Just 3 Commands**

### **Step 1: Install PM2 (if not already installed)**
```bash
npm install -g pm2
```

### **Step 2: Setup and Start Everything**
```bash
yarn pm2:manager setup
```

### **Step 3: Check Status**
```bash
yarn pm2:status
```

## 🎉 **That's It! You're Done!**

Your PM2 setup will now automatically:
- **Run your WPS app** (24/7)
- **Run automation daily** (9 AM - backlinks + SERP)
- **Run SERP monitoring** (2 PM daily)
- **Build and deploy** (6 AM daily)

## 📋 **Available Commands**

### **Basic PM2 Commands**
```bash
yarn pm2:start      # Start all processes
yarn pm2:stop       # Stop all processes
yarn pm2:restart    # Restart all processes
yarn pm2:reload     # Reload all processes
yarn pm2:status     # Show process status
yarn pm2:logs       # Show logs
yarn pm2:monit      # Open PM2 monitor
yarn pm2:save       # Save PM2 configuration
yarn pm2:delete     # Delete all processes
```

### **Build and Deploy**
```bash
yarn pm2:build-deploy    # Run automation + build + reload
```

### **Manager Interface**
```bash
yarn pm2:manager setup      # Setup everything
yarn pm2:manager start      # Start all processes
yarn pm2:manager status     # Show status
yarn pm2:manager logs       # Show logs
yarn pm2:manager monit      # Open monitor
```

## 🔄 **What Happens Automatically**

### **Daily at 9:00 AM**
- Runs backlink discovery
- Adds new backlinks to tracking
- Generates SERP monitoring links
- Analyzes opportunities
- Creates reports

### **Daily at 2:00 PM**
- Generates SERP ranking links
- Updates SERP reports

### **Daily at 6:00 AM**
- Builds your WPS app
- Reloads PM2 processes
- Saves PM2 configuration

## 📊 **Monitoring Your System**

### **Check Status**
```bash
yarn pm2:status
```

### **View Logs**
```bash
yarn pm2:logs
```

### **Open Monitor**
```bash
yarn pm2:monit
```

### **Check Backlink Status**
```bash
yarn sea:report
```

## 🛠️ **Troubleshooting**

### **If Something Goes Wrong**
```bash
# Restart everything
yarn pm2:restart

# Check logs
yarn pm2:logs

# Check status
yarn pm2:status
```

### **If You Need to Start Over**
```bash
# Delete all processes
yarn pm2:delete

# Setup again
yarn pm2:manager setup
```

## 📁 **Log Files**

All logs are saved in the `logs/` directory:
- `logs/wps-app.log` - Main app logs
- `logs/automation.log` - Automation logs
- `logs/serp-monitor.log` - SERP monitoring logs
- `logs/build-deploy.log` - Build and deploy logs

## 🎯 **What You Get**

With this PM2 setup, you get:
- **24/7 WPS app** running
- **Daily automation** for backlinks and SERP
- **Automatic builds** and deployments
- **Comprehensive logging** and monitoring
- **Easy management** with simple commands

## 🚀 **Quick Start Summary**

1. **Install PM2**: `npm install -g pm2`
2. **Setup everything**: `yarn pm2:manager setup`
3. **Check status**: `yarn pm2:status`
4. **Monitor**: `yarn pm2:monit`

**That's it!** Your WPS Office app is now running with full automation! 🎉
