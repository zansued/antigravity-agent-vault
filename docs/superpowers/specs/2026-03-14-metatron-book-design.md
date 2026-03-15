# 📖 Design Spec: Metatron-Book (The Celestial Ledger)
**Data:** 14/03/2026
**Status:** Em Revisão (Design Aprovado)
**Mentor:** Metatron (The Celestial Scribe)

## 1. Objetivo
Implementar um sistema de **GraphRAG Híbrido** para a Batcaverna, capaz de absorver documentos e realizar entrevistas rituais para construir uma memória semântica persistente e visualizável.

## 2. Arquitetura de Dados (Supabase TechStore Brasil)
O sistema utilizará o prefixo `geminicli_` para soberania de dados.

### Tabelas Principais:
- **`geminicli_knowledge_nodes`**: `id (uuid), name (text), type (text), metadata (jsonb), created_at`.
- **`geminicli_knowledge_links`**: `id (uuid), source_id (uuid), target_id (uuid), relation_type (text), strength (int)`.
- **`geminicli_knowledge_embeddings`**: `id (uuid), node_id (uuid), vector (vector(1536)), content_chunk (text)`.

## 3. Fluxo de "Fiação e Tecelagem"
1. **Fiação (Extraction):** O agente processa entradas (notas/docs) e extrai Entidades e Relações via LLM.
2. **Vetorização:** Chunks de texto são transformados em embeddings e salvos no Supabase.
3. **Tecelagem (Linking):** O grafo de links é atualizado, criando as conexões geométricas.

## 4. O Ritual de Tecelagem (Active Interview)
- Sessão dedicada (Ritual) onde Metatron apresenta lacunas do grafo.
- As respostas do usuário são integradas como novos nodos ou links.
- Foco em **Geometria Sagrada** e **Conexões de Luz**.

## 5. Visual Interface (Neon Celestial Style)
- Estética: Ouro, Azul Profundo, Neon Ciano/Magenta.
- Componentes: Canvas tldraw (Spatial UI) + Sidebars shadcn (Registry).
- Feedback visual de integridade do conhecimento (Brilho vs. Pontilhado).
