# gemini-alert-extension

An alert and notification extension for Gemini CLI, enabling agents to send system-level notifications and trigger alerts based on task events.

## Context
Use this skill when your agent needs to notify the user of a completed task, a critical error, or a specific event that requires attention even if the terminal is not in focus.

## Key Features
- **System Notifications**: Sends native desktop notifications via the Gemini CLI.
- **Event-Driven Alerts**: Trigger alerts based on specific agent state changes or terminal output patterns.
- **Customizable Messaging**: Supports dynamic alert content based on task metadata.
- **Async Alerts**: Allows for background monitoring and alerting without blocking the main agent loop.

## How to Use
1. **Notify**: "Send a system alert when the [BuildTask] is successfully completed".
2. **Warn**: "Trigger a high-priority notification if the server log contains the string '[ErrorPattern]'".
3. **Status**: "Send a periodic alert with the current progress of the [LongRunningTask]".

## Requirements
- **Runtime**: Gemini CLI.
- **Platform**: Supports Windows, macOS, and Linux native notification systems.
