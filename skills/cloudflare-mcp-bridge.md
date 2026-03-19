# cloudflare-mcp-bridge

A comprehensive Gemini CLI extension for Cloudflare's MCP servers, enabling direct control over Cloudflare Workers, KV storage, and other edge services.

## Context
Use this skill to manage your Cloudflare edge infrastructure, deploy serverless code, and interact with edge-based data stores from within your agentic environment.

## Key Features
- **Workers Management**: Deploy, monitor, and manage Cloudflare Workers directly via the MCP server.
- **KV Storage Ops**: Full CRUD operations for Cloudflare KV namespaces.
- **Edge Deployment**: Streamlined workflows for moving code from the agent's environment to the Cloudflare network.
- **Secret Management**: Secure handling of environment variables and secrets for Cloudflare services.
- **Resource Linking**: "Link" the Gemini CLI to specific Cloudflare accounts and projects with minimal setup.

## How to Use
1. **Deploy**: "Deploy the [WorkerName] code to the production Cloudflare Workers environment".
2. **Store**: "Write the value '[Val]' to the key '[Key]' in the [KVNamespace] storage".
3. **Monitor**: "Check the latest execution logs and health status of the [WorkerName]".

## Requirements
- **API**: Requires Cloudflare API Token and Account ID.
- **Runtime**: Gemini CLI + Cloudflare MCP Server.
