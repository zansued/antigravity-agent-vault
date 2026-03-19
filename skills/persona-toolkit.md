# persona-toolkit

A developer-friendly toolkit for managing, deploying, and switching between LLM personas and skills across different environments.

## Context
Use this skill when you need to maintain consistent agent identities, specific expert personas, or modular skill sets across multiple projects and AI clients.

## Key Features
- **Persona Management**: Create and version specialized LLM personas (e.g., "Senior Architect", "Security Auditor").
- **Modular Skills**: Deploy and manage skills independently of the core agent.
- **Multi-Client Support**: Seamlessly integrates with Gemini CLI, Cline, and VS Code.
- **Rapid Initialization**: Quickly bootstrap a persona with all required context and tools.

## How to Use
1. **Init**: `persona init [persona_name]` to setup a new identity.
2. **Deploy**: "Deploy the 'Security Expert' persona with full audit skills".
3. **Switch**: "Switch the current agent persona to 'UI/UX Specialist'".

## Requirements
- **Runtime**: CLI tool or Python library.
- **Platform**: Multi-platform integration (Gemini, Cline, etc.).
