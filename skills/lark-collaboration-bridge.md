# lark-collaboration-bridge

A specialized Gemini CLI extension for Lark (Feishu), providing agents with the ability to interact with Lark's messaging, calendar, and collaboration tools via MCP.

## Context
Use this skill when your agent needs to send updates to Lark channels, manage calendar events, or interact with Lark's collaboration ecosystem.

## Key Features
- **Natural Language Interaction**: Communicate with Lark using standard English/Chinese prompts.
- **Messaging Ops**: Send, read, and manage messages in Lark chats and groups.
- **Calendar Management**: Tools for scheduling and retrieving Lark calendar events.
- **Custom Commands**: Support for execution of specialized Lark API commands.
- **Gemini CLI Native**: Pre-configured for seamless use within the gemini-cli environment.

## How to Use
1. **Message**: "Send a summary of the [BuildReport] to the Lark [ProjectChannel]".
2. **Schedule**: "Schedule a 30-minute meeting in Lark for tomorrow at 10 AM regarding '[Topic]'".
3. **Query**: "Retrieve the last 5 messages from the Lark chat with [UserName]".

## Requirements
- **API**: Requires Lark App ID and App Secret.
- **Runtime**: Gemini CLI + Lark MCP Server.
