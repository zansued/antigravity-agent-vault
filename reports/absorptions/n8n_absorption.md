# ABSORPTION_REPORT: n8n

## Analysis Date: 2026-03-14
## Target: https://github.com/n8n-io/n8n

### 🏗️ Architecture
n8n is a powerful workflow automation platform that combines a visual node-based interface with the flexibility of code (JavaScript/Python). It is designed as a modular monorepo using TypeScript.

- **Monorepo Structure:** Managed with Turbo, containing specialized packages for workflow logic (`@n8n/workflow`), core execution (`@n8n/core`), and UI (`frontend`).
- **Node-Based Execution:** Each automation is a directed graph of nodes. The execution engine handles data passing and state management between nodes.
- **Extensible Integrations:** Features over 400+ native integrations (nodes) and support for custom community nodes.
- **AI-Native Capabilities:** Deep integration with LangChain, allowing for the construction of complex AI agent workflows directly within the visual editor.

### 🔑 Key Components
- **Workflow Engine (`packages/workflow`):** The brain that defines how data flows through the automation.
- **Execution Engine (`packages/core/src/execution-engine`):** Manages the actual running of workflows and node logic.
- **Nodes Base (`packages/nodes-base`):** The primary library containing all native integrations.
- **CLI (`packages/cli`):** The main entry point for running and managing n8n instances.
- **AI/LLM Support (`packages/@n8n/ai-node-sdk`):** Specialized tools for building agentic workflows.

### 🚀 Extracted Skills
- **Workflow Automator:** Designing complex data pipelines and business processes.
- **Node Developer:** Creating custom integrations and extending automation capabilities.
- **AI Agent Orchestrator:** Using n8n as a visual control plane for multi-agent systems.

### 🛠️ Entry Points
- `npx n8n`: Fast start command.
- `packages/cli/bin/n8n`: Main CLI entry point.
- `packages/core/src/index.ts`: Programmatic core API.

### ⚠️ Risks & Bottlenecks
- **Resource Intensive:** Running many concurrent workflows can require significant CPU/Memory.
- **Database Performance:** Heavy logging of execution history can impact database performance if not managed.
- **Fair-Code License:** Specific usage restrictions compared to pure MIT licenses.
