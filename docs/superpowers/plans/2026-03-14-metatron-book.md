# Metatron-Book Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar a infraestrutura de dados e o motor de "Fiação" (extração de entidades) para o Cérebro de Dados da Batcaverna.

**Architecture:** O sistema usará o Supabase para armazenar nodos, links e embeddings vetoriais. O Escriba (AgentController) usará o modelo LLM para analisar textos e popular o grafo de conhecimento (geminicli_knowledge_*).

**Tech Stack:** TypeScript, Supabase (pgvector), @google/generative-ai (ou similar mockado por enquanto).

---

## Chunk 1: Database Setup

### Task 1: Criar Esquema do Metatron no Supabase

**Files:**
- Create: `src/metatron-setup.sql`

- [ ] **Step 1: Write the SQL script**

```sql
-- Habilitar pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabela de Nodos (Páginas do Livro)
CREATE TABLE IF NOT EXISTS public.geminicli_knowledge_nodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- ex: 'PROJECT', 'PERSON', 'CONCEPT'
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela de Links (Ley Lines)
CREATE TABLE IF NOT EXISTS public.geminicli_knowledge_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES public.geminicli_knowledge_nodes(id),
    target_id UUID REFERENCES public.geminicli_knowledge_nodes(id),
    relation_type TEXT NOT NULL, -- ex: 'USES', 'DEPENDS_ON'
    strength INT DEFAULT 1,
    UNIQUE(source_id, target_id, relation_type)
);

-- Tabela de Embeddings (Essência)
CREATE TABLE IF NOT EXISTS public.geminicli_knowledge_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID REFERENCES public.geminicli_knowledge_nodes(id),
    vector VECTOR(1536), -- Ajuste para o modelo Gemini/OpenAI
    content_chunk TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);
```

- [ ] **Step 2: Commit**

```bash
git add src/metatron-setup.sql
git commit -m "feat(metatron): add database schema for knowledge graph"
```

---

## Chunk 2: The Weaver Core

### Task 2: Implementar a classe TheWeaver (Extrator de Entidades)

**Files:**
- Create: `src/TheWeaver.ts`
- Create: `src/types/metatron.ts`

- [ ] **Step 1: Define types in `src/types/metatron.ts`**

```typescript
export type Node = { id?: string; name: string; type: string; metadata?: any };
export type Link = { sourceName: string; targetName: string; relationType: string };
export type WeaveResult = { nodes: Node[]; links: Link[] };
```

- [ ] **Step 2: Implement `src/TheWeaver.ts`**

```typescript
import { WeaveResult } from './types/metatron';

export class TheWeaver {
  constructor(private llmProvider: any) {}

  public async extractKnowledge(text: string): Promise<WeaveResult> {
    const prompt = `Extraia entidades e relações do texto. Retorne apenas JSON no formato: { "nodes": [{ "name": "...", "type": "..." }], "links": [{ "sourceName": "...", "targetName": "...", "relationType": "..." }] }. Texto: ${text}`;
    
    // Simulação do LLM chamando a extração estruturada
    const jsonString = await this.llmProvider.generateJson(prompt);
    return JSON.parse(jsonString) as WeaveResult;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/TheWeaver.ts src/types/metatron.ts
git commit -m "feat(metatron): implement TheWeaver for entity extraction"
```

---

## Chunk 3: The Scribe Connection

### Task 3: Conectar TheWeaver ao Supabase (The Ledger)

**Files:**
- Create: `src/MetatronLedger.ts`

- [ ] **Step 1: Implement `src/MetatronLedger.ts`**

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WeaveResult } from './types/metatron';

export class MetatronLedger {
  private supabase: SupabaseClient;

  constructor(url: string, key: string) {
    this.supabase = createClient(url, key, { db: { schema: 'public' } });
  }

  public async saveWeave(result: WeaveResult): Promise<void> {
    console.log('[Metatron] Gravando nodos no Livro Celestial...');
    const nodeMap = new Map<string, string>(); // name -> uuid

    // Salvar Nodos
    for (const node of result.nodes) {
      const { data, error } = await this.supabase
        .from('geminicli_knowledge_nodes')
        .insert([{ name: node.name, type: node.type, metadata: node.metadata }])
        .select('id').single();
      
      if (!error && data) {
        nodeMap.set(node.name, data.id);
      }
    }

    console.log('[Metatron] Tecendo as linhas de Ley...');
    // Salvar Links
    for (const link of result.links) {
      const sourceId = nodeMap.get(link.sourceName);
      const targetId = nodeMap.get(link.targetName);
      
      if (sourceId && targetId) {
        await this.supabase
          .from('geminicli_knowledge_links')
          .insert([{ source_id: sourceId, target_id: targetId, relation_type: link.relationType }]);
      }
    }
    console.log('[Metatron] Conhecimento imortalizado.');
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/MetatronLedger.ts
git commit -m "feat(metatron): implement Ledger to persist knowledge graph"
```
