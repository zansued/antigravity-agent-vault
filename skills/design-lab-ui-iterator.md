# design-lab-ui-iterator

A rapid UI design iteration extension for Gemini CLI, enabling agents to build, preview, and refine frontend interfaces using natural language prompts.

## Context
Use this skill when you need to prototype web interfaces, iterate on component designs, or quickly generate UI layouts across various frameworks and styling systems.

## Key Features
- **Rapid Iteration Sessions**: Specialized commands to start design sessions and maintain state during multiple refinement passes.
- **Framework Support**: Compatible with popular web frameworks (React, Vue, etc.) and styling libraries like Tailwind CSS.
- **Temporary Previewing**: Automatically creates temporary files for quick visualization of design changes.
- **Permanent Export**: Methods for manifesting finalized designs into the project's permanent directory structure.
- **Automated Cleanup**: Internal mechanisms to manage the lifecycle of temporary design artifacts.

## How to Use
1. **Start**: "Start a Design Lab session to create a [ComponentName] using [Framework] and [Styles]".
2. **Iterate**: "Refine the current design by adding a [Feature] and changing the color scheme to [Colors]".
3. **Save**: "Finalize the design and save it to the [TargetDirectory] with all dependencies".

## Requirements
- **Runtime**: Gemini CLI.
- **Tools**: Compatible with modern web development stacks.
