# raindrop-bookmark-management

A full-featured MCP integration for Raindrop.io, enabling AI agents to manage bookmarks, collections, and highlights with high efficiency.

## Context
Use this skill when your agent needs to save web resources, organize research materials, or retrieve specific bookmarks from a Raindrop.io account.

## Key Features
- **Full CRUD Support**: Create, read, update, and delete bookmarks and collections.
- **Smart Organization**: Tools for managing tags, folder hierarchies, and nested collections.
- **Highlight Extraction**: Retrieve and manage text highlights saved within Raindrop bookmarks.
- **Bulk Operations**: Optimized for processing multiple bookmarks or collection updates in a single session.
- **Search & Filter**: Powerful search capabilities to find specific resources within a large Raindrop library.

## How to Use
1. **Save**: "Bookmark the URL [URL] to the '[Research]' collection in Raindrop with tags [Tags]".
2. **Organize**: "Move all bookmarks tagged '[Temp]' to the '[Archive]' folder in Raindrop".
3. **Retrieve**: "Get all highlights and notes from the bookmark titled '[ArticleTitle]'".

## Requirements
- **API**: Requires a Raindrop.io API Token.
- **Runtime**: Gemini CLI + Raindrop MCP Server.
