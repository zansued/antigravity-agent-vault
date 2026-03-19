# cloud-run-mcp

An MCP server and Gemini CLI extension for deploying and managing applications on Google Cloud Run.

## Context
Use this skill when you need to automate the deployment of containerized applications, manage service revisions, or configure Cloud Run settings directly from the agent.

## Key Features
- **Automated Deployment**: Streamlines the process of pushing containers to Cloud Run.
- **Service Management**: Tools for listing services, viewing logs, and managing revisions.
- **Traffic Redirection**: Capability to split or shift traffic between service versions.
- **Prompts**: Includes optimized prompts for Cloud Run lifecycle management.

## How to Use
1. **Auth**: `gcloud auth application-default login`.
2. **Deploy**: "Deploy the current repository to Cloud Run service [name]".
3. **Status**: "Check the health and traffic split of service [name]".

## Requirements
- **GCP Project**: Active project with Cloud Run API enabled.
- **SDK**: Google Cloud SDK installed and authenticated.
