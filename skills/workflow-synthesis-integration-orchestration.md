---
name: workflow-synthesis-integration-orchestration
description: Use when designing complex, multi-step automated workflows between heterogeneous APIs, managing long-running stateful executions, and standardizing data flow between disparate services.
author: Gemini CLI (inspired by n8n)
---

# Workflow Synthesis & Integration Orchestration

## Overview
Capacidade de projetar e orquestrar fluxos de trabalho complexos que conectam múltiplos serviços externos (SaaS, DBs, APIs) através de uma lógica de grafo direcionado e transformação de dados em tempo real.

## Quando Usar
- Integração de sistemas heterogêneos (ex: Salesforce -> Slack -> Postgres).
- Automação de processos de negócio com lógica de ramificação (IF/Else), loops e esperas.
- Orquestração de tarefas agênticas que requerem interação com ferramentas externas de terceiros.

## Core Patterns

### 1. Atomic Node Operations
Cada etapa do fluxo deve ser uma operação atômica que recebe um array de objetos JSON e retorna um novo array transformado:
- **Input Consistency:** Garanta que os metadados de entrada sejam preservados para rastreabilidade.
- **Output Standardization:** Formate a saída para que o próximo nó possa consumi-la sem lógica de parsing complexa.

### 2. Directed Acyclic Graph (DAG) Execution
Workflows são representados como grafos. A execução segue as conexões entre nós:
- **Branching (Split):** Divida o fluxo para processar dados em paralelo ou por condições.
- **Merging (Join):** Consolide dados de múltiplos caminhos antes de prosseguir para a próxima etapa crítica.
- **Error Handling:** Implemente caminhos de erro ("Error Trigger") para capturar falhas e realizar rollback ou notificações.

### 3. Dynamic Expression Evaluation
Utilize um motor de expressões para injetar dados dinâmicos em parâmetros de nós:
- **Syntax:** `{{ $node["NodeName"].json["field"] }}` ou similar para referência cruzada.
- **Transformation:** Realize pequenos ajustes de dados (data formatting, math, string manipulation) diretamente na expressão para evitar nós de "Code" desnecessários.

## Quick Reference
| Conceito | Função no n8n |
| --- | --- |
| Trigger | Início do fluxo (Webhook, Cron, Evento) |
| Action Node | Executa uma tarefa em um serviço (HTTP, SQL, Slack) |
| Logic Node | Controla o fluxo (IF, Switch, Merge, Wait) |
| Binary Data | Manipulação de arquivos (Imagens, PDFs, Planilhas) |

## Erros Comuns
- **Infinite Loops:** Criar conexões que voltam para um nó anterior sem uma condição de saída clara.
- **Memory Exhaustion:** Processar milhares de registros simultâneos em um único nó de "Code" pesado.
- **Secret Exposure:** Hardcodear chaves de API em expressões em vez de usar o sistema de "Credentials".
