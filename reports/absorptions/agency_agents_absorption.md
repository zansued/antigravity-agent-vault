# ABSORPTION_REPORT: Agency Agents

## Analysis Date: 2026-03-14
## Target: https://github.com/msitarzewski/agency-agents

### 🏗️ Architecture
Agency Agents is a comprehensive framework and collection of specialized AI agent personalities designed for autonomous or semi-autonomous execution of complex workflows. It focuses on modular, role-based intelligence across multiple domains.

- **Role-Based Specialization:** Dozens of meticulously crafted personas (Engineering, Design, Marketing, PM, QA) with unique identities, missions, and decision logic.
- **Autonomous Pipelines:** Featured orchestration logic (e.g., `AgentsOrchestrator`) that manages full development cycles from specification to production.
- **Quality-Centric Workflow:** Implements continuous "Dev-QA" loops, requiring evidence-based validation (like screenshots or code analysis) before advancing tasks.
- **Multi-Tool Integration:** Native support and conversion scripts for leading AI coding tools (Claude Code, Cursor, Aider, Gemini CLI).

### 🔑 Key Components
- **Engineering Division:** Specialists for Backend, Frontend, AI, Security, and more.
- **Design & UX:** Architects for UX, UI, Brand Guardians, and Storytellers.
- **Orchestration Layer:** Logic for spawning, handoffs, and state management between agents.
- **Strategy & Playbooks:** Standardized "Runbooks" for scenarios like Incident Response or MVP development.
- **Testing & QA:** Dedicated agents for reality checking, API testing, and evidence collection.

### 🚀 Extracted Skills
- **Multi-Agent Orchestrator:** Coordinating specialist teams for end-to-end project delivery.
- **Persona Architect:** Designing high-fidelity AI roles with specific behavioral constraints and expertise.
- **Quality Gate Engineer:** Implementing rigorous validation loops within autonomous agentic workflows.

### 🛠️ Entry Points
- `specialized/agents-orchestrator.md`: The brain for autonomous pipeline management.
- `scripts/install.sh`: Interactive tool for deploying agents across different platforms.
- `integrations/`: Pre-configured environments for seamless tool adoption.

### ⚠️ Risks & Bottlenecks
- **Context Overhead:** Managing multiple specialized agents in a single session can quickly exhaust LLM context windows.
- **Handoff Friction:** Misaligned instructions during agent-to-agent transitions can lead to task failure.
- **Verification Dependency:** The quality of the output is strictly tied to the rigor of the QA/Evidence agents.
