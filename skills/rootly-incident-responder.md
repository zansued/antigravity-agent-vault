# rootly-incident-responder

An official MCP server for Rootly integration, providing comprehensive tools for incident management, on-call health, and automated response.

## Context
Use this skill to manage the full lifecycle of a technical incident, from declaration to handoff summary, directly within your agentic workflow.

## Key Features
- **Incident Lifecycle Management**: Tools for declaring, updating, and resolving incidents in Rootly.
- **On-Call Health Integration**: Review on-call shifts, metrics, and handoff summaries.
- **Incident Responder Agent**: Specialized logic for guiding responders through established playbooks.
- **Rootly CLI Integration**: Seamless bridge between the Rootly platform and AI assistants.
- **Shift Metrics**: Analyze team health via on-call shift data and incident volume.

## How to Use
1. **Declare**: "Declare a new [Severity] incident for the [ServiceName] service in Rootly".
2. **Summarize**: "Generate an on-call handoff summary for the last 24 hours".
3. **Monitor**: "Show me the current on-call responder for the [Product] team".

## Requirements
- **API**: Requires a Rootly API Token with appropriate permissions.
- **Tools**: Rootly CLI (optional but recommended for full transport).
