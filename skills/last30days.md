# last30days

Research any topic across Reddit, X (Twitter), YouTube, HN, Polymarket, and the web from the last 30 days. Becomes an expert and writes copy-paste-ready prompts or grounded summaries.

## Context
Use this skill when the user needs up-to-the-minute research, trend discovery, or tool-specific prompting techniques that require real-world community consensus from the last 30 days.

## Examples
- `/last30days [topic]`
- `/last30days [topic] for [tool]` (e.g., "prompting techniques for ChatGPT")
- `/last30days remotion animations for Claude Code`
- `/last30days What are the best rap songs lately`

## Capabilities
- **Broad Discovery**: Scans Reddit, X, Bluesky, YouTube (with transcripts), Hacker News, and Polymarket.
- **Smart Supplemental Search**: Extracts entities (@handles, subreddits) and runs targeted follow-up searches.
- **Synthesis Engine**: Identifies patterns, best practices, and weighted relevance based on engagement metrics.
- **Prompt Generation**: Delivers copy-paste-ready prompts optimized for the target tool.

## Requirements
- **SCRAPECREATORS_API_KEY**: For Reddit, TikTok, and Instagram (scrapecreators.com).
- **X Search (Optional)**: `AUTH_TOKEN` and `CT0` cookies for high-quality headless search, or `XAI_API_KEY` for fallback.
- **Node.js**: Version 22+ (for vendored Twitter client).

## How It Works
1. **Phase 1 (Broad)**: Uses OpenAI Responses API (web_search) for Reddit, vendored GraphQL for X, and Gamma/Algolia APIs for Polymarket/HN.
2. **Phase 2 (Deep)**: Supplemental research on identified high-signal handles and subreddits.
3. **Delivery**: Merges and deduplicates results into an expert-level summary or tool-specific prompt.
