# nix-flake-management

A specialized Gemini CLI extension for Nix flake management and Dendritic pattern scaffolding, enabling agents to interact with the Nix ecosystem.

## Context
Use this skill when managing Nix-based environments, configuring Nix flakes, or using Dendritic patterns for architectural scaffolding within a Nix workspace.

## Key Features
- **Flake Management**: Tools for querying, updating, and managing `flake.nix` files programmatically.
- **Dendritic Scaffolding**: Support for scaffolding project structures following the Dendritic architectural pattern.
- **Nix Ecosystem Primitives**: Basic tools for interacting with the Nix package manager and development environments.
- **Agentic Integration**: Specifically optimized for use within the Gemini CLI environment.

## How to Use
1. **Query**: "List all inputs and outputs defined in the current Nix flake".
2. **Update**: "Update the [DependencyName] version in the `flake.nix` file".
3. **Scaffold**: "Use the Dendritic pattern to scaffold a new [ProjectType] in the current Nix environment".

## Requirements
- **Tools**: Nix package manager installed.
- **Runtime**: Gemini CLI + Nix MCP Extension.
