# ai-driven-engineering-workflow

A comprehensive methodology and toolset for 100% AI-driven engineering, focusing on git-worktree management and deterministic workflow phases.

## Context
Use this skill to implement a fully autonomous engineering cycle, from issue definition to final code shipment, using advanced git and context engineering.

## Key Features
- **Phase-Based Workflow**: Includes `/issue` (Define), `/tasks` (Plan), `/implement` (Build), `/walkthrough` (Verify), and `/finalize` (Ship).
- **Git Worktree Optimization**: Uses `git-worktree` as a "secret weapon" for managing multiple concurrent experiments and features.
- **Context Engineering**: Advanced strategies for documenting learnings and maintaining project state.
- **Integrated MCPs**: Pre-configured support for Chrome DevTools MCP and other engineering utilities.
- **Deterministic Patterns**: Moves beyond simple "vibes" into a rigorous, engineering-first approach for AI agents.

## How to Use
1. **Plan**: "/tasks Define the requirements for the new [FeatureName] module".
2. **Implement**: "/implement Execute the plan for the [TaskID] within a dedicated worktree".
3. **Verify**: "/walkthrough Generate a proof-of-work for the latest changes".

## Requirements
- **Tools**: Git (with worktree support), Chrome (for DevTools MCP integration).
- **Methodology**: Follows the SaschaHeyer AI-driven workflow.
