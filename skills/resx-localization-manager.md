# resx-localization-manager

A specialized tool for managing .resx localization files, facilitating easy editing, synchronization, and management of translation resources for developers.

## Context
Use this skill when you need to manage multi-language support in your projects, update translation keys, or synchronize localization files across your codebase.

## Key Features
- **Resource Management**: Tools for adding, editing, and deleting keys in .resx files.
- **Localization Sync**: Synchronizes translation values across multiple project resource files.
- **Gemini CLI Integration**: Direct management of localization resources via agentic terminal commands.
- **Error Detection**: Identifies missing translation keys or duplicate resource entries.

## How to Use
1. **Update**: "Add a new localization key '[KeyName]' with value '[TranslationValue]' to [FilePath].resx".
2. **Sync**: "Synchronize all language variations of the [ResourceFile] to ensure consistency".
3. **Audit**: "List all untranslated keys in the project's localization directory".

## Requirements
- **Runtime**: Gemini CLI.
- **Format**: Supports standard .resx (XML-based) resource files.
