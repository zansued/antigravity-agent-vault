# gerrit-mcp-server

An MCP server for interacting with Gerrit Code Review, enabling AI-assisted change management.

## Context
Use this skill to manage code reviews, vote on changes, and query Gerrit change statuses within your development workflow.

## Key Features
- **Change Management**: List, query, and details for Gerrit changes.
- **Review Automation**: Submit reviews and votes (Verified/Code-Review) directly.
- **Security**: Supports secure HTTP/HTTPS communication with Gerrit instances.
- **Sync**: Keeps local agent context in sync with remote Gerrit state.

## How to Use
1. **Query**: "List all open changes in project [project_name]".
2. **Review**: "Submit a +1 Code-Review vote for change [ID]".
3. **Diff**: "Explain the main differences in the latest patch set of change [ID]".

## Requirements
- **Access**: Gerrit API access enabled and credentials configured.
- **Runtime**: Node.js/NPM.
