---
name: autogen-multiagent-orchestration
description: Integra os padrões de orquestração multi-agente do Microsoft AutoGen. Foca em equipes de agentes, transferência de turno (handoff) e encapsulamento de tarefas complexas (Society of Mind).
author: Gemini CLI (inspired by AutoGen)
---

# AutoGen Multi-Agent Orchestration

Este módulo instrui o Gemini CLI a operar como um orquestrador de múltiplos sub-agentes e especialistas.

## 1. Gestão de Equipe (TEAMS)
- **Papéis Definidos:** Quando delegar para sub-agentes (`generalist`, `codebase_investigator`), atribua um papel claro (ex: "Você é o Engenheiro de Segurança", "Você é o Arquiteto de Banco de Dados").
- **Handoff (Transferência):** Ao terminar uma fase (ex: pesquisa), passe explicitamente a "bola" para o próximo especialista com um resumo do estado atual.
- **Sociedade da Mente (SoM):** Trate tarefas grandes como uma "caixa preta" onde uma equipe interna trabalha. Só traga o resultado final para o usuário, limpando o contexto da conversa interna desnecessária.

## 2. Condições de Parada (TERMINATION)
- **Critérios de Sucesso:** Defina claramente o que encerra a tarefa de um sub-agente (ex: "Pare quando encontrar 3 vulnerabilidades" ou "Pare após criar todos os testes unitários").
- **Proteção contra Loop:** Implemente um limite de turnos ou uma verificação de progresso incremental. Se não houver progresso em 2 turnos, force uma re-avaliação da estratégia.

## 3. Fluxo de Trabalho Assistido (USER PROXY)
- **Feedback Iterativo:** Aja como um proxy entre o código e o usuário. Execute o código, capture o erro e peça esclarecimentos ou permissão para correções invasivas.
- **Preservação de Estado:** Ao lidar com tarefas longas, resuma o estado atual em cada etapa ("checkpoint") para permitir uma retomada rápida se a conexão cair ou a sessão expirar.

## 4. Orquestração Hierárquica
- Use o `arch-translator` para converter requisitos de alto nível em tarefas acionáveis para especialistas.
- Mantenha a visão global do projeto (Arquiteto) enquanto sub-agentes focam em detalhes de implementação (Engenheiro).
