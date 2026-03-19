# kkachi-greedy-loop

A portable Top-1 greedy loop engine for coding agents to improve task selection and execution reliability.

## Context
Use this skill when you need a more rigorous decision-making loop for your agent, focusing on greedy selection of the best next action based on score.

## Key Features
- **Scoring Policy**: Evaluates potential actions based on a configurable weighted scoring policy.
- **Built-in Modes**: Includes `rank`, `select`, `apply`, `loop`, and `explain` for task management.
- **Greedy Engine**: Prioritizes the most promising path to minimize context drift.
- **Agent Compatibility**: Plugs into Gemini CLI, Claude Code, and Codex.

## How to Use
1. **Selection**: "Use Kkachi to rank the next 3 potential debugging steps".
2. **Loop**: "Execute the task loop until the success condition is met".
3. **Explain**: "Explain the scoring rationale for the selected action".

## Requirements
- **Runtime**: Python 3.9+ for the core engine.
- **Env**: Gemini CLI extension enabled.
