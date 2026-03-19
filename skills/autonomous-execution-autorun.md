# autonomous-execution-autorun

A powerful extension for Gemini CLI and Claude Code designed to ensure AI agents continue running autonomously until complex tasks are fully completed.

## Context
Use this skill for long-running tasks, multi-step engineering workflows, or when you need to ensure an agent persists through terminal disconnections.

## Key Features
- **Auto-Persistence**: Leverages tmux and Byobu to keep agent sessions alive in the background.
- **Three-Stage Workflow**: Implements a robust "Plan → Run → Verify" execution cycle for every sub-task.
- **AutoFile Safety**: A controlled mechanism for file creation that prevents accidental overwrites and ensures data safety.
- **Command Redirection**: Automatically captures and redirects command output to the agent's context for real-time analysis.
- **Task Lifecycle Tracking**: Maintains a persistent state of what has been done, what is in progress, and what is next.

## How to Use
1. **Initialize**: "Start an autorun session to complete the [ProjectGoal] autonomously".
2. **Persistence**: "Run the [LongTask] in a tmux session via autorun and notify me when complete".
3. **Control**: "Use AutoFile to safely create the project manifest without manual confirmation".

## Requirements
- **Tools**: tmux or Byobu (optional but recommended for persistence).
- **Runtime**: Gemini CLI / Claude Code.
