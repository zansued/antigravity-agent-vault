# go-language-server-gopls

Integration for the official Go language server (`gopls`) with Gemini CLI via the Model Context Protocol (MCP).

## Context
Use this skill when developing Go (Golang) applications to get deep code intelligence, type checking, and navigation capabilities.

## Key Features
- **LSP Integration**: Direct access to `gopls` capabilities within the AI agent's toolset.
- **Type Checking**: Real-time type validation and error diagnostics for Go code.
- **Navigation**: Support for "Go to Definition", "Find References", and workspace symbol search.
- **Standard Compliance**: Uses the official Go tooling for maximum accuracy.

## How to Use
1. **Analyze**: "Run `gopls` diagnostics on the current Go package".
2. **Navigate**: "Find the definition of the [StructName] in the Go workspace".
3. **Refactor**: Use Go-aware tools for safe renaming and method extraction.

## Requirements
- **Tools**: Go (Golang) compiler + `gopls` binary installed.
- **Runtime**: Node.js/NPM for the MCP bridge.
