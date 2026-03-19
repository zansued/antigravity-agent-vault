# memogemini-memory

An MCP server providing multi-layered persistent memory (File, Semantic, Fact) for Gemini agents.

## Context
Use this skill when you need your agent to remember specific project facts, cross-file relationships, or long-term semantic context that exceeds the standard window.

## Memory Layers
- **File Memory**: Persistent storage and retrieval of specific file contents and versions.
- **Semantic Memory**: Vector-based search for related concepts across the codebase/project.
- **Fact Memory**: High-level extraction and indexing of key project facts (e.g., "The production DB is on RDS").

## How to Use
1. **Store**: "Remember the fact that our API versioning follows semver".
2. **Search**: "Recall all project discussions related to authentication".
3. **Retrieve**: "Get the previous version of [file] from file memory".

## Requirements
- **Runtime**: Node.js/NPM.
- **Storage**: Requires local storage (JSON/SQLite).
