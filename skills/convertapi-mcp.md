# convertapi-mcp

Model Context Protocol (MCP) server for ConvertAPI, providing secure file conversion capabilities.

## Context
Use this skill when you need to convert documents between various formats (e.g., PDF to Word, Image to PDF) securely using the ConvertAPI service.

## Tools
- **Convert**: The primary tool for executing file conversion workflows.
- **Information**: Retrieves details about supported formats and conversion parameters.

## How to Use
1. **Config**: Requires a ConvertAPI secret key.
2. **Launch**: `npx -y @convertapi/mcp-server`.
3. **Execute**: "Convert [file.pdf] to [file.docx] using ConvertAPI".

## Requirements
- **API Key**: ConvertAPI account required.
- **Runtime**: Node.js/NPM.
