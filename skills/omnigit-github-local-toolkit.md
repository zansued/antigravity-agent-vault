# omnigit-github-local-toolkit

A powerful enhancement of the official GitHub MCP server, providing advanced tools for both remote GitHub interaction and local Git repository management.

## Context
Use this skill when you need deep integration with GitHub (PR reviews, issue comments) or when performing complex local Git operations like reformatting body text or filtering commit patterns.

## Key Features
- **Local Git Toolset**: Primitives for interacting with local Git repositories without requiring remote API calls.
- **Enhanced Review Management**: Improved resolution for PR review comment IDs and specialized writing tools for issue/PR comments.
- **Advanced Filtering**: Support for `filter_patterns` to sanitize or refine repository content during retrieval.
- **Hybrid Operations**: Seamlessly switches between local Git state and remote GitHub API data.
- **Security Primitives**: Built-in support for read-only and "lockdown" modes for safer autonomous interaction.

## How to Use
1. **Comment**: "Add a review comment to the [PullRequest] using the omnigit specialized writer".
2. **Local Git**: "Perform a local git check of the current branch status and pending changes".
3. **Filter**: "List all issues in [Repo] but filter out any results matching the [RegexPattern]".

## Requirements
- **API**: GitHub Personal Access Token (for remote ops).
- **Tools**: Local git installed.
- **Runtime**: Gemini CLI + Omnigit MCP Server.
