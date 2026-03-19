# auditor-addon

A multi-tool extension for comprehensive code auditing and metrics analysis.

## Context
Use this skill when you need to perform deep code audits, analyze complexity metrics, or investigate call chains in a codebase.

## Tools
- **peek**: Quick inspection of code blocks or files.
- **metrics**: Calculate complexity, SLOC, and other code metrics.
- **diff_metrics**: Analyze the impact of changes on code metrics between commits.
- **diff**: Enhanced diff analysis for auditing purposes.
- **call_chains**: Trace function call hierarchies and dependencies.

## How to Use
1. **Audit**: Start with `metrics` to identify high-complexity areas.
2. **Chain**: Use `call_chains` to understand how a specific component is invoked.
3. **Diff**: Use `diff_metrics` during PR reviews to ensure no regression in code quality.

## Requirements
- **Platform**: Compatible with Claude Code and Gemini CLI.
