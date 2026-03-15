# ABSORPTION_REPORT: browser-use

## Analysis Date: 2026-03-14
## Target: https://github.com/browser-use/browser-use

### 🏗️ Architecture
`browser-use` is a library designed to make websites accessible for AI agents. It provides a high-level API to control web browsers using LLMs, focusing on visual understanding and structured interaction.

- **Event-Driven Browser Sessions:** Uses `BrowserSession` and `CDPSession` (Chrome DevTools Protocol) for fine-grained control and observability.
- **Agent Service:** The core logic resides in `browser_use.agent.service`, which orchestrates the interaction between the LLM, the DOM, and the browser.
- **DOM Understanding:** Includes a sophisticated DOM tree processing and state summary mechanism to provide context to the LLM.
- **Multi-LLM Support:** Native integrations for OpenAI, Anthropic, Google GenAI, DeepSeek, and more.

### 🔑 Key Components
- **Agent (`browser_use.agent.Agent`):** The primary class for executing tasks in the browser.
- **Browser (`browser_use.browser.Browser`):** Manages browser instances and profiles.
- **Controller:** Manages custom tools and actions that the agent can perform.
- **DOM Service:** Handles element detection, coordinate calculation, and snapshot extraction.
- **Telemetry:** Built-in support for monitoring agent performance and token costs.

### 🚀 Extracted Skills
- **Web Navigation Specialist:** Automating complex workflows through websites.
- **Agentic Vision Architect:** Using LLMs to interpret visual browser states and take actions.
- **CDP Orchestrator:** Deep control of browser internals via the DevTools Protocol.

### 🛠️ Entry Points
- `browser-use`: Fast CLI for browser automation.
- `browser-use-tui`: Legacy Text User Interface.
- `browser_use.agent.Agent`: Python API entry point.

### ⚠️ Risks & Bottlenecks
- **Handshake Failures:** Potential WebSocket/handshake issues with CDP in certain environments.
- **LLM Token Cost:** Heavy use of DOM snapshots can lead to high token consumption.
- **Site Anti-Bot:** Subject to detection by anti-bot mechanisms (though it supports profiles and proxies).
