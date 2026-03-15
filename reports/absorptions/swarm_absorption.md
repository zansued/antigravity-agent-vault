# ABSORPTION_REPORT: OpenAI Swarm

## Analysis Date: 2026-03-14
## Target: https://github.com/openai/swarm

### 🏗️ Architecture
Swarm is an experimental, educational framework created by OpenAI to demonstrate lightweight, highly controllable multi-agent orchestration. Unlike complex frameworks like LangGraph or AutoGen, Swarm focuses entirely on simplicity and state statelessness.

- **Stateless Execution:** Runs entirely on the client side without storing state between calls, similar to the raw Chat Completions API. It passes the full context back and forth.
- **Two Primitive Abstractions:** Built on just two core concepts: `Agent` (which holds instructions and tools) and `Handoff` (the mechanism by which one agent transfers control of the conversation to another).
- **Function-Driven Routing:** Handoffs are implemented simply as Python functions that return another `Agent` object.
- **Context Variables:** Provides a clean way to pass state (like user IDs or session data) between agents without cluttering the main conversation history.

### 🔑 Key Components
- **`Swarm` Client (`swarm/core.py`):** The main orchestrator loop. It manages the Chat Completions API calls, tool executions, and state transitions when an agent hands off to another.
- **`Agent` Class (`swarm/types.py`):** A simple Pydantic model defining an agent's `name`, `instructions` (can be dynamic via a callable), `model`, and `functions`.
- **`Result` Class:** Encapsulates the return values of tool calls, allowing functions to return strings, context updates, or a new `Agent` for handoff.

### 🚀 Extracted Skills
- **Lightweight Orchestrator:** Building multi-agent systems without the overhead of heavy frameworks, focusing on pure function calling.
- **Handoff Architect:** Designing seamless transitions between specialized agents (e.g., from a Triage Agent to a specific Support Agent).
- **Stateless AI Engineer:** Managing conversation history and context variables efficiently across multiple LLM calls.

### 🛠️ Entry Points
- `swarm.Swarm`: The primary client class to instantiate.
- `client.run()`: The main loop execution method.

### ⚠️ Risks & Bottlenecks
- **Context Window Limits:** Because it is stateless, the entire conversation history must be passed with every call, which can quickly exhaust the model's context window in long sessions.
- **Educational Focus:** Explicitly marked by OpenAI as not for production use (superseded by their Agents SDK), meaning it lacks built-in persistence, advanced error recovery, or complex graph-based routing.
- **Lack of Memory:** No built-in vector store or long-term memory retrieval mechanisms.
