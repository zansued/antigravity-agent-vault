# stagehand-mcp-local

Local browser automation MCP server with support for custom LLM gateway base URLs.

## Context
Use this skill for local browser automation tasks (web scraping, UI testing, data extraction) where you need to connect to custom LLM endpoints or local models.

## Tools
- **MCP Tools**: Standard Stagehand tools for browser interaction.
- **BaseURL Support**: Configurable `baseURL` for connecting to alternative AI providers (OpenRouter, local gateways).
- **Auto Screenshots**: Automatically captures screenshots during automation for debugging.

## How to Use
1. **Config**: Set `STAGEHAND_BASE_URL` if using a custom gateway.
2. **Launch**: Start via `npx -y stagehand-mcp-local`.
3. **Automate**: Provide natural language instructions for browser tasks.

## Requirements
- **Node.js**: v20+.
- **Playwright/Puppeteer**: Required for browser control.
