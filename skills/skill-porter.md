# skill-porter

Automated conversion and porting of skills between Claude (Claude Code) and Gemini (Gemini CLI) platforms.

## Context
Use this skill when you need to use a Claude-style skill in a Gemini environment or vice-versa. It handles the structural translation between these two formats.

## Key Features
- **Claude -> Gemini**: Converts Claude skill definitions to Gemini extensions.
- **Gemini -> Claude**: Ports Gemini extensions back to Claude skill format.
- **Validation**: Ensures the converted skills are valid and functionally equivalent.
- **Universal Skill Support**: Can be used as a CLI tool or integrated as a universal extension.

## How to Use
1. **CLI**: Run `skill-porter convert <source> --to <target>`.
2. **Extension**: Add `skill-porter` to your config to enable on-the-fly conversion of local skills.

## Requirements
- **Runtime**: Node.js/Python as specified in the repo.
