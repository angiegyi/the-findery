# Pinterest Board Analysis Setup Guide

This guide explains how to set up the Pinterest board analysis feature for The Findery.

## Overview

The Pinterest analysis feature works in three stages:
1. **URL Parsing**: Extract board information from Pinterest URL
2. **Pinterest API**: Fetch board pins and their metadata
3. **AI Analysis**: Use AI to match pin aesthetics with Australian brands

## Current Status

✅ **Working Now (Development Mode)**:
- URL validation and parsing
- Mock Pinterest data
- Mock brand suggestions
- Full UI functionality

⏳ **Requires Setup (Production)**:
- Pinterest API integration
- AI-powered brand matching

## Development Mode (No Setup Required)

The feature currently works with mock data. When you paste any Pinterest board URL, it will:
1. Validate the URL format
2. Return mock pins
3. Suggest 5 real Australian brands (Baiia, Dissh, The Bare Road, Ozma, Esse Studios)

**Try it now**: Paste `https://www.pinterest.com.au/username/board-name/` into the search

## Production Setup

### Step 1: Pinterest API Access

1. **Create Pinterest App**:
   - Go to [Pinterest Developers](https://developers.pinterest.com/)
   - Click "Create App"
   - Fill in app details:
     - App name: "The Findery"
     - Description: "Discover Australian fashion brands from Pinterest boards"
     - Website: Your deployed URL

2. **Get API Credentials**:
   - After approval, get your access token
   - Add to Netlify environment variables:
     ```
     PINTEREST_ACCESS_TOKEN=your_access_token_here
     ```

3. **API Limitations**:
   - Pinterest API v5 is currently limited
   - May require app review for production access
   - Rate limits: 1000 requests/hour per app

### Step 2: AI Service (Choose One)

#### Option A: OpenAI (Recommended)

**Why OpenAI?**
- GPT-4 Vision can analyze images directly
- Better for fashion/aesthetic understanding
- More cost-effective for this use case

**Setup**:
1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to Netlify environment:
   ```
   OPENAI_API_KEY=sk-...
   ```

**Cost**: ~$0.01 per board analysis (20 pins with GPT-4o-mini)

#### Option B: Anthropic Claude

**Why Claude?**
- Excellent text understanding
- Strong reasoning about style/aesthetics
- Good for detailed descriptions

**Setup**:
1. Get API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to Netlify environment:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```

**Cost**: ~$0.015 per board analysis (Claude 3.5 Sonnet)

### Step 3: Deploy

1. **Add Environment Variables in Netlify**:
   - Go to Site Settings → Environment Variables
   - Add the keys from your `.env` file
   - Redeploy your site

2. **Test Production**:
   - Paste a real Pinterest board URL
   - Should see actual pins and AI-generated brand suggestions

## How It Works (Technical)

### 1. URL Parsing (`src/utils/pinterest.ts`)

```typescript
extractPinterestBoardInfo("https://www.pinterest.com.au/username/board-name/")
// Returns: { username: "username", boardSlug: "board-name", boardName: "board name" }
```

### 2. Pinterest API Call (`netlify/functions/analyze-pinterest-board.ts`)

```typescript
// Fetches board pins from Pinterest API v5
GET https://api.pinterest.com/v5/boards/{username}/{boardSlug}/pins

// Returns pins with:
// - id, title, description
// - image URLs
// - external links
```

### 3. AI Analysis

The AI receives pin descriptions and generates:
- Brand name (must be real Australian brand)
- Description
- Why it matches (specific aesthetic elements)
- Confidence score (0-100)

**AI Prompt Example**:
```
Based on these pins:
1. Minimalist linen dress - sustainable summer style
2. Earthy tone outfit - natural fabrics and neutral colors
...

Suggest 5 Australian brands that match this aesthetic.
```

## Alternative: Pinterest Scraping

If Pinterest API access is difficult, you can use web scraping:

**Option 1: Puppeteer** (Heavy, server-side)
```typescript
import puppeteer from 'puppeteer';
// Launch browser, navigate to board, extract pins
```

**Option 2: Apify** (Service, costs money)
- Pinterest scraper actors available
- Handles rate limiting and proxies
- $49/month for moderate usage

**⚠️ Warning**: Scraping may violate Pinterest's Terms of Service. Use official API when possible.

## Future Enhancements

1. **Image Analysis**:
   - Use GPT-4 Vision to analyze pin images directly
   - Color palette extraction
   - Style classification (minimalist, boho, etc.)

2. **Brand Database**:
   - Create Supabase table with Australian brands
   - Store brand aesthetics as vector embeddings
   - Semantic search for better matching

3. **Caching**:
   - Cache analyzed boards for 24 hours
   - Reduce API costs
   - Faster repeated searches

4. **User Feedback**:
   - "Was this helpful?" ratings
   - Improve AI suggestions over time
   - Learn user preferences

## Testing

### Development Testing
```bash
# Test URL parsing
curl -X POST http://localhost:8888/.netlify/functions/analyze-pinterest-board \
  -H "Content-Type: application/json" \
  -d '{"username":"test","boardSlug":"summer-style"}'

# Should return mock brands
```

### Production Testing URLs
Try these real Pinterest boards:
- Minimalist fashion: `https://www.pinterest.com.au/minimalistwardrobe/capsule-wardrobe/`
- Australian brands: `https://www.pinterest.com.au/theiconicau/australian-designers/`
- Sustainable fashion: `https://www.pinterest.com.au/sustainablefashion/eco-friendly/`

## Cost Estimates

**With OpenAI**:
- 100 board analyses/day: ~$30/month
- 1000 board analyses/day: ~$300/month

**With Pinterest + OpenAI**:
- Add Pinterest API costs (free tier available)
- Total: ~$30-$350/month depending on usage

## Troubleshooting

**Error: "Invalid Pinterest URL"**
- Check URL format: `https://www.pinterest.com/username/board-name/`
- Ensure it's a board URL, not a pin or profile

**Error: "Pinterest API error"**
- Check `PINTEREST_ACCESS_TOKEN` is set
- Verify token is valid (not expired)
- Check API rate limits

**Error: AI analysis failed**
- Check API key is valid
- Verify you have credits/quota
- Check function logs in Netlify

## Support

- Pinterest API: https://developers.pinterest.com/docs/
- OpenAI: https://platform.openai.com/docs/
- Anthropic: https://docs.anthropic.com/
