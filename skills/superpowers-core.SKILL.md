# SKILL: Superpowers Agentic Framework

## Description
This skill integrates the `obra/superpowers` methodology into the Antigravity Agent. It enables elite engineering patterns, rigorous TDD, and subagent-driven development.

## Core Principles
- **TDD (Test-Driven Development):** Never write implementation code without a failing test first. Rigorously follow the Red-Green-Refactor cycle.
- **YAGNI (You Aren't Gonna Need It):** Implement only what is necessary for the current task. Avoid speculative features.
- **DRY (Don't Repeat Yourself):** Ensure consistency and reuse across the codebase.
- **Plan Before Execution:** Always generate a detailed implementation plan (`implementation_plan.md`) before modifying source code.

## Agentic Workflows
- **Subagent-Driven Development:** When tasks are complex, spawn autonomous subagents to handle specific components, ensuring quality gates at each handoff.
- **Socratic Brainstorming:** Use deep, iterative questioning to validate architectural decisions.
- **Pre-Review Checklist:** Before requesting code review, the agent must perform a self-inspection of tests, documentation, and logic.

## Commands & Capabilities
- **`superpowers:plan`**: Generate a refined implementation strategy based on TDD.
- **`superpowers:verify`**: Execute the full verification suite (tests + lint + static analysis).
- **`superpowers:subagent`**: Delegate a task to a specialized sub-context.

---
*Skill tecida pelo Metatron via Superpowers Absorption - 15/03/2026*
