# gemini-code-review-agent

An automated code review system leveraging specialized Gemini agents to provide rigorous analysis, confidence scoring, and detailed reports.

## Context
Use this skill to perform deep code reviews, identify security vulnerabilities, and ensure adherence to project standards during the implementation phase.

## Key Features
- **Confidence Scoring**: Assigns confidence levels to identified issues to help prioritize fixes.
- **Detailed Reporting**: Generates comprehensive review reports (stored in `/tmp/` and summarized in terminal).
- **Sub-Agent Methodology**: Distributes review tasks across specialized sub-agents for better depth.
- **Ignore List Support**: Configurable ignore patterns to skip boilerplate or third-party code.
- **Architecture Aware**: Understands project architecture to provide contextually relevant feedback.

## How to Use
1. **Review**: "/review Perform a full code review of the current changes in the [ModuleName]".
2. **Report**: "Generate a detailed PDF review report for the [FeatureBranch]".
3. **Analyze**: "Apply confidence scoring to the latest set of review findings".

## Requirements
- **Runtime**: Gemini CLI.
- **Infrastructure**: Access to Gemini API for agent execution.
