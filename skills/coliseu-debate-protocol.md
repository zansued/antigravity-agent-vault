# coliseu-debate-protocol

## Overview
Logic for the `/coliseu` command. Initiates an "Exponential Debate" between up to 20 specialized sub-agents to solve complex logic puzzles or architectural dilemmas.

## Debate Flow
1. **The Arena**: Define the Problem Statement.
2. **The Swarm**: Spawn specialized sub-agents (Architect, Security, Performance, UX).
3. **Cross-Examination**: Agents critique each other's proposals using the **Blunder Hunt** pattern.
4. **Synthesis**: The primary agent (Metatron) distills the debate into a single "Golden Solution".

## How to Use
- **Command**: `/coliseu "Problem description"`
- **Parameters**: `agents: 20`, `rigor: extreme`.

## Integration
- **Flywheel Core**: Uses the `Agent Mail` protocol for inter-agent communication.
- **SQUAD Orchestrator**: Manages the lifecycle of the sub-agents.
