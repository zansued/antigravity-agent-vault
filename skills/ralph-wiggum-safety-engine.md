# ralph-wiggum-safety-engine

A specialized safety and reliability extension for AI agents, providing "ghost protection" and completion guarantees for autonomous task execution.

## Context
Use this skill when running high-risk autonomous tasks or when you need absolute certainty that a task has reached a verifiable completion state.

## Key Features
- **Ghost Protection**: Prevents "phantom" executions and ensures the agent's actions are tracked and verified.
- **Completion Promises**: Implements a strict protocol where tasks must meet specific "completion criteria" before being marked done.
- **Safety Hatches**: Configurable thresholds to halt execution if the agent's behavior deviates from the plan.
- **Self-Correction Loops**: Encourages the agent to identify and fix its own errors during the execution cycle.
- **Verification Primitives**: Tools to programmatically check the state of the system against the intended goal.

## How to Use
1. **Execute**: "Run the [DeploymentTask] with Ralph Wiggum safety enabled and set completion criteria to [Criteria]".
2. **Verify**: "Use the safety engine to verify that the [Update] was applied correctly without side effects".
3. **Guard**: "Set a safety hatch for the current session to abort if [Condition] occurs".

## Requirements
- **Runtime**: Gemini CLI / JS-based agent environments.
- **Integration**: Works as a reliability layer on top of standard command execution.
