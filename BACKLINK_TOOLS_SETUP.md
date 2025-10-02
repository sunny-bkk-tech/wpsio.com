# Backlink Tools Setup Guide

This guide explains how to set up and use the backlink discovery and management tools.

## Prerequisites

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Environment File (Optional)**
   Create a `.env` file in the project root with API keys (optional - tools work without them):

   ```env
   # Backlink Management API Keys (OPTIONAL - tools work without these)
   AHREFS_API_KEY=your_ahrefs_api_key_here
   MAJESTIC_API_KEY=your_majestic_api_key_here
   MOZ_API_KEY=your_moz_api_key_here
   SERPAPI_KEY=your_serpapi_key_here
   HUNTER_API_KEY=your_hunter_api_key_here
   
   # Email Configuration (for outreach)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

   **Note**: All tools work without API keys using free data sources!

## Available Tools

### 1. Free Backlink Discovery Tool (Recommended)

**Purpose**: Discovers potential backlink opportunities using only free data sources. No API keys required!

**Usage**:
```bash
# Discover all opportunities (FREE)
yarn free-discover --all

# Discover specific types
yarn free-discover --directories
yarn free-discover --publications
yarn free-discover --tech-blogs
yarn free-discover --business-blogs
yarn free-discover --resource-pages
```

**Output**: 
- `reports/backlinks/free-discovery/free-discovery-results-[timestamp].json` - Raw discovery data
- `reports/backlinks/free-discovery/free-outreach-list-[timestamp].json` - Prioritized outreach list
- `reports/backlinks/free-discovery/free-bulk-add-backlinks-[timestamp].sh` - Executable script to add all discovered backlinks
- `reports/backlinks/free-discovery/free-email-templates-[timestamp].json` - Email templates for outreach
- `reports/backlinks/free-discovery/free-opportunities-[timestamp].csv` - CSV file for easy import

### 2. Advanced Backlink Discovery Tool (Requires API Keys)

**Purpose**: Discovers potential backlink opportunities with advanced API integrations.

**Usage**:
```bash
# Discover all opportunities (requires API keys)
yarn discover --all

# Discover specific types
yarn discover --directories
yarn discover --publications
yarn discover --tech-blogs
yarn discover --competitors
```

**Output**: 
- `reports/backlinks/discovery/discovery-results.json` - Raw discovery data
- `reports/backlinks/discovery/outreach-list.json` - Prioritized outreach list
- `reports/backlinks/discovery/bulk-add-backlinks.sh` - Executable script to add all discovered backlinks

### 3. Advanced Backlink Manager (Works with or without API keys)

**Purpose**: Analyzes domains, finds contact emails, and manages outreach campaigns.

**Usage**:
```bash
# Analyze specific domains (works without API keys)
yarn manage --analyze example.com test.com

# Find contact emails (uses free email discovery)
yarn manage --emails example.com

# Analyze backlinks with Ahrefs (requires API key)
yarn manage --backlinks example.com

# Run all operations
yarn manage --all example.com

# Process domains from file
yarn manage --all --file scripts/sample-domains.txt
```

**Output**:
- `reports/backlinks/management/backlink-analysis-[timestamp].json` - Analysis results
- `reports/backlinks/management/outreach-templates-[timestamp].json` - Email templates
- `reports/backlinks/management/backlink-opportunities-[timestamp].csv` - CSV for import

### 4. Southeast Asia Backlink Tracker

**Purpose**: Tracks backlinks specifically from Southeast Asian websites.

**Usage**:
```bash
# Add SEA backlink
yarn sea:add --url "https://example.com" --domain "example.com" --type "guest" --quality "high"

