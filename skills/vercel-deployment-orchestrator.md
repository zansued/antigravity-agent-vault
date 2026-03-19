# vercel-deployment-orchestrator

A Gemini CLI extension for Vercel's official MCP server, enabling agents to manage deployments, aliases, and project settings directly from the terminal.

## Context
Use this skill to automate your Vercel deployment pipeline, manage production aliases, and check the status of your cloud-hosted projects.

## Key Features
- **Deployment Control**: Trigger new Vercel deployments or rollback to previous versions.
- **Resource Management**: Manage Vercel projects, domains, and environment variables.
- **Alias Handling**: Tools for creating and updating production aliases for deployments.
- **Status Monitoring**: Real-time status checks for active Vercel deployments and builds.
- **Natural Language Support**: Execute Vercel operations using clear, agentic prompts.

## How to Use
1. **Deploy**: "Trigger a new production deployment for the [ProjectName] on Vercel".
2. **Status**: "Get the current deployment status and latest build logs for [ProjectID]".
3. **Alias**: "Assign the production alias [DomainName] to the latest Vercel deployment".

## Requirements
- **API**: Requires a Vercel Personal Access Token.
- **Runtime**: Gemini CLI + Vercel MCP Server.
