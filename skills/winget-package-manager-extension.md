# winget-package-manager-extension

A Gemini CLI extension for the Windows Package Manager (WinGet), allowing AI agents to install, update, and manage Windows software programmatically.

## Context
Use this skill when the agent needs to set up development environments, install required software, or manage system-level packages on a Windows host.

## Key Features
- **Software Installation**: Install any package available in the WinGet repository (e.g., nodejs, git, vscode).
- **Package Updates**: Automatically detect and apply updates to installed Windows software.
- **Search & Discovery**: Search for available WinGet packages based on names or tags.
- **Environment Setup**: One-command environment bootstrapping using WinGet manifests.
- **System Integration**: Direct interaction with the WinGet CLI via the MCP server.

## How to Use
1. **Install**: "Install the latest version of [PackageName] using WinGet".
2. **Upgrade**: "Check for and apply any available updates for [SoftwareName]".
3. **Search**: "Find a WinGet package for [ToolType] and show its installation ID".

## Requirements
- **OS**: Windows 10/11 with WinGet installed.
- **Runtime**: Gemini CLI + WinGet MCP Server.
