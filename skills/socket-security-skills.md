# socket-security-skills

A security-focused extension suite for coding agents, providing native interaction with the Socket platform for dependency risk and vulnerability assessment.

## Context
Use this skill when you need to audit project dependencies, check for known vulnerabilities, or assess the overall security posture of a codebase using Socket's intelligence.

## Key Features
- **Dependency Risk Assessment**: Analyze the risks associated with third-party packages in real-time.
- **Vulnerability Detection**: Identifies known CVEs and security flaws within the dependency tree.
- **Agent Integration**: Standardized skills for Claude Code, Gemini CLI, Cursor, and other MCP-compatible agents.
- **Security Scanning**: Automated scanning of project manifests (package.json, etc.) for supply chain threats.

## How to Use
1. **Audit**: "Run a Socket security audit on the current project's dependencies".
2. **Scan**: "Scan the [PackageName] for potential security risks before installation".
3. **Report**: "Generate a summary of high-risk dependencies found in the [Branch]".

## Requirements
- **API**: Requires a Socket.dev API Key.
- **Runtime**: Gemini CLI or MCP-compliant agent.
