# semantic-go-indexer

A specialized tool for semantic code search and indexing using the Model Context Protocol (MCP), optimized for AI coding agents.

## Context
Use this skill when you need to perform deep, semantic searches across a large codebase, find symbol references, or understand complex code relationships.

## Key Features
- **Semantic Search**: Uses Ollama embeddings and SQLite vector search for context-aware queries.
- **Tree-Sitter Chunking**: Intelligently breaks down code into structural units for more accurate indexing.
- **Symbol Referencing**: Provides detailed symbol reference lookups across the indexed workspace.
- **MCP Native**: Fully integrated with MCP, allowing any compliant agent to use the semantic index.
- **Multi-Language Support**: Supports a wide range of programming languages via tree-sitter.

## How to Use
1. **Index**: "Index the current workspace for semantic search using goindexer".
2. **Search**: "Semantically search for [Concept] within the codebase".
3. **References**: "Find all references and semantic neighbors of the [SymbolName]".

## Requirements
- **Runtime**: Ollama (for embeddings) + SQLite.
- **Tools**: Tree-sitter installed.
