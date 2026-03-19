# blender-mcp-connector

A Gemini CLI extension that connects to BlenderMCP, allowing AI agents to interact with the Blender 3D environment.

## Context
Use this skill when you need the agent to perform 3D modeling tasks, render scenes, or manage assets within Blender.

## Key Features
- **Blender Bridge**: Establishes a connection between Gemini CLI and the Blender MCP server.
- **Addon Integration**: Works with the official BlenderMCP addon.
- **Direct Interaction**: Allows agents to execute Blender commands and Python scripts.
- **Scene Management**: Tools for querying and modifying the 3D scene graph.

## How to Use
1. **Prerequisites**: Install the BlenderMCP addon in Blender.
2. **Setup**: Configure the Gemini CLI extension to point to the Blender server.
3. **Control**: "Create a 2x2 cube at the origin in Blender" or "Render the current scene".

## Requirements
- **Software**: Blender (latest stable) + BlenderMCP addon.
- **Runtime**: Node.js/NPM for the extension.
