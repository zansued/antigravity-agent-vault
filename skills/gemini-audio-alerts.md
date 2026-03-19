# gemini-audio-alerts

A Gemini CLI extension providing audio notifications and Text-to-Speech (TTS) alerts for agentic events.

## Context
Use this skill when you want audible feedback for task completion, errors, or long-running process status updates.

## Key Features
- **Sound Themes**: Multiple predefined themes (retro, portal, hero, premium).
- **TTS Notifications**: Converts agent messages or status updates into spoken audio.
- **Customizable Alerts**: Configurable triggers for specific events (Success, Failure, Step Done).
- **Theme Selection**: Managed via `.env` configuration.

## How to Use
1. **Config**: Set `THEME=portal` in your `.env`.
2. **Launch**: Extension automatically hooks into Gemini CLI events.
3. **Mute**: "Disable audio alerts for the current session".

## Requirements
- **Runtime**: Environment must support audio playback.
- **System**: Enabled OS notifications.
