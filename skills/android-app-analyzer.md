# android-app-analyzer

A technical reverse-engineering skill for analyzing Android APK/XAPK packages, extracting metadata, and identifying background behaviors.

## Context
Use this skill for Android security audits, competitive analysis, or understanding the internal structure and behaviors of Android applications.

## Key Features
- **APK/XAPK Inspection**: Deep inspection of Android package files without installation.
- **Manifest Extraction**: Extracts and analyzes `AndroidManifest.xml` for permissions, activities, and services.
- **Behavior Identification**: Identifies potential background behaviors, trackers, and monetization SDKs.
- **Technical Reporting**: Generates structured reports on the app's internal capabilities and dependencies.
- **Cross-Agent Support**: Compatible with Antigravity, Gemini CLI, Claude Code, and Codex.

## How to Use
1. **Analyze**: "Analyze the provided APK file and list all requested permissions".
2. **Audit**: "Identify any monetization SDKs or third-party trackers in the [AppID] package".
3. **Inspect**: "Extract the manifest metadata from the [AppPath] XAPK".

## Requirements
- **Frameworks**: Requires Python dependencies for APK analysis.
- **Runtime**: Works as a local skill or MCP server.
