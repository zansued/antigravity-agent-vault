# agent-policies-gemini-cli

An extension for defining, managing, and enforcing operational policies within Gemini CLI agentic workflows.

## Context
Use this skill when you need to ensure agents follow specific guidelines, security protocols, or operational constraints during their execution.

## Key Features
- **Policy Enforcement**: Automatically checks agent actions against defined policies.
- **Configurable Constraints**: easily define limits on file access, network calls, or tool usage.
- **Architectural Integration**: Plugs directly into the Gemini CLI execution loop.

## How to Use
1. **Define**: Create policy files in the specified `.agent/policies` directory.
2. **Launch**: The extension automatically loads policies on agent startup.
3. **Verify**: Check agent logs for policy compliance reports.

## Requirements
- **Runtime**: Node.js/NPM.
- **Environment**: Gemini CLI.
