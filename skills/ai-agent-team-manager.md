# ai-agent-team-manager

A framework for defining, spawning, and managing autonomous teams of AI workers for complex project collaboration.

## Context
Use this skill when a task is too complex for a single agent and requires specialized roles (e.g., Code Reviewer, Architect, Tester) to collaborate in a structured workflow.

## Key Features
- **Team Definition**: Define your team composition using structured JSON/YAML schemas.
- **Curated Roles**: Includes pre-built roles with specific expert context and toolsets.
- **Worker Spawning**: Dynamically spawn sub-agents to handle specific sub-tasks.
- **Brainstorming & Assignment**: Orchestrates collective reasoning and task distribution.
- **Merge & Cleanup**: Automatically merges worker outputs and cleans up the workspace.

## How to Use
1. **Define**: "Create a team of [3] workers for the [feature] implementation".
2. **Assign**: "Assign the security audit to the 'Security Lead' worker".
3. **Merge**: "Merge all worker outputs and provide a final implementation summary".

## Requirements
- **Runtime**: Node.js/NPM.
- **Provider**: Supports multiple AI providers for worker backend.
