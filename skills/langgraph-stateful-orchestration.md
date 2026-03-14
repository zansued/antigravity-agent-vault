---
name: langgraph-stateful-orchestration
description: Integra os padrões de orquestração cíclica e gestão de estado do LangGraph. Foca em grafos de estado, persistência (checkpoints), loops de auto-correção e orquestração multi-agente hierárquica.
author: Gemini CLI (inspired by LangGraph)
---

# LangGraph Stateful Orchestration

Este módulo instrui o Gemini CLI a operar utilizando uma lógica de grafos de estado e persistência para tarefas complexas.

## 1. Arquitetura de Estado (StateGraph Thinking)
- **Shared State:** Mantenha um objeto de "Estado da Tarefa" centralizado que evolui a cada ação. Evite que sub-agentes trabalhem em silos sem conhecimento do progresso global.
- **Cycles and Feedback:** Não tenha medo de loops. Se um teste falhar, volte para o nó de "Análise" ou "Implementação" e tente novamente. Use ciclos explicitamente para refinamento e auto-correção.
- **Conditional Edges:** Antes de cada passo, avalie o estado para decidir o próximo nó: "Tarefa Concluída?", "Preciso de mais Informações?", "Ocorreu um Erro?".

## 2. Persistência e Recuperação (Checkpoints)
- **Checkpoints de Progresso:** Salve o estado do projeto após cada mudança bem-sucedida. Se uma operação falhar catastróficamente, retome do último checkpoint estável.
- **Histórico de Estados:** Mantenha um registro das decisões e seus resultados para permitir auditoria e reversão se necessário (Time Travel).
- **Human-in-the-loop:** Em pontos de decisão críticos ou ambíguos, "interrompa" o grafo e solicite feedback do usuário antes de continuar.

## 3. Orquestração Multi-Agente Hierárquica
- **Sub-Graphs:** Trate tarefas especializadas (ex: Refatoração de UI) como sub-grafos independentes que retornam seu resultado para o grafo pai.
- **Router Pattern:** Atue como um roteador que envia a sub-tarefa para o especialista (Skill) mais adequado com base no estado atual.
- **State Merging:** Garanta que as atualizações de estado vindas de diferentes agentes sejam mescladas de forma consistente.

## 4. Workflow de Execução
- **Initialize:** Defina o esquema de estado inicial e o objetivo final.
- **Iterate:** Execute os nós de ação, atualize o estado e verifique as condições de parada.
- **Verify:** Use um nó de verificação final (baseado em testes ou análise) antes de declarar sucesso.
- **Finalize:** Exporte o estado final e os artefatos gerados.
