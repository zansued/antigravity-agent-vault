# sonarqube-quality-bridge

An official MCP server implementation for SonarQube, providing agents with deep access to code quality metrics, security hotspots, and quality gate status.

## Context
Use this skill to integrate SonarQube's rigorous static analysis and quality tracking into your agentic development workflow.

## Key Features
- **Deep Code Analysis**: Access to SonarQube's extensive rule set for identifying bugs, smells, and vulnerabilities.
- **Quality Gate Monitoring**: Retrieve the current status of quality gates for any project.
- **Security Hotspots**: Tools for reviewing and managing security-sensitive code sections.
- **Coverage & Metrics**: Access to unit test coverage, technical debt, and other project health metrics.
- **Context Augmentation**: Enhances agent understanding with SonarQube's findings for more precise code generation and refactoring.

## How to Use
1. **Check Status**: "Get the SonarQube quality gate status for project [ProjectID]".
2. **Review Hotspots**: "List all open security hotspots in the [FeatureBranch]".
3. **Analyze Metrics**: "Summarize the technical debt and test coverage for the [ProjectName]".

## Requirements
- **API**: Requires a SonarQube User Token and Server URL.
- **Runtime**: Node.js/Docker (for MCP server).
