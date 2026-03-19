# agentic-context-reducer-rc

An agentic context reduction tool specifically designed for large monorepos (like Rocket.Chat) to prevent context bloat and token exhaustion.

## Context
Use this skill when working on massive repositories to extract domain-specific "semantic skeletons" instead of loading full file contents.

## Key Features
- **Skeleton Extraction**: Extracts the structural skeleton of files (definitions, signatures) to reduce token usage.
- **Domain-Specific**: Optimized for the Rocket.Chat monorepo architecture.
- **Semantic Search**: Integrated symbol search and detail lookup within the context-reduced environment.
- **Mutator vs. Generator**: Uses an advanced evolution of context reduction to maintain essential logic while stripping noise.
- **Upstream Potential**: Designed to be reusable for any large TypeScript/JavaScript monorepo.

## How to Use
1. **Reduce**: "Generate a semantic skeleton for the [DirectoryPath] to reduce context bloat".
2. **Search**: "Perform a symbol-aware search in the reduced workspace for [Symbol]".
3. **Analyze**: "Analyze the skeletal structure of the `service.ts` to understand the domain logic".

## Requirements
- **Target**: Large TS/JS monorepos (Optimized for Rocket.Chat).
- **Runtime**: MCP-compatible agent.
