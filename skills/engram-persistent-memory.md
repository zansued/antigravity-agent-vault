# engram-persistent-memory

A specialized Gemini CLI extension that provides long-term persistent memory by integrating with Engram, allowing agents to recall context and history across multiple sessions.

## Context
Use this skill when you need to maintain continuity between independent agent executions, store long-term task state, or recall previous architectural decisions across sessions.

## Key Features
- **Long-Term Persistence**: Stores session snapshots and context in an "engram" for later retrieval.
- **Context Recall**: Primitives for searching and loading previous engrams into the current agent's working memory.
- **Session Linking**: Automatically links related agent sessions via persistent memory identifiers.
- **Privacy Controls**: Mechanisms to manage what information is stored in the persistent memory layer.
- **Agentic Continuity**: Enables the agent to "remember" previous interactions and user preferences.

## How to Use
1. **Save**: "Save the current session state to an engram titled '[SessionName]' for future recall".
2. **Load**: "Recall the engram [EngramID] and integrate its context into our current task".
3. **Search**: "Search my persistent memory for previous discussions about [Topic]".

## Requirements
- **Tools**: Engram system installed or configured.
- **Runtime**: Gemini CLI + Engram Extension.
