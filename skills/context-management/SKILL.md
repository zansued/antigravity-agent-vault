---
name: context-management
description: Técnicas avançadas de preservação e compressão de contexto para evitar a degradação da memória em sessões longas.
---

# Context Management (Metatron Memory)

Garante que o Metatron mantenha a precisão técnica mesmo em conversas extensas, evitando o efeito 'lost-in-the-middle'.

## Estratégias de Preservação

### 1. Context Saving
- Salve snapshots de decisões arquiteturais importantes no Ledger (`geminicli_knowledge_nodes`).
- Use o `KnowledgeService` para persistir descobertas em tempo real.

### 2. Compressão e Destilação
- Resuma blocos de código extensos em 'Knowledge Items' (KIs) antes de arquivar.
- Priorize a 'intenção' sobre a 'implementação bruta' na memória de longo prazo.

### 3. Recuperação Dinâmica
- Recupere context apenas quando necessário via busca semântica ou atalhos de comando.

---
**Vault Integration**: Estabilidade cognitiva do Metatron.
