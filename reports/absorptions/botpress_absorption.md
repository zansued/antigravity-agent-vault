# ABSORPTION_REPORT: Botpress Cloud

## Analysis Date: 2026-03-14
## Target: https://github.com/botpress/botpress

### 🏗️ Architecture
Botpress Cloud is a modern monorepo platform for building AI assistants. It features a highly modular architecture designed for extensibility through integrations, interfaces, and plugins.

- **Monorepo Structure:** Managed with Turbo and PNPM, containing SDKs, CLIs, and hundreds of integrations.
- **SDK-First Approach:** Everything in the platform is built on top of the `@botpress/sdk`, allowing for "bot as code" development.
- **Integration Layer:** A vast library of connectors (WhatsApp, Slack, Telegram, etc.) that abstract channel-specific logic.
- **AI-Native:** Designed to work seamlessly with LLMs, featuring built-in support for advanced RAG and cognitive tasks.

### 🔑 Key Components
- **SDK (`packages/sdk`):** The core framework for defining bots, integrations, and plugins.
- **CLI (`packages/cli`):** The tool for building, deploying, and managing Botpress resources.
- **Client (`packages/client`):** Type-safe API client for interacting with the Botpress Cloud backend.
- **Integrations (`integrations/`):** Implementation of third-party service connectors.
- **Interfaces (`interfaces/`):** Standardized schemas for common bot capabilities (e.g., `creatable`, `deletable`, `speech-to-text`).

### 🚀 Extracted Skills
- **Conversational Architect:** Designing complex, multi-channel AI assistants.
- **Integration Engineer:** Building custom bridges between AI agents and external services.
- **Bot-as-Code Specialist:** Using programmatic SDKs to version control and automate assistant deployment.

### 🛠️ Entry Points
- `@botpress/cli`: Main tool for developer interaction.
- `BotDefinition`: Entry point for defining a new assistant.
- `IntegrationDefinition`: Entry point for creating new service connectors.

### ⚠️ Risks & Bottlenecks
- **Cloud Dependency:** Highly optimized for the Botpress Cloud infrastructure, which may limit self-hosting flexibility compared to v12.
- **Monorepo Complexity:** The sheer scale of the repository (hundreds of packages) requires robust tooling (Turbo/PNPM) to manage.
- **Version Sincronization:** Keeping the CLI, SDK, and integrations in sync across a fast-moving monorepo.
