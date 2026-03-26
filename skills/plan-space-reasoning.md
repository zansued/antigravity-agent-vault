# Skill: Plan-Space Reasoning (Flywheel Pattern)

## Overview
Implements the "Plan Space" methodology from Flywheel Core. Instead of linear instruction following, the agent navigates a multi-dimensional space of possible plans ("Beads").

## Implementation
1. **Bead Extraction**: Break down the USER_REQUEST into atomic, executable "Beads".
2. **Pathfinding**: Use A* search logic to find the most efficient path through the Plan Space.
3. **Execution Beads**: Run each bead as an isolated, ephemeral runtime.

## Core Keywords
- **Plan Space**: The set of all valid paths to the goal.
- **Bead**: An atomic unit of state + action.
- **Flywheel**: The continuous optimization loop.
