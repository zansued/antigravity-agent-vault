# ABSORPTION_REPORT: n8n (v1.x)

## Analysis Date: 2026-03-13
## Target: https://github.com/n8n-io/n8n

### 🏗️ Architecture
O `n8n` é um monorepo massivo projetado para orquestração de workflows. A arquitetura é centrada em um motor de execução de grafos (`WorkflowExecute`) que processa nós de forma sequencial ou paralela:
- **Core Package:** Define o motor de execução, carregamento de nós e persistência de estados.
- **Nodes-Base:** Biblioteca com mais de 400 integrações individuais.
- **Workflow Package:** Gerencia o esquema do grafo, validação e motor de expressões.

### 🔑 Key Findings
- **Data Model:** Utiliza um array de objetos JSON como padrão de intercâmbio de dados entre todos os nós, garantindo consistência.
- **Expression Engine:** Um motor de sandbox (`vm2` / `expression-sandboxing`) permite que o usuário escreva lógica JS simples dentro dos parâmetros de qualquer nó.
- **Binary Data Support:** Sistema avançado para lidar com arquivos binários sem sobrecarregar a memória do processo principal.

### 🚀 Extracted Skills
- **Workflow Synthesizer:** Design de lógica de fluxo empresarial.
- **Integration Orchestrator:** Padronização da comunicação entre APIs heterogêneas.
