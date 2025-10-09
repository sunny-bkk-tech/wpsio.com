# 🚀 Baidu SEO Optimization Plan for wpsio.com

## 📊 Current Situation

**Status:** wpsio.com **NOT ranking** on Baidu Page 1 for "WPS 下载"

**Competitor Analysis:**
- wps.com (official) - Dominates Baidu results
- Various download sites rank higher
- wpsio.com is indexed but not visible

**Priority:** 🔴 **CRITICAL** - Baidu has 70%+ market share in China!

---

## ✅ Phase 1: Baidu Webmaster Tools Setup (DO THIS FIRST!)

### Step 1: Register Site with Baidu Webmaster Tools
1. Go to: https://ziyuan.baidu.com/
2. Register/login with Baidu account
3. Add site: `https://www.wpsio.com`
4. Choose verification method: HTML meta tag

### Step 2: Get Baidu Verification Code
1. Baidu will give you a code like: `codeva-XXXXXXXXXXXXX`
2. Replace `PLACEHOLDER` in `index.html` line 9
3. Deploy to production
4. Click "Verify" in Baidu Webmaster Tools

### Step 3: Submit Sitemap to Baidu
```
https://www.wpsio.com/sitemap.xml
```
Submit via Baidu Webmaster Tools > 数据引入 > 链接提交

### Step 4: Manual URL Submission
Submit these URLs immediately:
- https://www.wpsio.com/
- https://www.wpsio.com/download
- https://www.wpsio.com/windows
- https://www.wpsio.com/mac
- https://www.wpsio.com/linux
- https://www.wpsio.com/android
- https://www.wpsio.com/ios

---

## ✅ Phase 2: Technical Optimization for Baidu

### A. Meta Keywords Tag (Added! ✓)
Baidu still uses keywords meta tag (unlike Google):
```html
<meta name="keywords" content="WPS Office,WPS下载,WPS 下载,免费办公软件,office下载,word下载,excel下载,ppt下载,办公软件,金山办公" />
```

### B. Server Location
**Current Issue:** If server is outside China, Baidu crawling is slower

**Solutions:**
1. Use Baidu Cloud CDN (CDN.baidu.com) - **Recommended**
2. Or China-based hosting (Aliyun, Tencent Cloud)
3. Or use Cloudflare China Network

### C. ICP License
**Critical for China:** Chinese websites need ICP (Internet Content Provider) license

**Status:** Check if wpsio.com has ICP
**Action:** If targeting mainland China seriously, get ICP license

### D. Page Speed for China
Test from China: https://www.webkaka.com/
- Target: <3 seconds load time from Beijing/Shanghai
- Optimize images, use WebP
- Minimize JavaScript for Baidu crawlers

---

## ✅ Phase 3: Content Optimization for Baidu

### A. Simplified Chinese (zh-CN)
✓ Already using Simplified Chinese - Good!

### B. Keyword Density
Baidu favors higher keyword density than Google:
- Target: 2-3% for "WPS 下载"
- Current: Need to check
- Add keyword to H1, H2, first paragraph

### C. Internal Linking
Add more internal links with "WPS 下载" anchor text:
- From homepage → /download
- From /windows → /download
- From /mac → /download
- From blog posts → /download

### D. Content Freshness
Baidu loves fresh content:
- Update /download page monthly
- Add "最后更新: YYYY-MM-DD" timestamp
- Regular blog posts (2-3 per week)

---

## ✅ Phase 4: Backlinks for Baidu

### A. Chinese-Language Backlinks (PRIORITY!)
Target platforms:
1. **百度百科 (Baidu Baike)** - Chinese Wikipedia
2. **知乎 (Zhihu)** - Chinese Quora
3. **简书 (Jianshu)** - Chinese Medium
4. **CSDN** - Chinese tech blog
5. **博客园** - Chinese dev community

### B. .cn Domain Backlinks
Baidu trusts .cn domains more:
- Target Chinese business directories
- Chinese software download sites
- Chinese tech blogs

### C. Social Signals (Chinese Platforms)
- 微博 (Weibo) - Chinese Twitter
- 微信公众号 (WeChat Official Account)
- 抖音 (Douyin/TikTok China)
- 小红书 (Xiaohongshu)

---

## ✅ Phase 5: Baidu-Specific Features

### A. Baidu Tieba (Forums)
Create/participate in:
- WPS Office 贴吧
- 办公软件 贴吧
- Post helpful answers with links

