# ephemeral-runtime

## Overview
Implements the **Fresh Context Loop** to ensure maximum fidelity and 0% hallucinations. The agent context is reset for every discrete subtask.

## Core Protocols
1. **Fresh Context Loop**: 
    - Before a subtask: Wipe existing L1/L2 cache.
    - Seed Context: Inject only the specific **Beads** (Relevant Context Fragments) and the **PRDFragment**.
    - Execute: Perform task in a "virgin" context.
2. **Bead Management**:
    - Use `conductor-beads` to retrieve only the necessary "atoms" of knowledge.
    - Avoid "Ghost Context" from previous unrelated turns.

## How to Use
- **Reset**: "Initiate ephemeral restart for subtask [SubtaskID]".
- **Seed**: "Fetch Beads for [ComponentPath] and inject into current runtime".

## Integration
- **TEPMS HiCache**: Orchestrates the clearing of L1/L2 buffers.
- **Ralph Engine**: Guarantees that the reset happens between verified completion states.
