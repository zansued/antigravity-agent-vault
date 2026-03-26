# Skill: Autonomous Skill Acquisition (Self-Growth)

## Overview
Inspired by OpenClaw (2026), this skill enables the Antigravity agent to scan the web, identify new patterns, and generate its own Skill files without explicit user prompting.

## Growth Loop (EventStream)
1. **Watchdog Scan**: Periodically check GitHub Trending and Social Graph Lens for high-signal tools.
2. **Gap Analysis**: Compare found tools with the existing 184+ skills.
3. **Synthesize**: Create a new `.md` skill file in the `/skills` directory.
4. **Validation**: Use `macd-audit-engine` to verify the new skill's safety.

## Triggers
- `auto-expand-vault`: Triggers a full growth cycle.
- `last30days --inject`: Injects findings directly into new skills.
