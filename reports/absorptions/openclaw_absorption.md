# ABSORPTION_REPORT: OpenClaw

## Analysis Date: 2026-03-14
## Target: https://github.com/openclaw/openclaw

### 🏗️ Architecture
OpenClaw is a personal AI assistant framework designed to run locally or on controlled infrastructure. It features a highly modular, multi-channel communication architecture built with Node.js and TypeScript.

- **Gateway Control Plane:** The central orchestrator (`src/gateway`) that manages sessions, channels, and agent execution.
- **Omni-channel Integration:** Native support for over 20 channels (WhatsApp, Telegram, Slack, etc.), allowing the assistant to reside where the user already communicates.
- **Local-First & Fast:** Optimized for single-user scenarios with a focus on speed and "always-on" availability.
- **Canvas & Visuals:** Features a live Canvas for rendering visual outputs controlled by the assistant.
- **Wizard Onboarding:** A comprehensive CLI wizard for automated setup of workspace, channels, and skills.

### 🔑 Key Components
- **Gateway (`src/gateway`):** The core control plane.
- **Agent Service (`src/agent`):** Handles the logic of the AI assistant and model interaction.
- **Channel Layer (`src/channels`):** Abstracts the complexities of different messaging platforms.
- **Security & Audit (`src/security`):** Robust auditing and policy enforcement for tool usage and data access.
- **TTS/Vocal Domain (`src/tts`):** Integrated speech synthesis and listening capabilities.

### 🚀 Extracted Skills
- **Omni-channel Architect:** Designing assistants that bridge multiple messaging ecosystems.
- **Local AI Specialist:** Deploying and optimizing LLM-based systems on private infrastructure.
- **Multi-modal Interaction Expert:** Combining text, voice, and visual Canvas for rich UX.

### 🛠️ Entry Points
- `openclaw onboard`: The recommended setup and onboarding tool.
- `openclaw gateway`: Starts the control plane daemon.
- `openclaw agent`: Programmatic entry point for interacting with the assistant.

### ⚠️ Risks & Bottlenecks
- **Integration Maintenance:** Keeping 20+ channel integrations working requires constant updates to match third-party API changes.
- **Dependency Heavy:** Large number of packages and runtime requirements (Node >= 22).
- **Setup Complexity:** Despite the wizard, configuring multiple private channels (like iMessage or Signal) can be challenging.