# Generate SEA report
yarn sea:report
```

## API Services Integration (Optional)

**Note**: All tools work without API keys using free alternatives!

### Free Alternatives (Built-in)
- **DuckDuckGo API**: Free search results and resource page discovery
- **Pattern Matching**: Free email discovery using HTML parsing
- **Direct Website Analysis**: Free domain analysis and contact form detection

### Paid API Services (Optional)
### Ahrefs API
- **Purpose**: Backlink analysis and competitor research
- **Setup**: Get API key from Ahrefs
- **Features**: Domain backlink analysis, competitor research

### Majestic API
- **Purpose**: Backlink analysis and trust flow metrics
- **Setup**: Get API key from Majestic
- **Features**: Backlink data, trust flow analysis

### SerpAPI
- **Purpose**: Search results and resource page discovery
- **Setup**: Get API key from SerpAPI
- **Features**: Google search results, resource page discovery

### Hunter.io API
- **Purpose**: Email discovery for outreach
- **Setup**: Get API key from Hunter.io
- **Features**: Contact email discovery, email verification

## Workflow Examples

### 1. Complete Free Backlink Discovery Workflow (Recommended)

```bash
# Step 1: Discover opportunities (FREE - no API keys needed)
yarn free-discover --all

# Step 2: Review the generated outreach list
cat reports/backlinks/free-discovery/free-outreach-list-*.json

# Step 3: Add discovered backlinks to tracking
bash reports/backlinks/free-discovery/free-bulk-add-backlinks-*.sh

# Step 4: Generate SEA report
yarn sea:report
```

### 2. Advanced Backlink Discovery Workflow (Requires API Keys)

```bash
# Step 1: Discover opportunities (requires API keys)
yarn discover --all

# Step 2: Review the generated outreach list
cat reports/backlinks/discovery/outreach-list.json

# Step 3: Add discovered backlinks to tracking
bash reports/backlinks/discovery/bulk-add-backlinks.sh

# Step 4: Generate SEA report
yarn sea:report
```

### 2. Competitor Analysis Workflow

```bash
# Step 1: Analyze competitor domains
yarn manage --all --file scripts/competitor-domains.txt

# Step 2: Review analysis results
cat reports/backlinks/management/backlink-analysis-*.json

# Step 3: Find contact emails for outreach
yarn manage --emails competitor1.com competitor2.com
```

### 3. Resource Page Discovery Workflow

```bash
# Step 1: Discover resource pages
yarn manage --analyze --file scripts/resource-domains.txt

# Step 2: Review opportunities
cat reports/backlinks/management/backlink-opportunities-*.csv

# Step 3: Start outreach using generated templates
```

## Customization

### Adding New Target Domains

1. **Edit `scripts/sample-domains.txt`**:
   ```
   # Add your target domains here
   your-target-domain.com
   another-domain.com
   ```

2. **Run discovery**:
   ```bash
   yarn discover --all
   ```

### Customizing Outreach Templates

The tools generate email templates, but you can customize them in the code:

1. **Edit `scripts/backlink-manager.js`**
2. **Modify the `generateOutreachTemplates()` method**
3. **Add your custom templates**

### Adding New Southeast Asian Countries

1. **Edit `scripts/sea-backlink-tracker.js`**
2. **Add new countries to `SEA_COUNTRIES` object**
3. **Add corresponding domains to target lists**

## Best Practices

### 1. Rate Limiting
- Tools include built-in rate limiting
- Respect API limits and website policies
- Use delays between requests

### 2. Quality Control
- Review all discovered opportunities before outreach
- Focus on high-quality, relevant websites
- Avoid spammy or low-quality directories

### 3. Outreach Strategy
- Personalize all outreach emails
- Focus on value proposition for Southeast Asian markets
- Follow up appropriately

### 4. Tracking and Analysis
- Regularly run SEA reports
- Monitor backlink quality and performance
- Adjust strategy based on results

## Troubleshooting

### Common Issues

1. **API Key Errors**
   - Ensure all API keys are correctly set in `.env`
   - Check API key permissions and limits

2. **Rate Limiting**
   - Increase delays in configuration
   - Reduce concurrent requests

3. **Network Errors**
   - Check internet connection
   - Verify target websites are accessible

4. **File Permissions**
   - Ensure write permissions for reports directory
   - Check script execution permissions

### Getting Help

1. **Check logs** in the console output
2. **Review generated files** for detailed error information
3. **Verify API keys** and service status
4. **Check network connectivity** to target websites

## Security Notes

- Keep API keys secure and never commit them to version control
- Use environment variables for sensitive information
- Regularly rotate API keys
- Monitor API usage and costs
- Respect robots.txt and website terms of service
