# mcp-server-kubernetes

A Model Context Protocol (MCP) server for Kubernetes management, cluster diagnostics, and observability.

## Context
Use this skill for managing Kubernetes clusters, diagnosing issues, and monitoring pod/service health directly through your agent.

## Key Features
- **Cluster Diagnostics**: Includes the `/k8s-diagnose` prompt for rapid troubleshooting.
- **Non-Destructive Mode**: Safety feature that prevents destructive operations by default.
- **Observability**: Integration with tracing backends like Jaeger.
- **Multi-Platform**: Supports Claude Desktop, Gemini CLI, and Cursor.

## How to Use
1. **Diagnosis**: "/k8s-diagnose to find why pod [name] is crashing".
2. **Manage**: "List all services in namespace [namespace]".
3. **Safety**: Operates in non-destructive mode unless explicitly bypassed.

## Requirements
- **Access**: Configured `kubectl` context.
- **Runtime**: Node.js v18+.
