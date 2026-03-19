# infiniloom-context-generator

A high-performance repository context generator that transforms entire codebases into optimized formats for large language models (LLMs) like Gemini, GPT-4, and Claude.

## Context
Use this skill when you need to feed an entire repository into an AI's context window or when preparing data for RAG and Vector Databases.

## Key Features
- **Codebase Transformation**: Converts source code into highly optimized, token-efficient formats for LLMs.
- **RAG Ready**: Specifically designed to support Retrieval-Augmented Generation workflows and Vector DB indexing.
- **Scalable Input**: Handles large repositories with minimal overhead and high throughput.
- **Format Compatibility**: Optimized for Claude, GPT-4/5, Gemini, and other state-of-the-art models.
- **MCP Integration (Planned)**: Native MCP server support for direct agent interaction with repository context.

## How to Use
1. **Generate**: "Create an optimized context representation of the [ProjectName] repository for Gemini-1.5-Pro".
2. **Export**: "Export the repository structure in Infiniloom format for a Vector DB indexing job".
3. **Analyze**: "Use Infiniloom to summarize the architectural patterns across the [ModuleName]".

## Requirements
- **Runtime**: Node.js/CLI environment.
- **Optimization**: Requires no special hardware, but runs faster on SSD-based storage.
