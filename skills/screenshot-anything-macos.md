# screenshot-anything-macos

A specialized extension for macOS that enables AI agents to take screenshots and manage application windows using natural language commands.

## Context
Use this skill when you need to capture visual context from the user's screen, lock onto specific application windows, or automate UI-based research on macOS.

## Key Features
- **Natural Language Screenshots**: "Take a screenshot of the browser" or "Capture the active terminal".
- **Window Locking**: Lock the agent's focus to a specific application window for continuous monitoring.
- **Window List Management**: Queries and identifies all open windows and their metadata.
- **MCP Toolset**: Provides direct screenshot and window management tools via MCP.

## How to Use
1. **Capture**: "Take a screenshot of the [AppName] window".
2. **Lock**: "Lock focus to the [AppName] window and report any UI changes".
3. **List**: "Show me a list of all currently open windows on the system".

## Requirements
- **OS**: macOS only.
- **Runtime**: Node.js/NPM + macOS accessibility permissions.
