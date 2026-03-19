# gemini-sleep-extension

A simple utility extension for Gemini CLI that allows the agent to intentionally pause execution for a specified duration.

## Context
Use this skill when you need to handle rate-limiting, wait for a background process to complete, or introduce a human-friendly pause in a long-running workflow.

## Key Features
- **Intentional Delay**: Pause the agent loop for N seconds or milliseconds.
- **Rate-Limit Handling**: Automatically wait when API rate limits are detected.
- **Workflow Control**: Synchronize async operations by adding strategically placed delays.

## How to Use
1. **Sleep**: "Sleep for 5 seconds before checking the build status".
2. **Wait**: "Pause for [duration] to allow the background deployment to propagate".
3. **Sync**: Use sleep commands between rapid API calls to ensure stability.

## Requirements
- **Runtime**: Gemini CLI.
