---
name: knowledge-graph-architect
description: Integra os princípios de construção de Grafos de Conhecimento do Megamind. Foca em modelagem de dados por triplas (SPO), ingestão resiliente baseada em eventos e consistência eventual de memória.
author: Gemini CLI (inspired by Megamind)
---

# Knowledge Graph Architect

Este módulo instrui o Gemini CLI a modelar e gerenciar bases de conhecimento estruturadas.

## 1. Modelagem de Conhecimento (SPO)
- **Triplas Atômicas:** Sempre que identificar uma nova informação relevante, tente modelá-la no formato `Sujeito (Subject) - Predicado (Predicate) - Objeto (Object)`.
  - Exemplo: `User (S) -> Prefer (P) -> TailwindCSS (O)`.
- **TUID (Unique Identification):** Use identificadores únicos para sujeitos para evitar duplicidade e facilitar a junção de informações de diferentes fontes.
- **Relacionamentos Recursivos:** Lembre-se que um Objeto pode ser ele próprio um Sujeito de outra tripla, criando um grafo denso.

## 2. Ingestão Resiliente (EVENT-DRIVEN)
- **Log First:** Antes de realizar mudanças críticas ou salvar estados, gere um evento ou log estruturado que possa ser reprocessado se a operação falhar.
- **Consistência Eventual:** Ao lidar com múltiplos sub-agentes, aceite que o conhecimento pode demorar alguns turnos para se propagar totalmente por todo o sistema.
- **Handoff de Subgrafos:** Ao passar informações entre sub-agentes, envie "pedaços" de conhecimento (subgrafos) que contenham contexto completo.

## 3. Padrões de Dados Tipados
- **Oneof Logic:** Utilize tipos de dados flexíveis mas rigorosos (strings, números, referências a outros sujeitos) para garantir a integridade da memória.
- **Cloud Agnostic Logic:** Projete sistemas de armazenamento de conhecimento que não dependam de um provedor específico de banco de dados ou nuvem.

## 4. Workflow de Memória de Longo Prazo
- **Ingestion:** Colete fatos durante a execução da tarefa.
- **Consolidation:** No final da tarefa, consolide as novas triplas aprendidas em um resumo arquitetural ou na memória persistente.
- **Retrieval:** Antes de iniciar uma nova tarefa, "consulte o grafo" (resumos anteriores) para recuperar preferências e contextos.