### B. Baidu Zhidao (Q&A)
Answer questions about:
- "WPS Office 怎么下载?"
- "免费办公软件哪个好?"
- Include link to wpsio.com/download

### C. Baidu Wenku (Documents)
Upload helpful documents:
- "WPS Office 使用教程.doc"
- "WPS Office 功能对比.xlsx"
- Include wpsio.com watermark

---

## 📊 Phase 6: Monitoring & Tracking

### Track Baidu Rankings
Tools:
1. 5118.com - Best for Baidu rank tracking
2. Chinaz.com - Baidu keyword tools
3. Aizhan.com - Baidu SEO analysis

### Monitor These Keywords:
- WPS 下载 (primary)
- WPS Office 下载
- WPS 免费下载
- 免费办公软件
- office 下载 免费
- WPS 官网

---

## 🎯 Expected Timeline

| Phase | Timeline | Expected Result |
|-------|----------|----------------|
| **Phase 1** | Week 1 | Baidu index updated |
| **Phase 2** | Week 2-3 | Improved crawl rate |
| **Phase 3** | Week 4-6 | Page 3-5 rankings |
| **Phase 4** | Month 2-3 | Page 2 rankings |
| **Phase 5** | Month 3-6 | Page 1 positions 6-10 |
| **Long-term** | Month 6+ | Page 1 positions 1-5 |

---

## 🚨 Critical Actions (DO IMMEDIATELY!)

### 1. Baidu Webmaster Verification
```bash
# After getting verification code from Baidu:
# Edit index.html line 9, replace PLACEHOLDER
# Then deploy:
cd /root/wpsio.com
git pull
yarn build
pm2 reload wps-app
```

### 2. Submit to Baidu
- Submit sitemap: https://www.wpsio.com/sitemap.xml
- Submit URLs manually (download page, homepage, platform pages)

### 3. Create Baidu Sitemap
Already exists at `/sitemap.xml` - just submit it!

### 4. Test from China
```bash
# Check if site is accessible from China
curl -I --max-time 10 https://www.wpsio.com
```

---

## 📝 Checklist

### Immediate (Week 1)
- [ ] Register Baidu Webmaster Tools account
- [ ] Get Baidu verification code
- [ ] Update index.html with verification code
- [ ] Deploy to production
- [ ] Verify site ownership in Baidu
- [ ] Submit sitemap to Baidu
- [ ] Manually submit 10 key URLs
- [ ] Install Baidu Analytics (百度统计)

### Short-term (Month 1)
- [ ] Optimize page speed for China
- [ ] Add more "WPS 下载" keyword mentions
- [ ] Create 10 Chinese backlinks (.cn domains)
- [ ] Post on 知乎 (Zhihu)
- [ ] Create Baidu Baike entry
- [ ] Setup Cloudflare China network

### Medium-term (Month 2-3)
- [ ] Get 50+ Chinese backlinks
- [ ] Publish 20+ blog posts
- [ ] Active on Baidu Tieba
- [ ] Answer 50+ Baidu Zhidao questions
- [ ] Upload docs to Baidu Wenku
- [ ] Monitor rankings weekly

### Long-term (Month 3+)
- [ ] Maintain content freshness
- [ ] Build authority in Chinese SEO community
- [ ] Track competitors
- [ ] Adjust strategy based on data

---

## 💡 Pro Tips for Baidu SEO

1. **Baidu favors Chinese-hosted sites** - Consider China CDN
2. **Baidu's crawler is slower** - Be patient, takes 2-3 months
3. **Baidu loves exact keyword matches** - Use "WPS 下载" exactly
4. **Baidu trusts .cn domains more** - Consider getting wpsio.cn
5. **Baidu algorithm updates are opaque** - Follow 5118.com news
6. **Mobile-first is critical** - Baidu prioritizes mobile pages
7. **HTTPS is important** - Already have it ✓
8. **No Google services in China** - Don't rely on Google Fonts, Analytics

---

## 📞 Resources

- Baidu Webmaster: https://ziyuan.baidu.com/
- Baidu Analytics: https://tongji.baidu.com/
- Rank Tracking: https://www.5118.com/
- SEO Analysis: https://www.chinaz.com/
- Keyword Tool: https://index.baidu.com/

---

**Next Steps:** Start with Phase 1 immediately! Baidu indexing takes time, so the sooner you start, the better.

