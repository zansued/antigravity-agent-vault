# agent-output-humanizer

A stylistic extension/skill for Gemini CLI that "humanizes" the agent's output to improve engagement and match specific conversational tones.

## Context
Use this skill when you need the agent's responses to feel more natural, empathetic, or aligned with a specific user-defined "personality".

## Key Features
- **Style Transformation**: Rewrites technical or robotic outputs into more conversational and human-like text.
- **Tone Adjustment**: Can be configured for various tones (e.g., friendly, professional, enthusiastic).
- **Engagement Optimization**: Focuses on making interaction feel more like a collaboration than a command-response loop.
- **Slash Command Integration**: Quickly humanize the last response or a specific block of text.

## How to Use
1. **Humanize**: "/humanize the latest report to make it more accessible for stakeholders".
2. **Transform**: "Rewrite the technical explanation of [Feature] in a friendly, conversational tone".
3. **Style**: "Apply the [PersonaName] style to the subsequent conversation turns".

## Requirements
- **Runtime**: Gemini CLI.
- **Integration**: Works as either a slash command or an autonomous post-processing skill.
