# github-copilot-mcp-bridge

A powerful MCP server that bridges AI assistants with the GitHub Copilot CLI, leveraging its massive context window for deep codebase analysis.

## Context
Use this skill when you need to perform high-level codebase analysis, explain complex modules, or debug issues using the specialized knowledge of GitHub Copilot.

## Key Features
- **Large File Analysis**: Leverages Copilot's massive token window for analyzing files that exceed standard LLM limits.
- **Codebase Understanding**: Tools for explaining entire modules or identifying patterns across many files.
- **Copilot Toolset**: Includes `ask-copilot`, `copilot-explain`, `copilot-suggest`, `copilot-debug`, `copilot-refactor`, and `copilot-review`.
- **Session Management**: Maintain and query Copilot session history for continuous reasoning.
- **Cross-Client Support**: Verified on Antigravity, Gemini CLI, Claude Desktop/Code, and Cursor.

## How to Use
1. **Explain**: "Use Copilot to explain the logic in the [LargeFileName] and identify potential bugs".
2. **Refactor**: "Ask Copilot for refactoring suggestions for the [ModuleName] to improve performance".
3. **Debug**: "Use the `copilot-debug` tool to find the cause of the latest test failure".

## Requirements
- **Tools**: GitHub Copilot CLI installed and authenticated.
- **Runtime**: Node.js/NPM.
