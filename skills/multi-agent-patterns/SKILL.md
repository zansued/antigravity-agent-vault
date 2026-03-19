---
name: multi-agent-patterns
description: Core architecture for coordinating multiple agents, supervisor patterns, and context isolation for Horizon 7.
---

# Multi-Agent Architecture Patterns

Multi-agent architectures distribute work across multiple language model instances, each with its own context window. When designed well, this distribution enables capabilities beyond single-agent limits.

## When to Activate

Activate this skill when:
- Single-agent context limits constrain task complexity
- Tasks decompose naturally into parallel subtasks
- Different subtasks require different tool sets or system prompts
- Designing production agent systems with multiple specialized components

## Core Patterns

### 1. Supervisor/Orchestrator
A central agent decomposes user objectives into subtasks and routes them to specialized workers.
- **Pattern**: User -> Supervisor -> [Workers] -> Supervisor -> Final Output

### 2. Swarm (Peer-to-Peer)
Agents communicate directly and transfer control via explicit handoffs.
- **Pattern**: Agent A -> (Handoff) -> Agent B

### 3. Hierarchical
Layers of abstraction: Strategic -> Planning -> Execution.

## Design Principles
- **Context Isolation**: Sub-agents exist to partition context, not just for roleplay.
- **Avoid the Telephone Game**: Allow sub-agents to pass final responses directly to the user when appropriate.
- **Consensus**: Use debate protocols or weighted voting for critical decisions.

---
**Vault Integration**: Part of Metatron Horizon 7 Absorption.
