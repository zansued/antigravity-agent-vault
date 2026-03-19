# wordpress-agent-management

A specialized WordPress extension for Gemini CLI, enabling agents to directly manage, audit, and interact with WordPress installations and content.

## Context
Use this skill when performing maintenance, content management, or security audits on WordPress-based websites through an agentic interface.

## Key Features
- **Content Management**: Tools for creating, editing, and listing posts, pages, and media.
- **Site Auditing**: Perform health checks and security scans on active WordPress sites.
- **Theme & Plugin Control**: List, activate, or deactivate plugins and themes via agentic commands.
- **CLI Interaction**: Leverages WP-CLI integration where available for deep system management.
- **Gemini Native**: Specifically structured as a Gemini CLI extension for seamless workflow integration.

## How to Use
1. **Manage**: "List all active plugins on the [WordPressSite] and check for updates".
2. **Publish**: "Draft a new WordPress post titled '[Title]' with the content from [LocalFile]".
3. **Audit**: "Perform a security audit on the [WordPressSite] and report any critical vulnerabilities".

## Requirements
- **Tools**: WordPress API access or WP-CLI (recommended).
- **Runtime**: Gemini CLI.
