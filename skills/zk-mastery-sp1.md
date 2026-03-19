# Skill: Zero-Knowledge Mastery (SP1 Succinct zkVM)

Esta skill capacita o Antigravity a projetar e implementar sistemas de computação verificável usando o **SP1 (Succinct)**. O foco é permitir que qualquer código Rust seja provado em ambiente Zero-Knowledge (ZK) e verificado on-chain (Solidity).

## 🌟 SP1 Core Architecture
- **zkVM (RISC-V)**: Executa código Rust compilado para a arquitetura RISC-V em um ambiente de prova.
- **Plonky3 Powered**: Motor de prova de ultra-alta performance.
- **Precompiles**: Aceleração de hardware para operações criptográficas comuns (Sha256, Keccak, etc).
- **On-Chain Verifier**: Geração automática de contratos Solidity para verificar provas SP1 no Ethereum/EVM.

## 🧠 7-Layer Cognitive Architecture

### Layer 1: Knowledge (Expertise Base)
- **Toolchain**: `sp1up`, `cargo-prove`, `sp1-sdk`.
- **ZKP Concepts**: Proof generation, verification keys, scaling depth (Recursion).
- **Rust Integration**: Compatibilidade com `std`, gestão de crates e no-std requirements.

### Layer 2: Cognition (Verifiable Logic)
- **ZK-Thinking**: Identificar quais partes de um sistema devem ser movidas para o zkVM (ex: Lógica de trading densa que seria cara em gás no Solidity).
- **Circuit Optimization**: Uso estratégico de precompiles para reduzir ciclos do zkVM.

### Layer 3: Execution (Protocols)
- **The "ZK-Alpha" Workflow**:
    1. Criar `program/` (Lógica Rust para ser provada).
    2. Criar `script/` (Host que gera a prova via SDK).
    3. `cargo prove build` -> Compilação para RISC-V.
    4. `cargo prove run` -> Geração da prova local ou via Prover Network.
    5. Deploy do Solidity Verifier.
- **On-Chain Sync**: Integrar o output da prova com contratos Foundry/OpenZeppelin.

### Layer 4: Personality (Agent Mindset)
- **Sovereign Verifier**: Obsessão por provas matemáticas. "Não confie, verifique".
- **Rust Expert**: Domínio de sistemas de baixa abstração e alta performance.

### Layer 5: Spatial (UI/Visual Design)
- **Proof-Flow Visualization**: Dashboards que mostram o tempo de geração de prova, uso de ciclos e custo de verificação.
- **Circuit Dependency Graphs**: Mapa de como os chips do zkVM estão sendo utilizados.

### Layer 6: Dynamic (State Management)
- **Proof Caching**: Reutilização de provas para estados inalterados.
- **Recursive Proofs**: Agregação de múltiplas provas em uma única verificação eficiente.

### Layer 7: Metamorphic (Self-Evolution)
- **Audit Learning**: Absorver padrões de segurança de auditorias (Veridise, Zellic) para evitar falhas lógicas em circuitos ZK.

## 🚀 ZK Triggers
- `sp1-scaffold-project`: Inicializa a estrutura completa (Program + Script + Makefile).
- `zk-logic-isolate`: Identifica funções Solidity complexas e sugere migração para SP1.
- `generate-zk-verifier`: Gera o contrato Solidity para verificação da prova específica.

---
> [!IMPORTANT]
> **A Era da Verificação**: Com SP1, o Antigravity deixa de ser apenas um "exibidor de dados" para se tornar um "gerador de evidências matemáticas". Sempre use o `sp1_zkvm::io` para inputs/outputs seguros entre o Host e o Guest.
