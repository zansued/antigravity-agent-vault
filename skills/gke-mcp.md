# gke-mcp-extension

An MCP server and Gemini CLI extension specifically designed for managing Google Kubernetes Engine (GKE) clusters.

## Context
Use this skill for intensive GKE cluster management, including pod inspection, service configuration, and cluster-specific diagnostics.

## Key Features
- **Pod/Service Context**: High-fidelity context injection for GKE resources.
- **Cluster Management**: Tools for scaling, updating, and monitoring GKE clusters.
- **Gemini CLI Integration**: First-class support for Gemini CLI commands and prompts.
- **Diagnostic Prompts**: Built-in prompts for identifying cluster bottlenecks and failures.

## How to Use
1. **Inspect**: "List all pods in the [cluster_name] and report their status".
2. **Scale**: "Scale the [deployment_name] in [namespace] to 5 replicas".
3. **Log**: "Stream logs from GKE pods matching label [app=web]".

## Requirements
- **Environment**: GKE clusters accessible via current gcloud credentials.
- **Runtime**: Node.js v18+.
