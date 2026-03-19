# catenary-mcp-lsp-bridge

A powerful bridge that connects the Model Context Protocol (MCP) to the Language Server Protocol (LSP), enabling AI agents to use any LSP-compliant language server.

## Context
Use this skill to give your AI agent deep code intelligence for languages not natively supported, by connecting to existing corporate or open-source language servers.

## Key Features
- **LSP-MCP Bridge**: Seamlessly translates LSP capabilities (GoTo Definition, Find References, Diagnostics) into MCP tools.
- **Multi-Language Support**: Works with any language server that supports the LSP standard.
- **Agent Intelligence**: Enhances agent-driven refactoring and navigation with compiler-grade accuracy.
- **CLI Configuration**: Easy-to-use CLI for managing language server connections and configurations.

## How to Use
1. **Setup**: "Configure Catenary to use the [Language] language server".
2. **Navigate**: "Find all references of the [FunctionName] using the LSP bridge".
3. **Debug**: "Show all compiler diagnostics for the current file provided by the language server".

## Requirements
- **Infrastructure**: Requires the target language server(s) to be installed on the system.
- **Runtime**: Node.js/NPM.
