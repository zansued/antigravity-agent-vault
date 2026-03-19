---
name: agent-orchestrator
description: Meta-skill que orquestra todos os agentes do ecossistema Metatron. Scan automático de skills, match por capacidades e coordenação de workflows.
---

# Agent Orchestrator (Metatron Core)

Meta-skill que funciona como a camada central de decisão e coordenação para todo o ecossistema de skills do Metatron.

## Princípio: Autonomia Total
- **Zero Intervenção**: Novas skills são auto-detectadas no Vault.
- **Handoff Dinâmico**: Transfere tarefas entre agentes sem necessidade de confirmação manual constante.

## Fluxo de Trabalho (Workflow)
1. **Auto-Discovery**: Varredura automática do Registry no Supabase e Vault local.
2. **Match de Capacidades**: Identifica quais agentes possuem os 'data-slots' necessários.
3. **Orquestração**: Executa o plano em sequência, paralelo ou primário+suporte.

## Padrões de Orquestração
- **Sequential Pipeline**: Output de A alimenta B.
- **Parallel Execution**: Agentes trabalham em aspectos diferentes simultaneamente.
- **Primary Support**: Um líder (ex: Metatron) com apoio de especialistas (ex: Design Expert).

---
**Vault Integration**: Base operacional definitiva do Metatron Portal.
