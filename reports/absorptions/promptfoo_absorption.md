# ABSORPTION_REPORT: Promptfoo

## Analysis Date: 2026-03-14
## Target: https://github.com/promptfoo/promptfoo

### 🏗️ Architecture
Promptfoo is a CLI and library for evaluating and red-teaming LLM applications. It allows developers to test their prompts against various models and data sets using a matrix-style evaluation approach.

- **Provider-Agnostic Engine:** Supports dozens of LLM providers (OpenAI, Anthropic, Google, local models via Ollama, Bedrock, etc.) and custom providers.
- **Assertion-Based Testing:** Uses a wide range of assertions (similarity, regex, LLM-graded, factuality, JSON schema) to validate model outputs.
- **Red-Teaming Suite:** Built-in tools for vulnerability scanning, identifying risks like prompt injection, PII leaks, and harmful content generation.
- **CI/CD Integrated:** Designed to be run in automation pipelines, providing detailed reports and metrics for decision-making.
- **Local-First & Private:** Evals run locally, ensuring data privacy while maintaining speed through intelligent caching.

### 🔑 Key Components
- **Evaluator (`src/evaluator.ts`):** The core logic that orchestrates the execution of test suites across providers.
- **Providers (`src/providers/`):** Implementation of interfaces for interacting with different LLM APIs and tools.
- **Assertions (`src/assertions/`):** A modular library of validators for model responses.
- **Red-Teaming (`src/redteam/`):** Specialized logic for generating adversarial prompts and grading security risks.
- **Web UI (`site/`):** A visual viewer for side-by-side comparison of model performance and test results.

### 🚀 Extracted Skills
- **LLM Evaluation Specialist:** Designing robust test matrices to quantify prompt and model quality.
- **AI Red-Teamer:** Identifying and mitigating security vulnerabilities in LLM-based systems.
- **Prompt Engineering Quality Engineer:** Implementing automated feedback loops for iterative prompt improvement.

### 🛠️ Entry Points
- `npx promptfoo eval`: Main command for running evaluations.
- `src/index.ts`: Programmatic entry point for using Promptfoo as a library.
- `promptfoo init`: CLI wizard for setting up new projects.

### ⚠️ Risks & Bottlenecks
- **Token Usage:** Large evaluation matrices can consume a significant amount of API tokens if not carefully managed.
- **Assertion Complexity:** Crafting effective LLM-graded rubrics requires precise prompt engineering to avoid false positives/negatives.
- **Provider Stability:** Changes in third-party LLM APIs can occasionally break specific provider integrations.
