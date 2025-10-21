# Google Search Console DNS Verification Guide

**Domain:** wpsio.com  
**Verification Code:** `google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI`  
**Date:** October 21, 2025

---

## 📋 **DNS TXT Record to Add**

**Record Type:** TXT  
**Host/Name:** @ (or leave blank, or "wpsio.com")  
**Value/Content:** `google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI`  
**TTL:** 3600 (or default)

---

## 🔧 **INSTRUCTIONS BY DNS PROVIDER**

### **Option 1: GoDaddy**

1. Go to: https://dcc.godaddy.com/manage/dns
2. Find your domain: **wpsio.com**
3. Click **DNS** button
4. Scroll to **Records** section
5. Click **ADD** button
6. Fill in:
   - **Type:** TXT
   - **Host:** @ 
   - **TXT Value:** `google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI`
   - **TTL:** 1 Hour (default)
7. Click **Save**
8. Wait 5-60 minutes for propagation

---

### **Option 2: Namecheap**

1. Go to: https://ap.www.namecheap.com/domains/list/
2. Find **wpsio.com** and click **Manage**
3. Click **Advanced DNS** tab
4. Click **ADD NEW RECORD**
5. Fill in:
   - **Type:** TXT Record
   - **Host:** @
   - **Value:** `google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI`
   - **TTL:** Automatic
6. Click **Save All Changes** (green checkmark)
7. Wait 5-60 minutes for propagation

---

### **Option 3: Cloudflare**

1. Go to: https://dash.cloudflare.com/
2. Select your domain: **wpsio.com**
3. Click **DNS** in left menu
4. Click **Add record**
5. Fill in:
   - **Type:** TXT
   - **Name:** @
   - **Content:** `google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI`
   - **TTL:** Auto
6. Click **Save**
7. Wait 5-30 minutes (Cloudflare is usually faster)

---

### **Option 4: Google Domains**

1. Go to: https://domains.google.com/registrar/
2. Click on **wpsio.com**
3. Click **DNS** in left menu
4. Scroll to **Custom records**
5. Click **Manage custom records**
6. Click **Create new record**
7. Fill in:
   - **Host name:** @ (leave blank)
   - **Type:** TXT
   - **TTL:** 1 hour
   - **Data:** `google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI`
8. Click **Save**
9. Wait 5-30 minutes

---

### **Option 5: Route 53 (AWS)**

1. Go to: https://console.aws.amazon.com/route53/
2. Click **Hosted zones**
3. Select **wpsio.com**
4. Click **Create record**
5. Fill in:
   - **Record name:** (leave blank)
   - **Record type:** TXT
   - **Value:** `"google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI"`
   - **TTL:** 300
6. Click **Create records**
7. Wait 5-60 minutes

---

### **Option 6: Other DNS Providers**

**General Steps:**
1. Log in to your DNS provider control panel
2. Find DNS management or DNS records section
3. Add a new TXT record with:
   - **Host/Name:** @ or blank or wpsio.com
   - **Value:** `google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI`
   - **TTL:** 3600 or Auto
4. Save changes
5. Wait for DNS propagation (5 minutes to 24 hours)

---

## ✅ **VERIFICATION STEPS**

### **After Adding DNS Record:**

1. **Wait for Propagation** (5-60 minutes usually, up to 24 hours max)

2. **Check DNS Propagation** (Optional):
   - Go to: https://dnschecker.org/
   - Enter: `wpsio.com`
   - Select: TXT record
   - Verify you see the google-site-verification record globally

3. **Verify in Google Search Console:**
   - Go back to: https://search.google.com/search-console/
   - Click **VERIFY** button
   - If successful: ✅ "Ownership verified"
   - If failed: Wait longer or check DNS record

---

## 🔍 **CHECKING DNS RECORD VIA COMMAND LINE**

### **Mac/Linux:**
```bash
dig TXT wpsio.com
# or
nslookup -type=TXT wpsio.com
```

### **Windows:**
```cmd
nslookup -type=TXT wpsio.com
```

**You should see:**
```
wpsio.com. TXT "google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI"
```

---

## ⏰ **DNS PROPAGATION TIME**

**Typical Times:**
- **Cloudflare:** 5-30 minutes (fastest)
- **GoDaddy:** 10-60 minutes
- **Namecheap:** 10-60 minutes
- **Google Domains:** 5-30 minutes
- **Route 53:** 5-60 minutes
- **Other providers:** Up to 24 hours (rare)

**Why wait?**
DNS changes need to propagate to DNS servers worldwide. Google checks multiple DNS servers before verifying.

---

## 🚨 **TROUBLESHOOTING**

### **Problem: "Verification failed"**

**Solution 1: Wait Longer**
- DNS can take up to 24 hours
- Try again tomorrow

**Solution 2: Check DNS Record**
```bash
# Run this command to verify the record exists:
dig TXT wpsio.com +short
```
Should return: `"google-site-verification=pXPyuF9LrSnAR2ioszKTQ0Wgpb8n8BB50D3SDjof1QI"`

**Solution 3: Check for Typos**
- Make sure you copied the ENTIRE verification code
- No extra spaces before or after
- Correct host name (@ or blank)

**Solution 4: Remove Old Records**
- If you have multiple google-site-verification TXT records, remove old ones
- Keep only the new one

**Solution 5: Try Alternative Method**
- Use HTML file upload method instead
- Or use meta tag method in index.html

---

## 🎯 **AFTER SUCCESSFUL VERIFICATION**

Once verified, you'll be able to:
1. ✅ Access Google Search Console dashboard
2. ✅ Submit sitemaps
3. ✅ **Submit disavow.txt file** (your main goal!)
4. ✅ Monitor search performance
5. ✅ Request indexing of new pages
6. ✅ View backlinks

---

## 📝 **NEXT STEPS AFTER VERIFICATION**

### **Immediate Actions:**

1. **Submit Disavow File:**
   - Go to: https://search.google.com/search-console/disavow-links
   - Select property: wpsio.com
   - Upload: `/Users/sunny/wps_project/wps_clone_chinese/wpsio.com/disavow.txt`
   - Submit

2. **Submit Sitemaps:**
   - Go to: GSC → Sitemaps
   - Add: https://www.wpsio.com/sitemap.xml
   - Add: https://www.wpsio.com/sitemap-pages.xml (if exists)

3. **Request Indexing:**
   - Request indexing for new pages:
     - https://www.wpsio.com/wps-office-download
     - https://www.wpsio.com/wps-vs-microsoft-office

---

## 📞 **NEED HELP?**

**Can't find DNS settings?**
- Contact your domain registrar support
- Ask: "How do I add a TXT record to my domain?"

**Still can't verify?**
- Try HTML file upload method
- Or use meta tag in `<head>` section

**DNS propagation stuck?**
- Use: https://dnschecker.org/ to check global propagation
- If it shows propagated but GSC says failed, try clearing browser cache

---

**Status:** Pending DNS Propagation  
**Next Action:** Add TXT record → Wait → Verify → Submit Disavow  
**Estimated Time:** 5-60 minutes total

Good luck! 🚀

