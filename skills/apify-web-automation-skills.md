# apify-web-automation-skills

A collection of powerful web scraping and automation skills for Gemini CLI, leveraging Apify's cloud infrastructure for high-performance data extraction and site crawling.

## Context
Use this skill when you need to extract data from websites, perform automated web searches, or crawl large volumes of web content for analysis.

## Key Features
- **Web Crawler**: Primitives for high-performance, parallel crawling of entire websites.
- **Google Search Integration**: Automated searching and results extraction from Google.
- **Data Structuring**: Automatically transforms raw HTML into structured JSON or Markdown formats.
- **Cloud Execution**: Tasks run on Apify's scalable cloud infrastructure to bypass local resource limits.
- **Headless Browser Support**: Uses Playwright/Puppeteer internally for handling complex JavaScript sites.

## How to Use
1. **Crawl**: "Crawl [URL] and extract all product information including price and description".
2. **Search**: "Search Google for '[Query]' using the Apify skill and summarize the top 5 results".
3. **Export**: "Save the scraped data from [Source] in a structured Markdown table in [TargetFile]".

## Requirements
- **Account**: Apify account and API token.
- **Runtime**: Gemini CLI + Apify Agent Skills.
