# gemini-cloud-assist-mcp

An MCP server for Gemini Cloud Assist providing comprehensive tools to assist with tasks across the GCP platform.

## Context
Use this skill for high-level GCP assistance, resource discovery, and guided troubleshooting across all Google Cloud services.

## Key Features
- **Platform-Wide Assistance**: Integrated help for Compute Engine, Storage, Networking, etc.
- **Resource Discovery**: Tools for finding and querying resources across projects.
- **Guided Workflows**: Interactive prompts for complex GCP operations.
- **Multi-Client Support**: Compatible with Gemini CLI, Claude Code, and Cline.

## How to Use
1. **Query**: "How do I optimize the cost of my active GKE clusters?".
2. **Find**: "Locate all orphan disks in the [region] region".
3. **Debug**: "Why is my Cloud Function failing with a 403 error?".

## Requirements
- **Auth**: gcloud SDK authenticated.
- **Runtime**: Node.js/NPM.
