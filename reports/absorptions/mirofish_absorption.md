# ABSORPTION_REPORT: MiroFish

## Analysis Date: 2026-03-14
## Target: https://github.com/666ghj/MiroFish

### 🏗️ Architecture
MiroFish is a swarm intelligence engine for future prediction via multi-agent simulation. It constructs parallel digital worlds where intelligent agents evolve based on real-world seed data.

- **Dual-Platform Simulation:** Capable of running simulations in parallel across different social contexts (Twitter, Reddit, etc.).
- **GraphRAG Foundation:** Uses knowledge graphs to manage entity relationships and provide context to agents.
- **Dynamic God View:** Allows users to inject variables and monitor simulation trajectories in real-time.
- **Full-Stack Implementation:** FastAPI backend for agent orchestration and Vue.js frontend for visual simulation control.

### 🔑 Key Components
- **Simulation Engine (`backend/scripts`):** Core logic for parallel, Twitter, and Reddit simulations.
- **API Layer (`backend/app/api`):** Manages simulation state and agent interactions.
- **Frontend Dashboard (`frontend/src`):** Visual interface for monitoring agent evolution.
- **Graph Builder:** Extracts seeds and constructs the memory layer for the swarm.

### 🚀 Extracted Skills
- **Swarm Intelligence Architect:** Designing systems where collective behavior emerges from individual agent interactions.
- **Future Deducer:** Using multi-agent sandboxes to rehearse policy or market outcomes.
- **Digital World Weaver:** Automatically constructing high-fidelity environments from unstructured text data.

### 🛠️ Entry Points
- `backend/run.py`: Starts the simulation API.
- `frontend/`: Interactive dashboard for simulation management.
- `backend/scripts/run_parallel_simulation.py`: Main entry for large-scale social deduction.

### ⚠️ Risks & Bottlenecks
- **Heavy Compute:** Simulating thousands of LLM agents requires massive token and compute resources.
- **Complexity of Emergence:** Predicting collective behavior accurately depends heavily on the quality of persona generation and memory retrieval.
