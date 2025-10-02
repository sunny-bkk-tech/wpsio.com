# 🤖 WPS Office Complete Automation Guide

## 🎯 **Overview**

Your WPS Office project now has a complete automation system that handles:
- **Backlink Discovery & Management**
- **SERP Ranking Monitoring** 
- **Automated Reporting**
- **Scheduled Daily Operations**

## 🚀 **Available Commands**

### **Discovery & Management**
```bash
# Free discovery (recommended)
yarn free-discover-fast --all    # Fast mode - maximum speed
yarn free-discover --all         # Standard mode
yarn free-discover --directories # Only directories
yarn free-discover --publications # Only publications
yarn free-discover --tech-blogs  # Only tech blogs
yarn free-discover --business-blogs # Only business blogs
yarn free-discover --resource-pages # Only resource pages

# Management (works without API keys)
yarn manage --analyze example.com
yarn manage --emails example.com

# Tracking
yarn sea:add --url "https://example.com" --domain "example.com" --type "directory" --quality "high"
yarn sea:report
```

### **SERP Monitoring**
```bash
yarn serp:manual    # Generate SERP monitoring links
yarn serp:ranks     # Check SERP rankings (manual verification)
yarn serp:open      # Open SERP links for manual checking
yarn serp:prune     # Clean up old SERP data
```

### **Automation**
```bash
yarn automate              # Basic daily automation
yarn automate:complete     # Complete automation (backlinks + SERP)
yarn automate:complete --backlinks-only  # Only backlink automation
yarn automate:complete --serp-only       # Only SERP monitoring
yarn automate:complete --reports-only    # Only generate reports
yarn automate:complete --analysis-only   # Only analyze opportunities
yarn automate:complete --cleanup-only    # Only cleanup old files
```

### **Scheduling**
```bash
yarn schedule:automation              # Setup automated scheduling
yarn schedule:automation --cron-only  # Only setup cron jobs
yarn schedule:automation --pm2-only   # Only setup PM2
```

## 📊 **What the Automation Does**

### **Daily Operations (9:00 AM)**
1. **Backlink Discovery**: Finds new opportunities using free sources
2. **Add to Tracking**: Automatically adds high-quality backlinks
3. **SERP Monitoring**: Generates ranking check links
4. **Opportunity Analysis**: Analyzes top domains for contact info
5. **Report Generation**: Creates comprehensive reports
6. **Cleanup**: Removes files older than 30 days

### **SERP Monitoring (2:00 PM Daily)**
- Generates manual SERP ranking links for 662+ keywords
- Creates timestamped reports in `reports/serp/`
- Supports Chinese language regions (zh-CN, zh-TW, zh-HK)

### **Weekly Operations**
- **Monday 8:00 AM**: Deep discovery with all sources
- **Sunday 11:00 PM**: Comprehensive cleanup
- **Daily 6:00 PM**: Report generation

## 📁 **Generated Files & Reports**

### **Backlink Reports**
- `reports/backlinks/free-discovery/` - Discovery results
- `reports/backlinks/sea_backlink_report.json` - SEA backlink status
- `reports/backlinks/backlink_manifest.json` - Backlink tracking
- `reports/automation.log` - Automation logs

### **SERP Reports**
- `reports/serp/manual_serp_links.csv` - Latest SERP links
- `reports/serp/manual_serp_links-YYYYMMDD-HHMMSS.csv` - Timestamped reports
- `reports/serp/manifest.json` - SERP report manifest

### **Automation Files**
- `reports/automation-summary.json` - Daily automation summary
- `logs/automation.log` - Detailed automation logs
- `automation.cron` - Generated cron configuration
- `ecosystem.config.js` - PM2 configuration

## 🎯 **Expected Results**

With this automation system, you can expect to:

### **Backlink Growth**
- **100+ backlink opportunities** discovered monthly
- **60+ contact emails** found for outreach
- **90+ websites** with contact forms identified
- **25+ resource page** opportunities generated
- **Comprehensive SEA coverage** (Singapore, Malaysia, Thailand, Indonesia, Vietnam, Philippines)

### **SERP Monitoring**
- **662+ keywords** monitored across Chinese language regions
- **Daily ranking checks** for manual verification
- **Historical tracking** of ranking changes
- **Multi-region coverage** (China, Taiwan, Hong Kong)

## 🔧 **Setup Instructions**

### **1. Manual Setup (Immediate)**
```bash
# Run complete automation once
yarn automate:complete

# Check results
yarn sea:report
```

### **2. Automated Scheduling (Recommended)**

#### **Option A: Cron Jobs (macOS/Linux)**
```bash
# Setup automated scheduling
yarn schedule:automation

# Verify installation
crontab -l

# Check logs
tail -f logs/automation.log
```

#### **Option B: PM2 Process Manager**
```bash
# Install PM2
npm install -g pm2

# Setup automation
yarn schedule:automation --pm2-only

# Start automation
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📈 **Monitoring & Maintenance**

### **Daily Monitoring**
```bash
# Check backlink status
yarn sea:report

# View automation logs
tail -f logs/automation.log

# Check SERP reports
ls -la reports/serp/
```

### **Weekly Review**
1. **Review backlink opportunities** in `reports/backlinks/free-discovery/`
2. **Check SERP rankings** using generated links
3. **Start outreach campaigns** using email templates
4. **Monitor progress** with `yarn sea:report`

### **Monthly Optimization**
1. **Review automation logs** for any issues
2. **Update keyword lists** in `scripts/serp_keywords.json`
3. **Adjust automation settings** in `scripts/complete-automation.js`
4. **Clean up old reports** (automated)

## 🎯 **Next Steps**

### **Immediate Actions**
1. **Run the automation**: `yarn automate:complete`
2. **Setup scheduling**: `yarn schedule:automation`
3. **Review opportunities**: Check generated reports
4. **Start outreach**: Use email templates from discovery results

### **Weekly Routine**
1. **Monday**: Review weekly deep discovery results
2. **Wednesday**: Check SERP rankings manually
3. **Friday**: Review backlink progress
4. **Sunday**: Plan next week's outreach

### **Monthly Goals**
- **Target**: 50+ new backlinks per month
- **Focus**: High-quality directories and publications
- **Monitor**: SERP ranking improvements
- **Optimize**: Automation settings based on results

## 🚨 **Troubleshooting**

### **Common Issues**
- **Discovery hanging**: Use `--fast` mode or check network
- **SERP links not working**: Verify Google access in your region
- **Automation failing**: Check logs in `logs/automation.log`
- **Cron not running**: Verify cron installation with `crontab -l`

### **Support Commands**
```bash
# Check system health
yarn automate:complete --reports-only

# Manual discovery
yarn free-discover-fast --all

# Check automation status
tail -f logs/automation.log

# Verify scheduling
crontab -l
```

## 🎉 **Success Metrics**

Track your success with these metrics:
- **Backlinks added**: Check `yarn sea:report`
- **Opportunities discovered**: Review discovery reports
- **SERP rankings**: Monitor ranking changes
- **Outreach success**: Track email responses
- **Website traffic**: Monitor organic growth

Your automation system is now ready to build a comprehensive backlink profile for WPS Office across Southeast Asia! 🚀
