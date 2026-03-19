# chrome-devtools

Advanced browser debugging, performance insights, and reliable automation using Chrome DevTools Protocol and Puppeteer.

## Context
Use this skill when you need to automate browser interactions, capture screenshots, analyze network activity, or extract performance insights from web pages.

## Tools
- **Navigation**: `navigate_page`, `new_page`, `list_pages`, `select_page`, `close_page`, `wait_for`.
- **Interaction**: `click`, `type_text`, `fill_form`, `hover`, `drag`, `upload_file`.
- **Performance**: `performance_analyze_insight`, `performance_start_trace`, `performance_stop_trace`.
- **Emulation**: `emulate` (device/viewport), `resize_page`.

## Key Features
- **Performance Insights**: Record traces and extract actionable data (LCP, CLS, etc.).
- **Reliable Automation**: Uses Puppeteer for stable interactions and automatic waiting.
- **Remote Debugging**: Connects to existing Chrome instances via `--autoConnect` or `--browser-url`.
- **Slim Mode**: Use `--slim` for basic tasks without full performance/tracing overhead.

## How to Use
1. **Launch**: Start with `new_page` or `navigate_page`.
2. **Interact**: Use `click` or `type_text` to navigate menus or fill forms.
3. **Analyze**: Use `performance_analyze_insight` for deep performance audits.
4. **Debug**: Inspect console logs and network requests via standard DevTools integration.

## Requirements
- **Node.js**: v20.19+ recommended.
- **Chrome**: Stable version installed on the system.
- **Configuration**: Use `npx -y chrome-devtools-mcp@latest` in your MCP client config.
