# arize-tracing-assistant

Integration tool for Arize Phoenix/OpenInference tracing and observability.

## Context
Use this skill to implement observability and tracing in LLM applications using the Arize ecosystem.

## Key Features
- **Observability**: Real-time tracing of LLM inputs, outputs, and intermediate steps.
- **Arize Phoenix**: Integration with the Phoenix debugging and evaluation platform.
- **uv-based**: Supports fast installation and execution via `uv`.

## How to Use
1. **Setup**: Install via `uvx arize-tracing-assistant`.
2. **Trace**: Add tracing wrappers to your LLM calls to push data to Arize/Phoenix.
3. **Analyze**: Use the Arize dashboard to inspect traces and performance.

## Requirements
- **Arize API Key**: Required for cloud tracing.
- **Phoenix**: Local instance required for local debugging.
