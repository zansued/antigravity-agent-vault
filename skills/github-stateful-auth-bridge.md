# github-stateful-auth-bridge

A modified GitHub MCP server implementation that introduces stateful authorization for enhanced security in remote and local agent deployments.

## Context
Use this skill when you need a more secure, stateful way to manage GitHub authentication within your agentic environment, especially for remote hosts.

## Key Features
- **Stateful Authorization**: Implements persistent, stateful auth tokens for more reliable and secure GitHub access.
- **Remote Host Support**: Optimized for scenarios where the agent is running on a remote cloud host.
- **Extended Toolset**: Includes all tools from the official GitHub MCP server with added security layers.
- **Dynamic Tool Discovery**: Automatically discovers available GitHub tools based on user permissions.
- **Lockdown Mode**: Supports restricted "read-only" or "lockdown" modes for sensitive environments.

## How to Use
1. **Authorize**: "Initiate stateful GitHub authorization for the [RemoteHost] session".
2. **Configure**: "Set the GitHub MCP server to lockdown mode for the current task".
3. **Monitor**: "Check the status of the current stateful auth token".

## Requirements
- **API**: Requires a GitHub Personal Access Token (PAT).
- **Runtime**: Node.js/Docker (for server execution).
