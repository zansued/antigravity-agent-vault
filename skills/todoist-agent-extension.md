# todoist-agent-extension

A feature-rich Todoist extension providing natural language task management, slash commands, and multi-platform synchronization for AI agents.

## Context
Use this skill to manage personal or project tasks within Todoist, leveraging natural language for rapid task creation and organization.

## Key Features
- **Natural Language Support**: Create tasks using intuitive phrases like "Remind me to [Task] every Friday".
- **Slash Commands**: Rapid access to Todoist features via CLI-style slash commands.
- **Project Organization**: Support for managing projects, sections, labels, and task priorities.
- **Auto-Update**: Built-in support for extension updates and version management.
- **Multi-Platform**: Verified on Windows (PowerShell/CMD), macOS (Zsh/Bash), and Linux.

## How to Use
1. **Create**: "/todoist add [TaskName] #Projectname !!1 (Priority 1)".
2. **List**: "Show me all overdue tasks in the [ProjectName] project".
3. **Organize**: "Move all tasks with the [Label] to the [TargetProject]".

## Requirements
- **API**: Requires a Todoist API Token.
- **Runtime**: Gemini CLI.
