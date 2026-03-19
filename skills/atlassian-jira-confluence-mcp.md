# atlassian-jira-confluence-mcp

The official Atlassian MCP Server for securely connecting Jira and Confluence with AI agents, providing comprehensive issue management and document collaboration tools.

## Context
Use this skill when you need to interact with Jira issues, query Confluence pages, or automate cross-platform Atlassian workflows.

## Key Features
- **Jira Issue Management**: Create, update, search, and transition Jira issues directly via natural language.
- **Confluence Content Ops**: Query, create, and manage pages, blogs, and space metadata in Confluence.
- **Combined Workflows**: Orchestrates complex tasks involving both Jira and Confluence (e.g., creating a Confluence doc from a Jira Epic).
- **Secure Communication**: Uses API token authentication and fine-grained permission management for secure cloud access.
- **Compass Integration**: Support for Atlassian Compass for managing software component metadata and health.

## How to Use
1. **Jira**: "Find all high-priority issues assigned to me in the [Project] and summarize their status".
2. **Confluence**: "Search Confluence for the latest architectural design documents related to [Topic]".
3. **Workflow**: "Create a meeting notes page in Confluence linked to the Jira issue [IssueKey]".

## Requirements
- **Account**: Atlassian Cloud account with Jira/Confluence access.
- **API**: Requires Atlassian API Token.
- **Runtime**: Gemini CLI + Atlassian MCP Server.
