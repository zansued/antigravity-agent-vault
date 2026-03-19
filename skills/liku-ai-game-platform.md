# liku-ai-game-platform

An AI-enhanced terminal game platform designed specifically for AI agents to interact with games via WebSockets and persistent state files.

## Context
Use this skill to enable your agent to play and analyze terminal-based games, leveraging the platform's state tracking and communication hooks.

## Key Features
- **AI-First Design**: Built with specific headers and state management for autonomous agent interaction.
- **Real-Time Communication**: Uses WebSockets for low-latency game state updates and command execution.
- **State File Tracking**: Maintains a persistent state file (`state.json`) for agent reference and reasoning.
- **Chess Engine**: Includes a native chess engine with self-play and training modes.
- **Extensible Games**: Support for adding new terminal-based games to the platform.

## How to Use
1. **Connect**: "Establish a WebSocket connection to the Liku-AI game platform".
2. **Play**: "Analyze the current Chess state and execute the best move for the white pieces".
3. **Monitor**: "Watch the state file for updates during the autonomy cycle".

## Requirements
- **Tools**: Node.js/NPM + WebBrowser/Terminal.
- **Runtime**: Agent-compatible environment with WebSocket support.
