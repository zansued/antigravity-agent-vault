# github-mcp-integration-core

A core Gemini CLI extension for GitHub's official MCP server, providing standard tools for managing repositories, issues, pull requests, and other GitHub resources.

## Context
Use this skill for standard GitHub operations like searching code, creating issues, or reviewing pull requests.

## Key Features
- **Repository Management**: Search for repositories, create new ones, and manage project metadata.
- **Issue Tracking**: Full CRUD support for GitHub issues, including comments and labels.
- **Pull Request Ops**: Tools for listing, creating, and reviewing pull requests.
- **Code Search**: Powerful search capabilities to find specific code patterns across GitHub repositories.
- **MCP Resource Linking**: Native support for linking GitHub resources directly into the agent's context.

## How to Use
1. **Search**: "Search for [Pattern] in the [RepoName] on GitHub".
2. **Issue**: "Create a new GitHub issue titled '[BugTitle]' with the description from the current logs".
3. **Review**: "List all open pull requests for [Repo] and summarize the latest review comments".

## Requirements
- **API**: Requires a GitHub Personal Access Token.
- **Runtime**: Gemini CLI + GitHub MCP Server.
