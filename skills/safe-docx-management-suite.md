# safe-docx-management-suite

A robust suite of tools for the safe manipulation, comparison, and generation of .docx files, specifically optimized for complex legal and business documents.

## Context
Use this skill when you need to programmatically edit Word documents, compare different document versions, or manage complex XML-based document structures without corrupting formatting.

## Key Features
- **docx-primitives**: Direct, safe access to the underlying XML structure of .docx files.
- **Document Comparison**: Specialized tools for identifying differences in complex legal and business documents.
- **Safe MCP Server**: Provides AI agents with a secure interface for document manipulation.
- **Format Preservation**: Optimized to maintain formatting integrity even during complex edits.
- **Business/Legal Optimized**: Specifically tested on the types of complex structures found in professional business and legal documentation.

## How to Use
1. **Edit**: "Safely update the [ClauseText] in the [ContractFile].docx while preserving all styles".
2. **Compare**: "Run a comparison between [VersionA].docx and [VersionB].docx and summarize the changes".
3. **Manipulate**: "Use safe-docx primitives to extract the table data from the [Report].docx".

## Requirements
- **Runtime**: Node.js/MCP Server.
- **Dependencies**: Operates natively on .docx (OpenXML) files without requiring .NET or MS Office.
