# refactor-automation-assistant

A Gemini CLI extension focused on automating code refactoring tasks, providing suggestions for architectural improvements and executing large-scale code moves.

## Context
Use this skill when performing structural changes to a codebase, extracting modules, or applying pattern-based refactorings across multiple files.

## Key Features
- **Refactoring Suggestions**: Analyzes code to suggest improvements based on SOLID principles and clean code practices.
- **Automated Extraction**: Primitives for extracting functions, classes, or modules with automated dependency handling.
- **Structural Cleanup**: Tools for removing dead code, optimizing imports, and standardizing file structures.
- **Pattern Matching**: Applies large-scale refactorings across the codebase based on user-defined or agentic patterns.
- **Verification Hook**: Integrates with testing tools to ensure refactorings maintain functional parity.

## How to Use
1. **Suggest**: "Analyze the [ModulePath] and suggest 3 ways to improve its internal architecture".
2. **Extract**: "Extract the [Functionality] from [SourceFile] into a new module in [TargetDir]".
3. **Clean**: "Perform a global structural cleanup of the [WorkSpace] following [StyleGuide] standards".

## Requirements
- **Runtime**: Gemini CLI.
- **Integration**: Best used in conjunction with automated testing and linting tools.
