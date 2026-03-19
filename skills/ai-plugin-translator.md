# ai-plugin-translator

A deterministic CLI tool for translating AI coding agent plugins across different ecosystems (e.g., Claude Code to Gemini CLI).

## Context
Use this skill when you have existing automation or tools built for one AI assistant and need to migrate them to another with minimal manual effort.

## Key Features
- **Deterministic Translation**: Ensures reliable and predictable mapping between plugin structures.
- **Ecosystem Mapping**: Handles complex mappings between Claude Code and Gemini CLI formats.
- **Smart Updates**: Automatically handles metadata and versioning during translation.
- **Plugin Manager**: Includes a CLI for managing multiple plugin translations.

## How to Use
1. **Translate**: `plugin-translator --src [path/to/claude/plugin] --dest [output/path]`.
2. **Bulk**: Translate an entire marketplace or directory of plugins in one command.
3. **Integrate**: The translated plugins are immediately ready for use in the target ecosystem.

## Requirements
- **Runtime**: Node.js/NPM.
- **Source**: Valid source plugin manifest.
