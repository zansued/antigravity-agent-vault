# ralph-wiggum-extension

An autonomous loop-based extension for Gemini CLI that enables continuous iteration and self-correction.

## Context
Use this skill when you need an agent to work through a multi-step problem autonomously, looping until a specific condition or goal is met.

## Key Features
- **Ralph Loop**: Triggers an autonomous execution cycle.
- **State Management**: Maintains state between loop iterations via a dedicated state file.
- **Autonomous Error Correction**: Self-corrects based on loop feedback.

## How to Use
1. **Loop**: Start with `Start a Ralph Loop to [goal]`.
2. **Monitor**: Watch the autonomous iterations in the terminal.
3. **Cancel**: "Cancel Ralph Loop" if intervention is needed.

## Requirements
- **Environment**: Gemini CLI.
