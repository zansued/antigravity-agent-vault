# Metatron Portal (Celestial Dashboard) Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um Dashboard visual (Spatial UI) usando React, tldraw e Supabase para visualizar o Grafo de Conhecimento do Metatron-Book em tempo real.

**Architecture:** Frontend React (Vite) conectado ao Supabase. O motor de visualização será o tldraw, mapeando nodos do banco para formas geométricas neon no canvas.

**Tech Stack:** React, Vite, TypeScript, TailwindCSS, shadcn-ui, tldraw, @supabase/supabase-js.

---

## Chunk 1: Portal Setup & Infra

### Task 1: Scaffolding do Projeto

**Files:**
- Create: `portal/` (nova pasta root para o frontend)
- Create: `portal/package.json`
- Create: `portal/vite.config.ts`

- [ ] **Step 1: Inicializar projeto Vite com React e TS**
- [ ] **Step 2: Configurar TailwindCSS e shadcn-ui**
- [ ] **Step 3: Instalar dependências (tldraw, supabase-js)**

---

## Chunk 2: The Astral Engine (Visual Core)

### Task 2: Integração do tldraw com Supabase

**Files:**
- Create: `portal/src/components/CelestialCanvas.tsx`
- Create: `portal/src/hooks/useMetatronSync.ts`

- [ ] **Step 1: Criar Hook useMetatronSync**
  - Implementar Realtime para ouvir `geminicli_knowledge_nodes` e `geminicli_knowledge_links`.
  - Converter dados do banco para o formato de shapes do tldraw.

- [ ] **Step 2: Implementar CelestialCanvas**
  - Customizar a UI do tldraw para a estética Neon Celestial.
  - Renderizar os nodos como Runas Geométricas (Runes).

---

## Chunk 3: The Sacred Interface (UI)

### Task 3: Side Panels e Ritual Console

**Files:**
- Create: `portal/src/components/RegistryPanel.tsx`
- Create: `portal/src/components/RitualConsole.tsx`

- [ ] **Step 1: Implementar RegistryPanel (shadcn Table/List)**
  - Lista de todos os conhecimentos imortalizados.
- [ ] **Step 2: Implementar RitualConsole (Chat Interface)**
  - Interface para disparar novos rituais de absorção.

---

## Chunk 4: Final Weaving

### Task 4: Deploy e Conexão de Produção

- [ ] **Step 1: Validar sincronização bidirecional** (arrastar no canvas deve salvar posição no banco).
- [ ] **Step 2: Adicionar efeitos de partículas e glow neon.**
