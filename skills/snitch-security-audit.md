# snitch-security-audit

A cross-platform security audit plugin for AI coding agents to detect vulnerabilities and compliance issues.

## Context
Use this skill to perform automated security scans of your codebase, focusing on application security and infrastructure misconfigurations.

## Key Features
- **Vulnerability Scanning**: Detects common security flaws (OWASP Top 10, etc.).
- **Infrastructure Audit**: Checks for misconfigured cloud resources or sensitive data leaks.
- **Cross-Agent Support**: Compatible with Antigravity, Gemini CLI, Claude Code, and Cursor.
- **Interactive Reports**: Provides actionable remediation steps after each scan.

## How to Use
1. **Scan**: "Run a Snitch security audit on the current project".
2. **Remediate**: "Explain how to fix the high-criticality vulnerabilities found by Snitch".
3. **Continuous**: Integrate Snitch into the agent's verification phase for all PRs.

## Requirements
- **Runtime**: Node.js/NPM.
- **Platform**: Works across multiple AI coding environments.
