# multi-agent-orchestrator-hcom

A multi-agent communication and orchestration tool that enables AI agents to message, watch, and spawn each other across different terminal sessions and devices.

## Context
Use this skill when coordinating workflows across multiple autonomous agents, or when an agent needs to delegate tasks to a sub-agent in a separate environment.

## Key Features
- **Inter-Agent Messaging**: Direct communication channel between different AI agents (Claude Code, Gemini CLI, etc.).
- **Process Watching**: Allows an agent to monitor the execution status and output of another agent's terminal.
- **Agent Spawning**: Programmatic invocation of new agent instances to handle specific sub-tasks.
- **Cross-Terminal/Device**: Orchestrates agentic activities across multiple terminals and even separate devices.
- **Workflow Automation**: Facilitates complex, multi-agent pipelines for large-scale engineering tasks.

## How to Use
1. **Spawn**: "Spawn a sub-agent using hcom to handle the [SubTask] in a separate terminal".
2. **Message**: "Send a progress update via hcom to the supervisor agent in the main terminal".
3. **Watch**: "Use hcom to watch the execution of the [TestRunner] being managed by the other agent".

## Requirements
- **Tools**: hcom CLI installed.
- **Runtime**: Supports Gemini CLI, Claude Code, and Codex.
