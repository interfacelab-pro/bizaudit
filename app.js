// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const PHASES = [
  {
    color: '#2563eb',
    name: 'Business discovery',
    desc: 'Identify and document the business entirely from public search results before opening any tool.',
    steps: [
      {
        name: 'Find and confirm the business on Google',
        hint: 'Search the exact business name to see what Google already knows about them.',
        checks: ['Type the exact business name into Google — does a knowledge panel appear on the right side?','Open Google Maps and search the name — is there a pin with reviews and photos?','Check whether "Permanently closed" appears anywhere on the listing','Note the top 3 search result URLs — are they the business website, a directory, or something else?'],
        example: 'Search "Al-Fatah Superstore Lahore" on Google. A knowledge panel appears showing 4.1 stars, 312 reviews, address on Main Boulevard. On Maps the pin is placed correctly. No "permanently closed" label. Top results: their website alfattah.com, a Facebook page, and a Yelp listing. This confirms the business is active with a solid online footprint.',
        tools: ['Google Search', 'Google Maps'],
        output: 'Business confirmed — note the name, city, industry, and all visible URLs in your audit doc',
        fields: [
          { key: 'status', label: 'Business Status', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Critical','Needs Work','Good','N/A'] },
          { key: 'notes', label: 'What I found', type: 'textarea', placeholder: 'Describe the Google Knowledge Panel result, Maps presence, and search footprint…', rows: 3 }
        ]
      },
      {
        name: 'Record every publicly visible data point',
        hint: 'In one single pass, copy everything Google surfaces before clicking any link.',
        checks: ['Exact business name as shown on Maps (copy it verbatim)','Full address including neighborhood or area','Phone number visible on the knowledge panel','Website URL listed on the panel','Category label shown (e.g. "Grocery store", "Hair salon")','Star rating and total review count','Hours of operation','Number of photos visible in the panel photo strip'],
        example: 'From the knowledge panel for "Yasmin Boutique Lahore": Name — Yasmin Boutique. Address — 23 MM Alam Road, Gulberg III. Phone — 0300-1234567. Website — none listed. Category — Women\'s clothing store. Rating — 3.8 stars, 47 reviews. Hours — 11am–9pm daily. Photos — 8 photos.',
        tools: ['Google Maps', 'Google Search'],
        output: 'Baseline data sheet with all 8 data points recorded',
        fields: [
          { key: 'business_name', label: 'Business Name (as on Maps)', type: 'textarea', placeholder: 'Exact name…', rows: 1 },
          { key: 'address', label: 'Full Address', type: 'textarea', placeholder: 'Full address…', rows: 1 },
          { key: 'phone', label: 'Phone Number', type: 'textarea', placeholder: '0300-…', rows: 1 },
          { key: 'website', label: 'Website URL', type: 'textarea', placeholder: 'https://…', rows: 1 },
          { key: 'category', label: 'Category & Rating', type: 'textarea', placeholder: 'e.g. Women\'s clothing store — 3.8 stars, 47 reviews', rows: 1 },
          { key: 'notes', label: 'Additional observations', type: 'textarea', placeholder: 'Hours, photos, anything notable…', rows: 2 }
        ]
      }
    ]
  },
  {
    color: '#0f9d58',
    name: 'Google Business Profile',
    desc: 'Everything here is audited from the public Maps listing — no GBP dashboard access or owner login needed.',
    steps: [
      {
        name: 'Check if the listing is claimed or unclaimed',
        hint: 'An unclaimed listing has an "Own this business?" link visible at the bottom of the panel.',
        checks: ['On the Google Maps panel, scroll to the bottom — does "Own this business?" appear?','If unclaimed: the owner has zero control over the listing','If claimed: check if it shows a verified checkmark','Search the business name + city — do two separate map pins appear?'],
        example: 'Searching "Karachi Bites Restaurant" on Maps shows "Own this business?" at the bottom. This means the listing is UNCLAIMED. The business cannot respond to reviews, update hours, add photos, or post offers.',
        tools: ['Google Maps'],
        output: 'Claim status note — claimed / unclaimed / unverified with screenshot as evidence',
        fields: [
          { key: 'claimed', label: 'Claim Status', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Unclaimed ⚠️','Unverified','Claimed ✓','N/A'] },
          { key: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Describe claim status, duplicates found, verification issues…', rows: 2 }
        ]
      },
      {
        name: 'NAP consistency check across 5 sources',
        hint: 'Name, Address, Phone must be identical on every platform. Even small differences hurt local ranking.',
        checks: ['Copy the NAP exactly from Google Maps','Open Yelp — does the address format match exactly?','Check Facebook — does the phone number match character-for-character?','Check Apple Maps (maps.apple.com)','Visit their website footer if available','Note every difference, even minor punctuation'],
        example: 'Google Maps shows: "Shop 4, Liberty Market, Lahore." Yelp shows: "Liberty Market Lahore." Facebook shows: "4 Liberty Market, Lahore, Punjab." Website footer: "Liberty Mkt, Lahore — 0300-111-2222." That is 4 different formats.',
        tools: ['Google Maps', 'Yelp', 'Facebook', 'Apple Maps', 'Website'],
        output: 'NAP comparison table showing each platform and every inconsistency found',
        fields: [
          { key: 'status', label: 'NAP Consistency', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Inconsistent','Minor Issues','Consistent','N/A'] },
          { key: 'notes', label: 'Inconsistencies found', type: 'textarea', placeholder: 'List platform-by-platform: Google = "…", Yelp = "…", Facebook = "…"', rows: 3 }
        ]
      },
      {
        name: 'Categories, attributes, and description',
        hint: 'Review how the listing describes itself — all visible from the public Maps panel.',
        checks: ['What is the primary category shown?','Click "See more" — are additional secondary categories listed?','Is a business description visible? Does it mention the city?','Are any attributes shown? (Women-owned, wheelchair accessible, delivery)','Do they have a website linked? A booking button?'],
        example: 'A dental clinic is listed under "Doctor" instead of "Dentist." Description reads "We provide dental services." — no city, no specialisations.',
        tools: ['Google Maps'],
        output: 'Category and completeness score out of 5',
        fields: [
          { key: 'status', label: 'Overall Rating', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Poor','Needs Work','Good','N/A'] },
          { key: 'category', label: 'Primary Category shown', type: 'textarea', placeholder: 'e.g. "Doctor" (should be "Dentist")…', rows: 1 },
          { key: 'notes', label: 'Missing attributes / improvements', type: 'textarea', placeholder: 'What\'s missing from the description, categories, attributes…', rows: 2 }
        ]
      },
      {
        name: 'Photos audit',
        hint: 'Count and assess every photo visible publicly on their Maps listing.',
        checks: ['Click the photo strip — how many total photos?','Are photos uploaded by owner vs customers?','Do photos show interior, exterior, products, team?','Are photos recent or clearly old?','Check top 2 competitors — how many photos do they have?'],
        example: 'A restaurant has 6 photos total — all taken by customers on phones, dim and blurry. Competitor 1 has 94 photos. Competitor 2 has 47 photos.',
        tools: ['Google Maps'],
        output: 'Photo count and quality assessment — with competitor comparison numbers',
        fields: [
          { key: 'status', label: 'Photo Health', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Critical (<10)','Needs Work','Good','N/A'] },
          { key: 'count', label: 'Their photo count / Competitor counts', type: 'textarea', placeholder: 'Business: 6 photos | Competitor A: 94 | Competitor B: 47', rows: 1 },
          { key: 'notes', label: 'Quality assessment', type: 'textarea', placeholder: 'Are they professional? Any owner-uploaded? What\'s missing?…', rows: 2 }
        ]
      },
      {
        name: 'Reviews — volume, rating, recency, and response rate',
        hint: 'Analyze all publicly visible reviews without any account access.',
        checks: ['Total review count','Average star rating — below 4.0 is a red flag','Click "Most recent" — when was the last review?','Scroll 15-20 reviews — are there recurring complaints?','Is the owner responding to reviews? Response rate?','Do any reviews look suspicious?'],
        example: 'A beauty salon has 23 reviews averaging 3.6 stars. Last review 4 months ago. Three reviews mention "long wait times." Owner has responded to 2 of 23 reviews — both positive.',
        tools: ['Google Maps'],
        output: 'Review health summary — rating, volume, recency, response rate, and recurring themes',
        fields: [
          { key: 'status', label: 'Review Health', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Critical (<3.9)','Needs Work','Good (4.0+)','N/A'] },
          { key: 'rating', label: 'Rating / Count / Last review date', type: 'textarea', placeholder: 'e.g. 3.6 stars, 23 reviews, last review 4 months ago', rows: 1 },
          { key: 'response_rate', label: 'Response rate & patterns', type: 'textarea', placeholder: 'Responded to X of Y reviews. Recurring complaints: …', rows: 2 }
        ]
      }
    ]
  },
  {
    color: '#e37400',
    name: 'Website audit',
    desc: 'Every tool used here is free and public-facing. No login or owner access required.',
    steps: [
      {
        name: 'First impressions and homepage clarity',
        hint: 'Open the website as a first-time visitor. Can you understand who they are in 5 seconds?',
        checks: ['Does the headline state what they do and where?','Is there a visible phone number or CTA above the fold?','Open on mobile — does it display correctly?','Does the copyright year suggest active maintenance?','Is anything broken or unprofessional on first load?'],
        example: 'Opening herbaldoc.pk on mobile shows a desktop-only layout. The headline reads "Welcome to Our Website" — zero information. Phone number buried 3 clicks away. Footer copyright says 2019.',
        tools: ['Browser (mobile)'],
        output: 'First impressions verdict with above-the-fold screenshot on mobile',
        fields: [
          { key: 'status', label: 'First Impression', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Poor','Needs Work','Good','N/A'] },
          { key: 'url', label: 'Website URL', type: 'textarea', placeholder: 'https://…', rows: 1 },
          { key: 'notes', label: 'What I found on mobile & desktop', type: 'textarea', placeholder: 'Describe headline, CTA visibility, mobile experience, copyright year…', rows: 3 }
        ]
      },
      {
        name: 'Performance — run PageSpeed Insights',
        hint: 'Go to pagespeed.web.dev, enter the URL, and run for mobile.',
        checks: ['Mobile score: below 50 is critical, 50–89 needs work, 90+ good','Desktop score','Top 3 "Opportunities" listed','LCP — over 4s on mobile is a ranking issue','CLS — over 0.25 means layout jumping'],
        example: 'PageSpeed for a Karachi law firm: Mobile 23/100. Desktop 51/100. Top opportunity: eliminate render-blocking resources saves 3.1s. LCP is 8.2 seconds vs target 2.5s.',
        tools: ['PageSpeed Insights (pagespeed.web.dev)'],
        output: 'PageSpeed mobile score + top 3 specific issues with savings estimate',
        fields: [
          { key: 'status', label: 'Performance Grade', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Critical (<50)','Needs Work','Good (90+)','N/A'] },
          { key: 'scores', label: 'Mobile score / Desktop score', type: 'textarea', placeholder: 'Mobile: 23/100 | Desktop: 51/100', rows: 1 },
          { key: 'notes', label: 'Top 3 opportunities from PageSpeed', type: 'textarea', placeholder: '1. Eliminate render-blocking resources — saves 3.1s\n2. …\n3. …', rows: 3 }
        ]
      },
      {
        name: 'SEO basics — check from the browser',
        hint: 'The most critical on-page SEO elements can be verified in under 5 minutes.',
        checks: ['Right-click → View Source → check <title> — includes business name and city?','Find meta description — is it present and under 160 chars?','Is there one clear H1 heading?','type site:domain.com — how many pages indexed?','Check image filenames — descriptive or "DSC00123.jpg"?'],
        example: 'Restaurant website: Title reads "Home — Welcome." Meta description missing. Only 3 pages indexed. H1 says "Food is Life."',
        tools: ['Browser View Source', 'Google Search (site: command)'],
        output: 'SEO basics checklist — pass/fail on 5 items with specific copy to fix',
        fields: [
          { key: 'status', label: 'SEO Health', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Critical','Needs Work','Good','N/A'] },
          { key: 'title', label: 'Current title tag', type: 'textarea', placeholder: 'e.g. "Home — Welcome" (missing business name and city)', rows: 1 },
          { key: 'notes', label: 'Meta description, H1, indexed pages, image filenames', type: 'textarea', placeholder: 'Meta description: missing\nH1: "Food is Life"\nIndexed pages: 3\nImages: DSC00123.jpg…', rows: 3 }
        ]
      },
      {
        name: 'Technical check — SSL, sitemap, and errors',
        hint: 'Three quick public checks revealing major problems invisible to the business owner.',
        checks: ['Does URL show https://? If http:// only, browsers flag "Not Secure"','Visit domain.com/sitemap.xml — 404 means Google may not find pages','Visit domain.com/robots.txt — does it accidentally block everything?','Click 3-4 internal links — do any lead to 404 errors?'],
        example: 'A Lahore home services site loads on http:// only. sitemap.xml returns 404. robots.txt has "Disallow: /" — Google cannot index a single page.',
        tools: ['Browser', 'SSL Labs (ssllabs.com/ssltest)'],
        output: 'Technical health checklist — Critical / Minor / Passing for each item',
        fields: [
          { key: 'ssl', label: 'SSL (https)', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['No HTTPS ⚠️','Mixed Content','Secure ✓','N/A'] },
          { key: 'notes', label: 'Sitemap, robots.txt, broken links', type: 'textarea', placeholder: 'sitemap.xml: 404\nrobots.txt: blocks all\nBroken links found: …', rows: 3 }
        ]
      },
      {
        name: 'Design and trust signals',
        hint: 'Assess whether the site makes a stranger want to trust and contact this business.',
        checks: ['Are there real customer testimonials or review screenshots?','Is there an About section with real team photos (not stock)?','Are certifications, awards, years in business displayed?','Is pricing visible or at least a "starting from" range?','What platform is the site built on? (use Wappalyzer)'],
        example: 'A private school: no real teacher photos, no parent testimonials, no fee structure. A competing school shows real classroom photos, parent quotes, O-Level results, and a "Book a Tour" button.',
        tools: ['Browser', 'Wappalyzer (free Chrome extension)'],
        output: 'Trust signal audit — present / missing / weak for each element with screenshots',
        fields: [
          { key: 'status', label: 'Trust Signal Score', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Very Weak','Needs Work','Strong','N/A'] },
          { key: 'platform', label: 'Platform / CMS (from Wappalyzer)', type: 'textarea', placeholder: 'e.g. WordPress with Avada theme (2016)', rows: 1 },
          { key: 'notes', label: 'Trust signals present / missing', type: 'textarea', placeholder: 'Testimonials: missing\nAbout page photos: stock only\nCredentials: none visible\n…', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#7c3aed',
    name: 'LLM visibility (GEO)',
    desc: 'Test how the business appears when real people ask AI assistants about their service category.',
    steps: [
      {
        name: 'Test on ChatGPT — category and name searches',
        hint: 'Run two types of searches and screenshot both results before they change.',
        checks: ['Search "best [service] in [city]" — does this business appear?','Search the exact business name — does ChatGPT know anything specific?','If it appears: is the information accurate?','If it appears: is the description positive or missing?','Note which competitors appear that this business does not'],
        example: 'Search "best physiotherapy clinics in Lahore." Result lists 5 clinics. Rehab Plus — not mentioned despite 4.3 stars on Google. The 5 that appear have Wikipedia mentions, news articles, or Marham.pk profiles.',
        tools: ['ChatGPT (chat.openai.com)'],
        output: 'Screenshot of ChatGPT result — appearing or not, with competitors listed',
        fields: [
          { key: 'status', label: 'ChatGPT Visibility', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Not Found','Mentioned Briefly','Listed','N/A'] },
          { key: 'notes', label: 'Search queries used + results', type: 'textarea', placeholder: 'Query 1: "best [service] in [city]" → Result: not mentioned. Competitors listed: X, Y, Z\nQuery 2: "[business name]" → Result: …', rows: 3 }
        ]
      },
      {
        name: 'Test on Google Gemini',
        hint: 'Gemini draws from Google\'s own data including GBP — results differ meaningfully from ChatGPT.',
        checks: ['Run the same two searches on Gemini','Does Gemini pull from GBP data?','Does an "AI Overview" appear for their business name in regular Google Search?','Which competitors does Gemini recommend?'],
        example: 'Gemini for "wedding photographers in Karachi": 4 photographers listed. One appears because their GBP has 200+ reviews, Schema markup, and wedding blog citations. The audited business with 18 reviews and no Schema is ignored.',
        tools: ['Google Gemini (gemini.google.com)', 'Google Search (AI Overviews)'],
        output: 'Gemini screenshot — does it pull from GBP data or ignore the business',
        fields: [
          { key: 'status', label: 'Gemini Visibility', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Not Found','Mentioned','Listed','N/A'] },
          { key: 'notes', label: 'Gemini results + AI Overview status', type: 'textarea', placeholder: 'Gemini result: not listed. AI Overview on Google: not shown. Competitors listed: …', rows: 3 }
        ]
      },
      {
        name: 'Test on Perplexity — check what sources it cites',
        hint: 'Perplexity shows its sources — this reveals which websites are treated as authorities.',
        checks: ['Run "best [service] in [city]" on Perplexity','Look at the numbered sources below the answer','Is the business website among cited sources?','Which directories appear for competitor businesses?','Note any source appearing for multiple competitors — that\'s a high-authority site to target'],
        example: 'Perplexity for "best accountants in Islamabad" cites: Zameen.com business directory, Pakistan Today, ICAP.org, and 3 firm websites. The audited firm is not cited. Two competitors appear because of ICAP.org listing and an Express Tribune feature.',
        tools: ['Perplexity (perplexity.ai)'],
        output: 'List of sources Perplexity cited + which ones this business could appear on',
        fields: [
          { key: 'status', label: 'Perplexity Visibility', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Not Found','Mentioned','Listed','N/A'] },
          { key: 'notes', label: 'Sources Perplexity cited + action items', type: 'textarea', placeholder: 'Sources cited: 1. ICAP.org  2. Pakistan Today  3. …\nBusiness appears: No\nAction: Get listed on ICAP.org', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#0891b2',
    name: 'Local SEO & citations',
    desc: 'Map the full public citation footprint by manually checking each major directory.',
    steps: [
      {
        name: 'Directory presence check',
        hint: 'Check every major directory for this business. No login needed.',
        checks: ['Yelp: listed? Accurate? Owner responded?','Apple Maps: listed with correct address and phone?','Bing Maps: listed and categorized correctly?','Facebook Business Page: complete with address and hours?','Industry-specific: TripAdvisor, Marham, Zameen, PakWheels as applicable','Any duplicate Google Maps listings?'],
        example: 'A Karachi restaurant: Google Maps — 4.1 stars. Yelp — not found. Apple Maps — shows old disconnected phone. Bing — correct. Facebook — no address entered. Zomato — not listed.',
        tools: ['Yelp', 'Apple Maps', 'Bing Maps', 'Facebook', 'Industry directories'],
        output: 'Directory presence table — found / not found / has errors per platform',
        fields: [
          { key: 'status', label: 'Citation Health', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Many Gaps','Partial','Good','N/A'] },
          { key: 'notes', label: 'Directory status (found / missing / errors)', type: 'textarea', placeholder: 'Yelp: NOT FOUND\nApple Maps: found, wrong phone\nBing: correct\nFacebook: found, missing address\nIndustry directory: …', rows: 4 }
        ]
      },
      {
        name: 'Domain authority check',
        hint: 'Use free public tools to understand how much authority their website has.',
        checks: ['Go to moz.com/domain-analysis — note Domain Authority (DA)','Go to ahrefs.com/website-authority-checker — note Domain Rating (DR)','On Moz, look at "Top Pages" — which pages have the most links?','Note total referring domains count — under 10 is very weak','Run one competitor through the same tool for comparison'],
        example: 'Lahore IT company: DA 8, DR 6, 4 referring domains. Competitor A: DA 22, DR 19, 31 domains. Competitor B: DA 31, DR 27, 68 domains.',
        tools: ['Moz Domain Analysis (moz.com/domain-analysis)', 'Ahrefs Authority Checker (free)'],
        output: 'Authority snapshot — DA, DR, referring domain count + one competitor\'s numbers',
        fields: [
          { key: 'status', label: 'Domain Authority', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Very Low (<15)','Moderate','Strong','N/A'] },
          { key: 'notes', label: 'DA / DR scores + competitor comparison', type: 'textarea', placeholder: 'Business: DA 8 | DR 6 | 4 referring domains\nCompetitor A: DA 22 | DR 19 | 31 domains', rows: 2 }
        ]
      },
      {
        name: 'Keyword visibility check',
        hint: 'See what search terms they currently rank for using free public tools.',
        checks: ['Ubersuggest.com — enter domain — view top SEO keywords','What are the top 5 keywords they rank for?','Look for keywords at positions 4–15 — these are closest to page 1','Google "[service] + [city]" — do they appear in the local 3-pack?','Search exact business name — do they own the first page?'],
        example: 'A tutoring centre ranks for 18 keywords, all at position 20+. They rank position 11 for "O-level tutor Rawalpindi" — one optimization round away from page 1.',
        tools: ['Ubersuggest (free tier)', 'Google Search (manual SERP check)'],
        output: 'Top 5 current keywords + 3 near-page-1 opportunities for immediate wins',
        fields: [
          { key: 'status', label: 'Keyword Visibility', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Invisible','Low','Visible','N/A'] },
          { key: 'notes', label: 'Top keywords + near-page-1 opportunities', type: 'textarea', placeholder: 'Top keywords: 1. business name (pos 3)  2. …\nNear page 1: "O-level tutor Lahore" (pos 11) — quick win\n…', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#db2777',
    name: 'Social media audit',
    desc: 'Assessed from public-facing profiles only — no account access required.',
    steps: [
      {
        name: 'Find all profiles and rate completeness',
        hint: 'Search the business name on every platform and document what you find.',
        checks: ['Facebook: page exists? All fields complete?','Instagram: business account? Bio, website, category?','LinkedIn: company page? (important for B2B)','TikTok: any presence?','YouTube: any channel?','Check namecheckr.com — consistent username handle?'],
        example: 'A Lahore boutique: Facebook — 2,300 followers, no website link, no address, hours say "Always open." Instagram — 890 followers, bio says only "Boutique" with no location or link.',
        tools: ['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'YouTube', 'Namecheckr.com'],
        output: 'Platform completeness table — score each 1–5 with specific missing fields',
        fields: [
          { key: 'status', label: 'Social Presence', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Very Weak','Partial','Strong','N/A'] },
          { key: 'notes', label: 'Platform-by-platform status', type: 'textarea', placeholder: 'Facebook: ✓ exists, ✗ no website link, ✗ wrong hours\nInstagram: ✓ exists, ✗ no location in bio\nLinkedIn: not found\nTikTok: not found\n…', rows: 4 }
        ]
      },
      {
        name: 'Content quality and posting frequency',
        hint: 'Scroll through the last 30 days of posts on each active platform.',
        checks: ['When was the most recent post? Over 30 days = reads as abandoned','What types of content: photos, videos, reels, stories, text?','Estimate engagement rate: (likes + comments) ÷ followers × 100','Is any content clearly outperforming everything else?','Is there consistent quality — same tone, visual style?'],
        example: 'Last 30 days: 3 Instagram posts. 0.9% engagement rate. But 6 months ago a 30-second reel got 340 likes — 38% engagement. They found what works and stopped doing it.',
        tools: ['Instagram', 'Facebook', 'TikTok'],
        output: 'Content snapshot — frequency, engagement rate, best performing format',
        fields: [
          { key: 'status', label: 'Content Health', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Inactive/Poor','Inconsistent','Active & Good','N/A'] },
          { key: 'notes', label: 'Posting frequency + engagement analysis', type: 'textarea', placeholder: 'Last post: [date]. Monthly posts: ~3. Est. engagement rate: 0.9%\nBest performing: reels (but rarely used)\n…', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#b45309',
    name: 'Brand identity',
    desc: 'Assess visual and messaging consistency from public touchpoints — no internal files needed.',
    steps: [
      {
        name: 'Logo and visual consistency across platforms',
        hint: 'Compare the logo and brand colors across every platform.',
        checks: ['Same logo on website, GBP, Facebook, Instagram, Maps?','Does the logo look professionally designed?','Use ColorZilla — sample the main brand color on their website','Is that color used consistently in posts and cover images?','Use Fontanello — what font is on the website?'],
        example: 'An Islamabad bakery: website uses pale pink serif. Instagram profile photo is a blurry cake. Facebook uses a different logo in blue and white. GBP shows storefront with no logo. Each touchpoint looks like a different business.',
        tools: ['Browser', 'ColorZilla (Chrome extension)', 'Fontanello (Chrome extension)'],
        output: 'Brand consistency score — each platform with specific inconsistency and screenshots',
        fields: [
          { key: 'status', label: 'Visual Consistency', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Inconsistent','Partial','Consistent','N/A'] },
          { key: 'brand_color', label: 'Brand color (hex if found)', type: 'textarea', placeholder: 'e.g. #F2C4CE (pale pink) from website', rows: 1 },
          { key: 'notes', label: 'Platform-by-platform visual inconsistencies', type: 'textarea', placeholder: 'Website: serif + pink\nInstagram: no logo, dark backgrounds\nFacebook: different logo, blue/white\n…', rows: 3 }
        ]
      },
      {
        name: 'Messaging and copy audit',
        hint: 'Copy their business descriptions from 3 sources and compare side by side.',
        checks: ['Copy GBP description from Google Maps','Copy Facebook "About" section text','Copy website homepage headline + first paragraph','Paste all three side by side — consistent? Same tone?','Does any version mention the city or area?','Is there a clear reason to choose them over a competitor?'],
        example: 'GBP: "Law firm providing legal services." Facebook: "We are experienced lawyers." Website: "Justice, Integrity, Excellence." None mention Karachi. None give a reason to choose them.',
        tools: ['Google Maps', 'Facebook', 'Browser'],
        output: 'Side-by-side messaging comparison + rewritten description they could use immediately',
        fields: [
          { key: 'status', label: 'Messaging Clarity', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Very Weak','Vague','Clear & Strong','N/A'] },
          { key: 'gbp_desc', label: 'GBP Description (copy verbatim)', type: 'textarea', placeholder: 'Exact text from Google Maps…', rows: 2 },
          { key: 'notes', label: 'Facebook about / website headline / key gaps', type: 'textarea', placeholder: 'Facebook: "We are experienced lawyers."\nWebsite H1: "Justice, Integrity, Excellence"\nKey gaps: no city, no specialisation, no reason to choose them', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#059669',
    name: 'Reputation & reviews',
    desc: 'Compile a full public reputation picture across every platform where customers leave feedback.',
    steps: [
      {
        name: 'Multi-platform review audit',
        hint: 'Check every platform where customers for their industry typically leave reviews.',
        checks: ['Google Maps: stars, count, recency, response rate','Yelp: any reviews? Owner responded?','Facebook: recommendations enabled? Star rating visible?','Industry-specific: TripAdvisor, Marham, PakWheels, Zameen','Note platforms with damaging unanswered negative reviews'],
        example: 'A Murree hotel: Google — 4.2 stars, 180 reviews. TripAdvisor — 3.1 stars, 47 reviews. No responses to any TripAdvisor review, including 3 titled "Worst experience ever." TripAdvisor is the first result when you search the hotel name.',
        tools: ['Google Maps', 'Yelp', 'Facebook', 'TripAdvisor', 'Marham / PakWheels / Zameen'],
        output: 'Multi-platform rating table — stars and count per platform with response rate',
        fields: [
          { key: 'status', label: 'Reputation Health', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Damaging','Needs Work','Positive','N/A'] },
          { key: 'notes', label: 'Platform-by-platform ratings', type: 'textarea', placeholder: 'Google: 4.2 ★ (180) | Response rate: 40%\nTripAdvisor: 3.1 ★ (47) | Response rate: 0%\nYelp: not found\n…', rows: 3 }
        ]
      },
      {
        name: 'Sentiment themes and response rate analysis',
        hint: 'Read 15-20 reviews across all platforms and identify patterns.',
        checks: ['Top 3 praise themes across multiple reviews','Top 3 complaint themes','What percentage of reviews have owner responses?','Are negative reviews getting thoughtful responses?','Do any reviews mention a specific staff member?'],
        example: 'DHA Karachi salon: Positive — friendly staff, good colour work, clean. Negative — long waits, price changed at checkout, phone unanswered. Response rate: 2 of 20 reviews — both 5-star, all negative ignored.',
        tools: ['Google Maps', 'TripAdvisor', 'Yelp'],
        output: 'Sentiment summary — 3 praise themes, 3 complaint themes, response rate %',
        fields: [
          { key: 'status', label: 'Sentiment Score', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Mostly Negative','Mixed','Mostly Positive','N/A'] },
          { key: 'praise', label: 'Top 3 praise themes', type: 'textarea', placeholder: '1. Friendly staff (mentioned 6×)\n2. Good colour work\n3. Clean environment', rows: 2 },
          { key: 'complaints', label: 'Top 3 complaint themes', type: 'textarea', placeholder: '1. Long waits (4 reviews)\n2. Price changed at checkout\n3. Phone unanswered', rows: 2 }
        ]
      },
      {
        name: 'Competitor review comparison',
        hint: 'Benchmark this business against the top 2 local competitors.',
        checks: ['Find top 2 competitors from Google Maps','Record count, rating, and last review date for each','What are competitors praised for that this business is not?','Are competitors responding while this business is not?','Calculate monthly review gap to close in 12 months'],
        example: '3 Lahore bakeries: Subject — 34 reviews, 3.9 stars. Competitor A — 312 reviews, 4.5 stars. Competitor B — 156 reviews, 4.3 stars. To match Competitor A requires 23 new reviews per month.',
        tools: ['Google Maps'],
        output: 'Competitor review benchmark table + monthly review target to close the gap',
        fields: [
          { key: 'status', label: 'Competitive Position', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Far Behind','Behind','Competitive','N/A'] },
          { key: 'notes', label: 'Competitor comparison + review target', type: 'textarea', placeholder: 'Business: 34 reviews, 3.9★\nComp A: 312 reviews, 4.5★\nComp B: 156 reviews, 4.3★\nMonthly target needed: 23/month', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#6d28d9',
    name: 'Competitor intelligence',
    desc: 'Map the competitive landscape from public search results and Maps — no paid tools required.',
    steps: [
      {
        name: 'Identify top 3–5 competitors from Google',
        hint: 'The businesses in the 3-pack are stealing their leads every day.',
        checks: ['Google "[service] in [city]" — who appears in the local 3-pack?','These 3-pack businesses are stealing walk-in and call traffic','Scroll organic results — which competitor websites rank page 1?','On Maps, note same-category businesses nearby with most reviews','Which competitors run Google Ads? (marked "Sponsored")'],
        example: '"AC repair service Lahore" 3-pack: CoolTech 4.6★ 203 reviews, Arctic Air 4.4★ 87 reviews, Chill Zone 4.1★ 44 reviews. Audited business — FrostFix — not in 3-pack despite being in the area with 22 reviews.',
        tools: ['Google Search', 'Google Maps'],
        output: 'Competitor list with URLs, review counts, star ratings, and ad indicators',
        fields: [
          { key: 'status', label: 'Competitive Gap', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Invisible','Not in 3-pack','In 3-pack','N/A'] },
          { key: 'competitors', label: 'Top 3 competitors (name, stars, reviews)', type: 'textarea', placeholder: '1. CoolTech Services — 4.6★ — 203 reviews\n2. Arctic Air — 4.4★ — 87 reviews\n3. Chill Zone — 4.1★ — 44 reviews', rows: 3 },
          { key: 'notes', label: 'Are they running ads? Other observations', type: 'textarea', placeholder: 'Competitor A running Google Ads. Business NOT in 3-pack. Gap to 3rd place: 22 reviews + 0.3★ improvement needed.', rows: 2 }
        ]
      },
      {
        name: 'Website comparison',
        hint: 'Visit each competitor website and document specific advantages with evidence.',
        checks: ['Does any competitor have a blog? (site:competitordomain.com)','Do competitors have significantly more indexed pages?','How does a competitor\'s PageSpeed compare? (run one through pagespeed)','What trust signals do competitors show that this business lacks?','Run one competitor through Moz free DA check'],
        example: 'CoolTech Services website: blog with 14 articles including one ranking #2 for "how to choose AC size Lahore" — ~300 visitors/month. PageSpeed mobile 71 vs FrostFix\'s 29. 22 indexed pages vs FrostFix\'s 4.',
        tools: ['Browser', 'Google Search (site: command)', 'PageSpeed Insights', 'Moz free'],
        output: 'Competitor website advantage list — 5 specific things they have that this business does not',
        fields: [
          { key: 'status', label: 'Website Gap', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Far Behind','Behind','Competitive','N/A'] },
          { key: 'notes', label: '5 specific competitor website advantages', type: 'textarea', placeholder: '1. Blog with 14 articles (competitor ranks #2 for key term)\n2. PageSpeed 71 vs ours 29\n3. 22 indexed pages vs ours 4\n4. "Licensed by AEDB" badge\n5. Customer video testimonials', rows: 4 }
        ]
      },
      {
        name: 'Facebook Ad Library — check if competitors advertise',
        hint: 'The Facebook Ad Library is public and shows every active ad any business runs right now.',
        checks: ['Go to facebook.com/ads/library — no login needed','Set country to Pakistan, search each competitor','Are they running ads? How many? Facebook or Instagram?','What offers or messaging do the ads use?','How long have the ads been running? 30+ days = profitable'],
        example: 'CoolTech Services: 3 active ads. "AC Installation Rs.8,999 — Book this week" running 47 days. "Free AC checkup before summer" running 12 days. Customer testimonial video running 31 days.',
        tools: ['Facebook Ad Library (facebook.com/ads/library — no login)'],
        output: 'Competitor ad summary — number of active ads, hooks used, estimated duration',
        fields: [
          { key: 'status', label: 'Ad Activity Gap', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Competitor Advertising','Minimal Ads','Even / None','N/A'] },
          { key: 'notes', label: 'Competitor ads found', type: 'textarea', placeholder: 'Competitor A: 3 active ads. Hook: price + urgency. Running 47 days (profitable).\nBusiness: 0 ads running.\n…', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#0284c7',
    name: 'Operations signals',
    desc: 'Infer the state of their operations and tools from publicly observable signals only.',
    steps: [
      {
        name: 'Booking and contact friction',
        hint: 'Go through the actual process of contacting this business. Count every friction point.',
        checks: ['Starting from Google Maps, how many clicks to reach phone/booking?','Does the website have a contact form? How many required fields?','Is there an online booking tool? Or does "book now" link to a phone number?','Click Message on Facebook — does it auto-respond?','Is there a WhatsApp link on website or GBP?'],
        example: 'Lahore tutoring centre: 5 clicks, 7 mandatory form fields, form possibly broken. No confirmation message. Competitor path: click GBP, click WhatsApp, chat opens. 2 clicks total.',
        tools: ['Browser', 'Mobile phone'],
        output: 'Booking friction map — every step, total click count, broken elements',
        fields: [
          { key: 'status', label: 'Contact Friction', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['High Friction','Moderate','Easy','N/A'] },
          { key: 'click_count', label: 'Steps to contact (from Maps)', type: 'textarea', placeholder: 'Step 1: Google Maps → Step 2: website → Step 3: Contact page → Step 4: form (7 fields) → Result: broken confirmation', rows: 2 },
          { key: 'notes', label: 'WhatsApp presence / other observations', type: 'textarea', placeholder: 'WhatsApp link: missing\nFacebook auto-reply: none\nMobile experience issues: …', rows: 2 }
        ]
      },
      {
        name: 'Tech stack identification',
        hint: 'Identify what platform and tools the website is built on.',
        checks: ['Wappalyzer — what CMS? WordPress, Wix, Shopify, Squarespace, custom?','Is there a live chat widget? Note the brand','Is there an email newsletter signup anywhere?','View Page Source → search "googletagmanager" — are they tracking visits?','Search "pixel" in source — do they have Facebook Pixel installed?'],
        example: 'Healthcare clinic: WordPress with Avada theme from 2016 (security vulnerabilities). No live chat. No email signup. No Google Tag Manager — zero analytics. No Facebook Pixel — cannot run retargeting ads.',
        tools: ['Wappalyzer (Chrome extension)', 'Browser View Source'],
        output: 'Tech stack snapshot — platform, analytics, tracking, and chat tools',
        fields: [
          { key: 'status', label: 'Tech Stack Health', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['No Tracking','Minimal','Well-instrumented','N/A'] },
          { key: 'notes', label: 'Platform, analytics, chat, pixel status', type: 'textarea', placeholder: 'CMS: WordPress (Avada 2016)\nGoogle Analytics: NOT installed\nFacebook Pixel: NOT found\nLive chat: none\n…', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#be185d',
    name: 'Content gap analysis',
    desc: 'Identify content opportunities using free public research tools.',
    steps: [
      {
        name: 'Keyword and question research',
        hint: 'Find the questions potential customers are searching that this business could answer.',
        checks: ['AnswerThePublic — what questions come up for their service?','Google "People Also Ask" box for their service + city','Google autocomplete dropdown — what phrases appear?','Ubersuggest.com free tier — what content ranks for them now?','Are competitors publishing content and getting traffic?'],
        example: 'AnswerThePublic for "eye specialist": "how much does an eye test cost in Pakistan," "which eye doctor is best for children," "can an eye specialist detect diabetes." None answered on the clinic website. Competitor ranks #3 for "Eye test cost in Lahore 2024" — ~400 visitors/month.',
        tools: ['AnswerThePublic (free)', 'Google autocomplete + PAA', 'Ubersuggest (free)'],
        output: 'Top 10 content topics — questions potential customers are asking right now',
        fields: [
          { key: 'status', label: 'Content Opportunity', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Zero Content','Minimal','Active Content','N/A'] },
          { key: 'notes', label: 'Top 10 content topics / questions found', type: 'textarea', placeholder: '1. "How much does [service] cost in [city]?"\n2. "Best [service] for children"\n3. …\nCompetitor ranks for: "Eye test cost Lahore 2024" (#3)', rows: 4 }
        ]
      },
      {
        name: 'Video and social content gaps',
        hint: 'Check YouTube and TikTok to see whether competitors are winning with video.',
        checks: ['Search "[service] [city]" on YouTube — do competitor videos appear?','Search the same on TikTok','Does the business have any video content at all?','What types of video rank for competitors?'],
        example: 'YouTube "furniture shop Lahore": one competitor has 23 videos. Most viewed — "How our sofas are made" — 14,000 views, ranks #1. Business we\'re auditing has zero video anywhere.',
        tools: ['YouTube', 'TikTok', 'Instagram'],
        output: 'Video gap assessment — are competitors using video + 3 specific video ideas',
        fields: [
          { key: 'status', label: 'Video Presence', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['No Video','Minimal','Active Video','N/A'] },
          { key: 'notes', label: 'Competitor video presence + ideas for this business', type: 'textarea', placeholder: 'Competitor A: 23 YouTube videos — "How our sofas are made" 14k views\nBusiness: 0 videos anywhere\nIdeas: 1. Showroom tour  2. Before/after  3. Customer unboxing', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#16a34a',
    name: 'Website improvement plan',
    desc: 'Build a concrete, evidence-based improvement plan from all findings above.',
    steps: [
      {
        name: 'Rank the top 5 issues by business impact',
        hint: 'From all phases, select the 5 highest-impact issues in revenue-impact order.',
        checks: ['Issue 1: the single thing costing the most leads per day','Issues 2–5: rank by revenue impact, not technical complexity','For each: before state + after state','Estimate time to fix: 10 min free, 1 hour dev, or larger project','Separate what owner can do free vs what needs outside help'],
        example: 'Faisalabad textile showroom: 1) No website. 2) 3.7 rating, zero review responses. 3) GBP unclaimed. 4) No WhatsApp link. 5) PageSpeed mobile score 19.',
        tools: ['Notes from all previous phases'],
        output: 'Priority fix list — top 5 issues with before/after description and effort estimate',
        fields: [
          { key: 'priority_1', label: 'Priority #1 (highest revenue impact)', type: 'textarea', placeholder: 'Issue: No website\nBefore: losing every customer who researches first\nAfter: 5-page site with contact form\nEffort: 2 weeks, developer needed', rows: 2 },
          { key: 'priority_2', label: 'Priority #2', type: 'textarea', placeholder: 'Issue: 3.7 Google rating, zero review responses\nBefore: …\nAfter: …\nEffort: …', rows: 2 },
          { key: 'priority_3', label: 'Priority #3', type: 'textarea', placeholder: 'Issue: …', rows: 2 },
          { key: 'priority_45', label: 'Priorities #4 and #5', type: 'textarea', placeholder: '#4: …\n#5: …', rows: 2 }
        ]
      },
      {
        name: 'Create a before/after mockup for the homepage',
        hint: 'Visually show what one key section would look like after improvements.',
        checks: ['Screenshot current homepage above-the-fold on mobile and desktop','Identify the single biggest visible problem','Recreate improved version in Canva or similar','Write headline: service + city + clear benefit','Write body text under 40 words focused on trust and value','Design clear CTA with specific action text'],
        example: 'Before: "Welcome to Premier Dental." No city. No CTA. Stock tooth photo. After: "Karachi\'s trusted dental clinic — painless treatment in DHA & Clifton. 1,200+ happy patients. Same-day appointments." CTA: "Book your appointment — it\'s free."',
        tools: ['Canva (free)', 'Screenshot tool'],
        output: 'Side-by-side before/after mockup saved as image ready to embed in report',
        fields: [
          { key: 'current_headline', label: 'Current homepage headline (copy verbatim)', type: 'textarea', placeholder: '"Welcome to Our Website"', rows: 1 },
          { key: 'new_headline', label: 'Rewritten headline (service + city + benefit)', type: 'textarea', placeholder: '"Lahore\'s trusted [service] — [benefit]. [Social proof]. [CTA]"', rows: 1 },
          { key: 'notes', label: 'Mockup notes / biggest visual issue', type: 'textarea', placeholder: 'Biggest issue: no city in headline, no CTA above fold, stock photos\nMockup created: Yes/No\n…', rows: 2 }
        ]
      },
      {
        name: 'Write 5 copy improvements',
        hint: 'Rewrite specific pieces of copy to show the business exactly what better looks like.',
        checks: ['Rewrite homepage H1: service + city + clear benefit','Rewrite GBP description (750 chars max): city, services, differentiator, CTA','Write improved meta title (60 chars): Business | Service | City','Write improved meta description (155 chars)','Rewrite one negative review response as a model'],
        example: 'Original GBP: "We offer quality services to our clients." (42 chars). Rewritten: "Lahore\'s trusted home cleaning service since 2018. We cover DHA, Gulberg, Johar Town, and Model Town. Daily, weekly, and monthly packages. 500+ satisfied homes. Call or WhatsApp for a free quote today."',
        tools: ['Hemingway App (free)'],
        output: '5 rewritten copy elements — headline, GBP description, meta title, meta desc, review response',
        fields: [
          { key: 'gbp_rewrite', label: 'Rewritten GBP Description', type: 'textarea', placeholder: '"[City]\'s trusted [service] since [year]. We cover [areas]. [Services]. [Social proof]. Call or WhatsApp for a free quote today."', rows: 3 },
          { key: 'meta_title', label: 'New meta title (max 60 chars)', type: 'textarea', placeholder: 'Business Name | Service | City', rows: 1 },
          { key: 'review_response', label: 'Model review response (for a negative review)', type: 'textarea', placeholder: '"Hi [name], thank you for taking the time to share your experience. We sincerely apologise for [specific issue]. We\'ve addressed this by [action]. We\'d love to make it right — please reach us at [contact]."', rows: 3 }
        ]
      }
    ]
  },
  {
    color: '#dc2626',
    name: 'Report & cold outreach',
    desc: 'Package everything into a professional report and a message the business owner cannot ignore.',
    steps: [
      {
        name: 'Compile the full audit into a structured document',
        hint: 'Bring every phase finding into one organized document before designing the PDF.',
        checks: ['Section 1: Business overview — name, location, industry, date, overall health score','Section 2: Key findings — top 3 critical issues with screenshots','Section 3: Phase-by-phase findings — one paragraph per phase','Section 4: Priority action table — top 10 actions ranked by Impact × Effort','Section 5: Quick wins — 5 things they can do this week, most for free','Section 6: 30-60-90 day roadmap'],
        example: 'Report structure: Cover — "Digital Presence Audit: Lahori Darbar Restaurant." Key findings: GBP unclaimed (critical), 3.6 average / 28 reviews (critical), website loads in 9.2s on mobile.',
        tools: ['Notion (free)', 'Google Docs (free)'],
        output: 'Complete structured audit document — organized and ready to design as PDF',
        fields: [
          { key: 'overall_score', label: 'Overall Health Score (out of 100)', type: 'textarea', placeholder: 'e.g. 34/100 — Critical issues in 3 areas, moderate issues in 5 areas', rows: 1 },
          { key: 'top_3_critical', label: 'Top 3 critical issues (for executive summary)', type: 'textarea', placeholder: '1. GBP unclaimed — immediate risk\n2. Google rating 3.6 / 28 reviews — losing leads to competitors\n3. Website loads 9.2s on mobile — 60%+ visitors bouncing', rows: 3 },
          { key: 'quick_wins', label: '5 quick wins (free / this week)', type: 'textarea', placeholder: '1. Claim GBP (5 mins, free)\n2. Respond to 4 unanswered negative reviews (30 mins)\n3. Add WhatsApp number to GBP\n4. Update copyright year\n5. Fix robots.txt', rows: 3 }
        ]
      },
      {
        name: 'Design the report as a professional PDF',
        hint: 'Turn the document into something that looks like it was made by a professional agency.',
        checks: ['Use a Canva "Business Report" template','Cover page: business name + "Digital Presence Audit" + date + your brand','Use their own brand colors in the design (from ColorZilla findings)','Every finding paired with a screenshot — no claims without visual evidence','Each section gets a status badge: Critical / Needs Improvement / Good','Final page: your contact, clear offer, single CTA'],
        example: 'A compelling 12-page report: Page 1 cover in their brand colors. Page 2: visual scorecard. Pages 3–10: one phase per page with screenshots. Page 11: priority matrix. Page 12: your offer.',
        tools: ['Canva (free)', 'Google Slides (free)'],
        output: 'Branded PDF report — saved as "BusinessName_Audit_Date.pdf" ready to attach',
        fields: [
          { key: 'status', label: 'Report Status', type: 'rating', options: ['critical','needs-work','good','na'], labels: ['Not Started','In Progress','Complete','N/A'] },
          { key: 'notes', label: 'Report notes / design decisions', type: 'textarea', placeholder: 'Template used: Canva business report\nBrand colors applied: #F2C4CE\nPages completed: …', rows: 2 }
        ]
      },
      {
        name: 'Write the cold outreach message',
        hint: 'One short, specific, value-first message. Under 150 words.',
        checks: ['Subject line names their specific business — no generic language','First sentence is one specific real thing you found — not flattery','Second: you have done a full free analysis specifically for them','Third: what you have — report + mockup, specific and tangible','One clear ask only: 15 minutes','Total length: under 150 words'],
        example: 'Subject: Your Google listing for [Business] is unclaimed — anyone can edit it. Body: "Hi [name], I noticed your Google Business Profile isn\'t claimed, which means anyone can suggest changes to your phone number or address. I\'ve put together a short report and redesigned homepage mockup — happy to walk you through it in 15 minutes."',
        tools: ['Email', 'WhatsApp', 'Instagram DM', 'LinkedIn'],
        output: 'Final cold outreach message — under 150 words, specific, ready to send',
        fields: [
          { key: 'subject', label: 'Subject line / Opening hook', type: 'textarea', placeholder: 'Subject: Your Google listing for [Business Name] is unclaimed — anyone can edit it', rows: 1 },
          { key: 'message', label: 'Full outreach message (aim for <150 words)', type: 'textarea', placeholder: '"Hi [Name],\n\nI noticed your Google Business Profile isn\'t claimed, which means anyone can suggest changes to your phone number or address.\n\nI spent some time doing a full analysis of your online presence and found a few things likely costing you customers each week.\n\nI\'ve put together a short report and a redesigned homepage mockup. Happy to walk you through it in 15 minutes — I can send the report now if you\'d like to see it first.\n\n[Your name]"', rows: 7 },
          { key: 'channel', label: 'Outreach channel planned', type: 'textarea', placeholder: 'e.g. WhatsApp first, then email follow-up after 3 days', rows: 1 }
        ]
      }
    ]
  }
];

// ─────────────────────────────────────────────
// RATING COLOR MAP
// ─────────────────────────────────────────────
const RATING_COLORS = {
  'critical':   '#dc2626',
  'needs-work': '#f59e0b',
  'good':       '#16a34a',
  'na':         '#8b949e'
};

// ─────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────
let currentPhase = 0;
const checked  = {};
const findings = {}; // findings[`${pi}-${si}`] = { fields: {}, savedAt: null }

PHASES.forEach((p, pi) => p.steps.forEach((s, si) => {
  checked[`${pi}-${si}`]  = false;
  findings[`${pi}-${si}`] = { fields: {}, savedAt: null };
}));

const saveTimers = {};

// ─────────────────────────────────────────────
// STORAGE — localStorage
// ─────────────────────────────────────────────
function saveToStorage(pi, si) {
  const key  = `${pi}-${si}`;
  const data = { checked: checked[key], findings: findings[key] };
  try { localStorage.setItem(`bizaudit:step:${key}`, JSON.stringify(data)); }
  catch(e) { console.warn('localStorage save failed', e); }
}

function saveClientName() {
  try { localStorage.setItem('bizaudit:client', document.getElementById('client-name').value); }
  catch(e) {}
}

function loadAllFromStorage() {
  const clientName = localStorage.getItem('bizaudit:client') || '';
  if (clientName) {
    document.getElementById('client-name').value = clientName;
    document.getElementById('client-industry-badge').textContent = 'Active audit';
  }
  PHASES.forEach((p, pi) => {
    p.steps.forEach((s, si) => {
      const key = `${pi}-${si}`;
      try {
        const raw = localStorage.getItem(`bizaudit:step:${key}`);
        if (raw) {
          const data = JSON.parse(raw);
          checked[key]  = data.checked  || false;
          findings[key] = data.findings || { fields: {}, savedAt: null };
        }
      } catch(e) {}
    });
  });
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function totalSteps()       { return Object.keys(checked).length; }
function doneSteps()        { return Object.values(checked).filter(Boolean).length; }
function phaseDone(pi)      { return PHASES[pi].steps.filter((_, si) => checked[`${pi}-${si}`]).length; }
function stepHasNotes(pi, si) {
  const f = findings[`${pi}-${si}`];
  return f && f.fields && Object.values(f.fields).some(v => v && String(v).trim() !== '');
}
function countAllFindings() {
  let count = 0;
  PHASES.forEach((p, pi) => p.steps.forEach((s, si) => { if (stepHasNotes(pi, si)) count++; }));
  return count;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─────────────────────────────────────────────
// RATING BUTTON STYLE HELPERS
// BUG FIX: Use direct background/border/color instead of CSS custom property --rc,
// which was unreliable via cssText and caused text to disappear on selected buttons.
// ─────────────────────────────────────────────
function ratingSelectedStyle(val) {
  const color = RATING_COLORS[val] || '#8b949e';
  return `background:${color};border-color:${color};color:#fff`;
}
function ratingUnselectedStyle(val) {
  const color = RATING_COLORS[val] || '#8b949e';
  return `background:#fff;color:${color};border-color:${color}40`;
}

// ─────────────────────────────────────────────
// PROGRESS UI
// ─────────────────────────────────────────────
function updateProgress() {
  const d = doneSteps(), t = totalSteps();
  document.getElementById('done-count').textContent = d;
  document.getElementById('total-count').textContent = t;
  document.getElementById('overall-bar').style.width = (t ? Math.round(d / t * 100) : 0) + '%';
}

// ─────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────
function renderSidebar() {
  let h = '<div class="sidebar-section-label">Phases</div>';
  PHASES.forEach((p, pi) => {
    const pd = phaseDone(pi), pt = p.steps.length;
    const pct      = Math.round(pd / pt * 100);
    const hasNotes = PHASES[pi].steps.some((_, si) => stepHasNotes(pi, si));
    const isA      = pi === currentPhase;
    h += `
      <div class="nav-item${isA ? ' active' : ''}" onclick="switchPhase(${pi})">
        <div class="nav-num">${String(pi + 1).padStart(2, '0')}</div>
        <div class="nav-info">
          <div class="nav-label">${p.name}</div>
          <div class="nav-count">${pd} / ${pt} done</div>
        </div>
        <div class="nav-has-notes${hasNotes ? ' filled' : ''}"></div>
      </div>
      <div class="nav-pbar"><div class="nav-pfill" style="width:${pct}%;background:${p.color}"></div></div>`;
  });
  document.getElementById('sidebar').innerHTML = h;
}

// ─────────────────────────────────────────────
// FINDINGS FIELDS RENDERER
// ─────────────────────────────────────────────
function renderFindingsFields(s, pi, si, color) {
  const f           = findings[`${pi}-${si}`];
  const savedFields = (f && f.fields) ? f.fields : {};
  let h = '';

  s.fields.forEach(field => {
    h += `<div class="finding-field">
      <div class="finding-field-label">${escapeHtml(field.label)}</div>`;

    if (field.type === 'rating') {
      h += `<div class="finding-rating">`;
      field.options.forEach((opt, idx) => {
        const isSelected   = savedFields[field.key] === opt;
        // BUG FIX: set background, border and color directly — no CSS custom property
        const inlineStyle  = isSelected ? ratingSelectedStyle(opt) : ratingUnselectedStyle(opt);
        h += `<button
          class="rating-btn${isSelected ? ' selected' : ''}"
          data-val="${opt}"
          data-step="${pi}-${si}"
          data-field="${field.key}"
          style="${inlineStyle}"
          onclick="setRating(${pi},${si},'${field.key}','${opt}',this)">
          ${escapeHtml(field.labels[idx])}
        </button>`;
      });
      h += `</div>`;

    } else {
      const rows        = field.rows || 3;
      const placeholder = escapeHtml(field.placeholder || '');
      // BUG FIX: use escapeHtml on saved value to prevent breaking out of textarea
      const val         = escapeHtml(savedFields[field.key] || '');
      h += `<textarea
        class="finding-textarea"
        id="field-${pi}-${si}-${field.key}"
        placeholder="${placeholder}"
        rows="${rows}"
        oninput="onFieldInput(${pi},${si},'${field.key}',this)"
        style="min-height:${rows * 24 + 18}px"
      >${val}</textarea>`;
    }
    h += `</div>`;
  });
  return h;
}

// ─────────────────────────────────────────────
// MAIN RENDER
// ─────────────────────────────────────────────
function renderMain() {
  const p   = PHASES[currentPhase];
  const pd  = phaseDone(currentPhase);
  const pt  = p.steps.length;
  const pct = pt ? Math.round(pd / pt * 100) : 0;

  let h = `
    <div class="phase-header-row">
      <div class="phase-tag" style="background:${p.color}18;color:${p.color}">Phase ${currentPhase + 1} of ${PHASES.length}</div>
      <div class="phase-step-count"><span id="phase-done-num">${pd}</span> / ${pt} steps done</div>
    </div>
    <h1 class="phase-title">${p.name}</h1>
    <p class="phase-desc">${p.desc}</p>
    <div class="phase-progress-bar">
      <div class="phase-progress-fill" id="phase-progress-fill" style="width:${pct}%;background:${p.color}"></div>
    </div>`;

  p.steps.forEach((s, si) => {
    const key      = `${currentPhase}-${si}`;
    const done     = checked[key];
    const hasNotes = stepHasNotes(currentPhase, si);
    const f        = findings[key];
    const firstNote = f && f.fields ? Object.values(f.fields).find(v => v && String(v).trim()) : '';

    h += `
      <div class="step-card${done ? ' done' : ''}${hasNotes ? ' has-notes' : ''}" id="card-${si}" style="--ph-color:${p.color}">
        <div class="step-header">
          <div class="checkbox${done ? ' checked' : ''}" onclick="toggleCheck(${si})" id="chk-${si}">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="step-body">
            <div class="step-name">${escapeHtml(s.name)}</div>
            <div class="step-hint">${escapeHtml(s.hint)}</div>
            <div class="step-note-preview${hasNotes ? ' visible' : ''}" id="preview-${si}">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2h8v7a1 1 0 01-1 1H3a1 1 0 01-1-1V2z" stroke="#16a34a" stroke-width="1.3"/>
                <path d="M4 5h4M4 7h2" stroke="#16a34a" stroke-width="1.3" stroke-linecap="round"/>
              </svg>
              <span style="color:#16a34a;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:300px">
                ${firstNote ? escapeHtml(String(firstNote).substring(0, 80)) + (String(firstNote).length > 80 ? '…' : '') : 'Findings recorded'}
              </span>
            </div>
          </div>
          <button class="detail-btn" id="btn-${si}" onclick="toggleDetail(${si})">Details ▾</button>
        </div>

        <div class="step-detail" id="det-${si}" style="--ph-color:${p.color}">
          <div class="detail-section">
            <div class="detail-label">What to check</div>
            <ul class="check-list">${s.checks.map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul>
          </div>

          <div class="detail-section">
            <div class="detail-label">Real-world example</div>
            <div class="example-box" style="border-left:3px solid ${p.color};background:${p.color}0d;border:1px solid ${p.color}30;border-left:3px solid ${p.color}">
              <div class="example-label" style="color:${p.color}">Example scenario</div>
              <div class="example-text" style="color:#1c2128">${escapeHtml(s.example)}</div>
            </div>
          </div>

          <div class="detail-section">
            <div class="detail-label">Tools to use</div>
            <div class="tags">${s.tools.map(t => `<span class="tag tag-tool">${escapeHtml(t)}</span>`).join('')}</div>
          </div>

          <div class="detail-section">
            <div class="detail-label">Deliverable / output</div>
            <div class="output-row">
              <div class="output-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <polyline points="1.5,6 4.5,9 10.5,2.5" stroke="#15803d" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="output-text">${escapeHtml(s.output)}</div>
            </div>
          </div>

          <div class="findings-section" id="findings-section-${si}">
            <div class="findings-header">
              <div class="findings-title" style="color:${p.color}">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2h10v9a1 1 0 01-1 1H3a1 1 0 01-1-1V2z" stroke="${p.color}" stroke-width="1.4"/>
                  <path d="M4 6h6M4 8.5h4" stroke="${p.color}" stroke-width="1.4" stroke-linecap="round"/>
                  <rect x="5" y="1" width="4" height="2" rx="0.5" stroke="${p.color}" stroke-width="1.4"/>
                </svg>
                Your Findings
              </div>
              <div class="save-status" id="save-status-${si}">
                <span class="si"></span>
                <span id="save-text-${si}">${(f && f.savedAt) ? 'Saved' : 'Not saved yet'}</span>
              </div>
            </div>
            <div class="findings-fields" id="findings-fields-${si}">
              ${renderFindingsFields(s, currentPhase, si, p.color)}
            </div>
          </div>
        </div>
      </div>`;
  });

  const isLast    = currentPhase === PHASES.length - 1;
  const nextAction = isLast ? 'openModal()' : `switchPhase(${currentPhase + 1})`;
  const nextLabel  = isLast ? 'View Full Findings →' : 'Next phase →';

  h += `
    <div class="footer-nav">
      <button class="btn btn-ghost" onclick="switchPhase(${currentPhase - 1})"
        style="${currentPhase === 0 ? 'visibility:hidden' : ''}">← Previous phase</button>
      <button class="btn btn-primary" onclick="${nextAction}">${nextLabel}</button>
    </div>`;

  const main = document.getElementById('main');
  main.innerHTML = h;
  main.scrollTop = 0;

  // Restore save status indicator for steps that already have saved data
  p.steps.forEach((s, si) => {
    const key = `${currentPhase}-${si}`;
    const f   = findings[key];
    if (f && f.savedAt) setSaveStatus(si, 'saved', 'Saved');
  });
}

// ─────────────────────────────────────────────
// FIELD INPUT HANDLERS
// ─────────────────────────────────────────────
function onFieldInput(pi, si, fieldKey, el) {
  const key = `${pi}-${si}`;
  if (!findings[key]) findings[key] = { fields: {}, savedAt: null };
  findings[key].fields[fieldKey] = el.value;

  setSaveStatus(si, 'saving', 'Saving…');
  clearTimeout(saveTimers[key]);
  saveTimers[key] = setTimeout(() => {
    findings[key].savedAt = new Date().toISOString();
    saveToStorage(pi, si);
    setSaveStatus(si, 'saved', 'Saved');
    updateNotePreview(pi, si);
    renderSidebar();
    flashGlobalSave();
  }, 600);
}

function setRating(pi, si, fieldKey, val, btn) {
  const key = `${pi}-${si}`;
  if (!findings[key]) findings[key] = { fields: {}, savedAt: null };

  // Toggle off if same value clicked again
  const isDeselecting = findings[key].fields[fieldKey] === val;
  findings[key].fields[fieldKey] = isDeselecting ? '' : val;

  // BUG FIX: update inline styles directly — no CSS custom property needed
  document.querySelectorAll(`[data-step="${pi}-${si}"][data-field="${fieldKey}"]`).forEach(b => {
    const shouldSelect = !isDeselecting && b.dataset.val === val;
    b.classList.toggle('selected', shouldSelect);
    b.style.cssText = shouldSelect ? ratingSelectedStyle(b.dataset.val) : ratingUnselectedStyle(b.dataset.val);
  });

  setSaveStatus(si, 'saving', 'Saving…');
  clearTimeout(saveTimers[key]);
  saveTimers[key] = setTimeout(() => {
    findings[key].savedAt = new Date().toISOString();
    saveToStorage(pi, si);
    setSaveStatus(si, 'saved', 'Saved');
    updateNotePreview(pi, si);
    renderSidebar();
    flashGlobalSave();
  }, 300);
}

function setSaveStatus(si, state, text) {
  const el     = document.getElementById(`save-status-${si}`);
  const textEl = document.getElementById(`save-text-${si}`);
  if (!el || !textEl) return;
  el.className     = `save-status ${state}`;
  textEl.textContent = text;
}

function updateNotePreview(pi, si) {
  const hasNotes = stepHasNotes(pi, si);
  const card     = document.getElementById(`card-${si}`);
  const preview  = document.getElementById(`preview-${si}`);
  if (!card || !preview) return;
  card.classList.toggle('has-notes', hasNotes);
  preview.classList.toggle('visible', hasNotes);
  if (hasNotes) {
    const f         = findings[`${pi}-${si}`];
    const firstNote = f && f.fields ? Object.values(f.fields).find(v => v && String(v).trim() !== '') : '';
    const span      = preview.querySelector('span');
    if (span && firstNote) {
      const s = String(firstNote);
      span.textContent = s.substring(0, 80) + (s.length > 80 ? '…' : '');
    }
  }
}

function flashGlobalSave() {
  const el = document.getElementById('global-save-status');
  if (!el) return;
  el.textContent = 'Saved just now';
  clearTimeout(window._globalSaveTimer);
  window._globalSaveTimer = setTimeout(() => { el.textContent = 'All changes autosaved'; }, 2000);
}

// ─────────────────────────────────────────────
// NAVIGATION ACTIONS
// ─────────────────────────────────────────────
function switchPhase(i) {
  if (i < 0 || i >= PHASES.length) return;
  currentPhase = i;
  renderSidebar();
  renderMain();
  window.scrollTo(0, 0);
}

function toggleCheck(si) {
  const key = `${currentPhase}-${si}`;
  checked[key] = !checked[key];

  const card = document.getElementById(`card-${si}`);
  const chk  = document.getElementById(`chk-${si}`);
  card.classList.toggle('done', checked[key]);
  chk.classList.toggle('checked', checked[key]);

  saveToStorage(currentPhase, si);
  updateProgress();
  renderSidebar();

  // Live-update the phase step counter in the header
  const pd     = phaseDone(currentPhase);
  const pt     = PHASES[currentPhase].steps.length;
  const doneEl = document.getElementById('phase-done-num');
  const fillEl = document.getElementById('phase-progress-fill');
  if (doneEl) doneEl.textContent = pd;
  if (fillEl) fillEl.style.width = (pt ? Math.round(pd / pt * 100) : 0) + '%';
}

function toggleDetail(si) {
  const det  = document.getElementById(`det-${si}`);
  const btn  = document.getElementById(`btn-${si}`);
  const open = det.classList.contains('visible');
  det.classList.toggle('visible', !open);
  btn.textContent = open ? 'Details ▾' : 'Close ▴';
}

// ─────────────────────────────────────────────
// CLIENT NAME
// ─────────────────────────────────────────────
let clientSaveTimer = null;
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('client-name').addEventListener('input', (e) => {
    const name  = e.target.value.trim();
    const badge = document.getElementById('client-industry-badge');
    badge.textContent = name ? 'Active audit' : 'No client set';
    clearTimeout(clientSaveTimer);
    clientSaveTimer = setTimeout(saveClientName, 800);
  });
});

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────
let activeTab = 'summary';

function openModal() {
  const clientName = document.getElementById('client-name').value || 'Unnamed Business';
  document.getElementById('modal-sub').textContent = `Audit findings for ${clientName}`;
  document.getElementById('modal-overlay').classList.add('visible');
  switchTab(activeTab);
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('visible');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModal();
}

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.modal-tab').forEach((t, i) => {
    t.classList.toggle('active', ['summary','all','export'][i] === tab);
  });
  document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');

  if      (tab === 'summary') renderSummaryTab();
  else if (tab === 'all')     renderAllTab();
  else                        renderExportTab();
}

function renderSummaryTab() {
  const total      = PHASES.reduce((a, p) => a + p.steps.length, 0);
  const done       = doneSteps();
  const filled     = countAllFindings();
  const clientName = document.getElementById('client-name').value || 'Not set';

  let criticals = 0;
  PHASES.forEach((p, pi) => p.steps.forEach((s, si) => {
    const f = findings[`${pi}-${si}`];
    if (f && f.fields) Object.values(f.fields).forEach(v => { if (v === 'critical') criticals++; });
  }));

  let h = `
    <div class="summary-grid">
      <div class="summary-stat">
        <div class="summary-stat-num">${done}/${total}</div>
        <div class="summary-stat-label">Steps completed</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat-num">${filled}</div>
        <div class="summary-stat-label">Steps with findings</div>
      </div>
      <div class="summary-stat">
        <div class="summary-stat-num" style="color:#dc2626">${criticals}</div>
        <div class="summary-stat-label">Critical issues flagged</div>
      </div>
    </div>
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;padding:10px 14px;background:var(--main-bg);border-radius:6px;border:1px solid var(--border-light)">
      <strong>Client:</strong> ${escapeHtml(clientName)} &nbsp;·&nbsp;
      <strong>Audit date:</strong> ${new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}
    </div>
    <div style="display:flex;flex-direction:column;gap:8px">`;

  PHASES.forEach((p, pi) => {
    const pd            = phaseDone(pi), pt = p.steps.length;
    const phaseFindings = PHASES[pi].steps.filter((_, si) => stepHasNotes(pi, si)).length;
    let phaseCriticals  = 0;
    p.steps.forEach((s, si) => {
      const f = findings[`${pi}-${si}`];
      if (f && f.fields) Object.values(f.fields).forEach(v => { if (v === 'critical') phaseCriticals++; });
    });

    h += `
      <div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:${p.color}08;border:1px solid ${p.color}20;border-radius:6px;cursor:pointer"
           onclick="closeModal();switchPhase(${pi})">
        <div style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></div>
        <div style="flex:1;font-size:13px;font-weight:500;color:var(--text-primary)">${p.name}</div>
        <div style="font-size:11px;color:var(--text-tertiary)">${phaseFindings} findings</div>
        ${phaseCriticals > 0 ? `<div style="font-size:10px;font-weight:700;padding:2px 7px;border-radius:20px;background:#fee2e2;color:#dc2626">${phaseCriticals} critical</div>` : ''}
        <div style="font-size:11px;color:var(--text-tertiary)">${pd}/${pt} ✓</div>
      </div>`;
  });

  h += `</div>`;
  document.getElementById('tab-summary').innerHTML = h;
}

function renderAllTab() {
  let h = '', hasAny = false;

  PHASES.forEach((p, pi) => {
    const phaseStepFindings = PHASES[pi].steps
      .map((s, si) => ({ s, si, f: findings[`${pi}-${si}`] }))
      .filter(({ f }) => f && f.fields && Object.values(f.fields).some(v => v && String(v).trim()));

    if (!phaseStepFindings.length) return;
    hasAny = true;

    h += `<div class="phase-findings-group">
      <div class="phase-findings-header">
        <div class="phase-dot" style="background:${p.color}"></div>
        <div class="phase-findings-name">${p.name}</div>
        <div style="font-size:11px;color:var(--text-tertiary);margin-left:auto">${phaseStepFindings.length} of ${p.steps.length} steps filled</div>
      </div>`;

    phaseStepFindings.forEach(({ s, si, f }) => {
      h += `<div class="finding-entry">
        <div class="finding-entry-step">${String(si + 1).padStart(2, '0')} — ${escapeHtml(s.name)}</div>`;

      s.fields.forEach(field => {
        const val = f.fields[field.key];
        if (!val || !String(val).trim()) return;
        if (field.type === 'rating') {
          const ratingClass = { 'critical': 'critical', 'needs-work': 'needs-work', 'good': 'good' };
          const label       = field.labels[field.options.indexOf(val)] || val;
          h += `<span class="finding-entry-rating ${ratingClass[val] || ''}">${escapeHtml(field.label)}: ${escapeHtml(label)}</span> `;
        } else {
          h += `<div style="margin-top:6px">
            <div style="font-size:10px;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">${escapeHtml(field.label)}</div>
            <div class="finding-entry-notes" style="white-space:pre-wrap">${escapeHtml(String(val))}</div>
          </div>`;
        }
      });
      h += `</div>`;
    });
    h += `</div>`;
  });

  if (!hasAny) {
    h = `<div class="empty-state">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="6" width="24" height="28" rx="2" stroke="#8c959f" stroke-width="1.5"/>
        <path d="M14 14h12M14 19h12M14 24h7" stroke="#8c959f" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <p>No findings recorded yet.<br>Open the Details panel for any step and fill in your findings.</p>
    </div>`;
  }

  document.getElementById('tab-all').innerHTML = h;
}

function renderExportTab() {
  const clientName = document.getElementById('client-name').value || 'Unknown Business';
  const exportData = {
    meta: {
      client:            clientName,
      audit_date:        new Date().toISOString().split('T')[0],
      steps_completed:   doneSteps(),
      steps_total:       totalSteps(),
      findings_recorded: countAllFindings(),
      generated_by:      'BizAudit Cold Prospect Framework'
    },
    phases: PHASES.map((p, pi) => ({
      id:    pi + 1,
      name:  p.name,
      steps: p.steps.map((s, si) => {
        const key = `${pi}-${si}`;
        return {
          id:        si + 1,
          name:      s.name,
          completed: checked[key] || false,
          findings:  (findings[key] && findings[key].fields) ? findings[key].fields : {},
          saved_at:  (findings[key] && findings[key].savedAt) || null
        };
      })
    }))
  };

  const json = JSON.stringify(exportData, null, 2);

  document.getElementById('tab-export').innerHTML = `
    <div style="font-size:13px;color:var(--text-secondary);margin-bottom:14px;line-height:1.6">
      This structured JSON contains all your findings and is ready for the report generator.
      Copy it to use with any AI tool, document builder, or Firebase import.
    </div>
    <div class="export-code" id="export-json">${escapeHtml(json)}</div>
    <div class="export-actions">
      <button class="btn-copy" id="copy-btn" onclick="copyExport()">📋 Copy JSON</button>
      <button class="btn-copy" onclick="downloadExport('${escapeHtml(clientName.replace(/[^a-z0-9]/gi, '_'))}')">⬇ Download .json</button>
    </div>`;
}

function copyExport() {
  const el   = document.getElementById('export-json');
  const text = el ? el.textContent : '';
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    if (btn) {
      btn.textContent = '✓ Copied!';
      btn.classList.add('success');
      setTimeout(() => { btn.textContent = '📋 Copy JSON'; btn.classList.remove('success'); }, 2000);
    }
  }).catch(() => alert('Copy failed — please select and copy manually.'));
}

function downloadExport(clientSlug) {
  const el   = document.getElementById('export-json');
  const text = el ? el.textContent : '{}';
  const blob = new Blob([text], { type: 'application/json' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `BizAudit_${clientSlug}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}

// ─────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────
function init() {
  loadAllFromStorage();
  renderSidebar();
  renderMain();
  updateProgress();
}

init();
