# context7-documentation-bridge

A fork of the Context7 tool specialized in providing up-to-date documentation for AI coding assistants, ensuring prompts are always backed by the latest library versions and API specs.

## Context
Use this skill when you encounter outdated library information in your agent's reasoning or when you need to fetch the most recent API documentation for a specific library version.

## Key Features
- **Real-Time Doc Fetching**: Retrieves the latest documentation for any supported library or API.
- **Version Specificity**: Allows agents to specify the exact version of the library to fetch docs for.
- **Rule Integration**: Can be integrated into agent rules to automatically fetch context when specific libraries are mentioned.
- **Context Optimization**: Formats documentation specifically for LLM consumption, reducing noise and token usage.

## How to Use
1. **Fetch Docs**: "Get the latest documentation for [LibraryName] version [VersionNumber]".
2. **Configure**: "Set a rule to automatically fetch Context7 docs whenever [LibraryName] is in scope".
3. **Compare**: "Compare the current local documentation with the latest Context7 version for [API]".

## Requirements
- **Runtime**: Gemini CLI / MCP Server.
- **Network**: Requires internet access to fetch live docs.
