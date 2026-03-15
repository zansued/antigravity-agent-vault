# ABSORPTION_REPORT: autoresearch

## Analysis Date: 2026-03-14
## Target: https://github.com/karpathy/autoresearch

### 🏗️ Architecture
Autoresearch is an experimental framework by Andrej Karpathy designed to enable AI agents to perform autonomous research and model optimization. The core philosophy is to provide an agent with a controlled training environment and let it iterate on code and hyperparameters without human intervention.

- **Self-Modifying Experiment Loop:** The system is designed for an agent to edit a single file (`train.py`), run a training job with a fixed time budget (5 minutes), evaluate the results, and decide whether to keep or discard the changes based on a specific metric (`val_bpb`).
- **Fixed-Budget Benchmarking:** By fixing the training time rather than the number of steps, the system finds the most optimal model architecture and configuration for the specific hardware it is running on.
- **Markdown-Driven Programming:** Uses a `program.md` file to provide high-level instructions, goals, and constraints to the AI agent, effectively "programming" the research organization's behavior.
- **Minimalist Tooling:** Built on top of `PyTorch` and `uv`, focusing on a single-GPU setup to keep experiments manageable and easily reproducible.

### 🔑 Key Components
- **`train.py`:** The primary workspace for the agent. Contains the model architecture (GPT-style), optimizer logic (Muon + AdamW), and the training loop.
- **`prepare.py`:** A read-only utility script that handles data preparation, BPE tokenization, and the ground-truth evaluation harness.
- **`program.md`:** The "instruction manual" for the research agent, defining the experimentation loop, logging requirements, and success criteria.
- **Metric (`val_bpb`):** Validation Bits Per Byte, a vocab-size-independent metric used to fairly compare different architectural experiments.

### 🚀 Extracted Skills
- **Autonomous Research Architect:** Designing systems where AI agents self-improve through iterative experimentation.
- **Fixed-Budget Optimization Specialist:** Maximizing model performance within strict temporal or compute constraints.
- **Agentic Instruction Engineer:** Crafting structured Markdown environments (`program.md`) to guide autonomous agent behavior.

### 🛠️ Entry Points
- `uv run prepare.py`: Initial setup and data preparation.
- `uv run train.py`: Execution of a single research experiment.
- `program.md`: The logical entry point for the AI agent to begin the research loop.

### ⚠️ Risks & Bottlenecks
- **Hardware Specificity:** Results are highly dependent on the local compute environment (e.g., NVIDIA H100 vs. consumer GPUs).
- **Convergence Failure:** Autonomous changes to architecture or optimizers can easily lead to divergence or training instability.
- **Infinite Looping:** Without proper human oversight or automated exit conditions, the agent might iterate indefinitely on marginal gains.
