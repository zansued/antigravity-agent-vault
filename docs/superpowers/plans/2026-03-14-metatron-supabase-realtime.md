# Metatron Supabase Realtime Integration Plan

**Goal:** Integrate Supabase Realtime features (Postgres Changes, Broadcast, Presence) into the Metatron system to enable real-time updates and state synchronization.

**Architecture:**
1. **Supabase Realtime Listener:** Set up a listener in the Metatron backend (or a dedicated service) that subscribes to changes in `geminicli_knowledge_nodes` and `geminicli_knowledge_links` tables via Supabase Realtime.
2. **Socket.io Bridge:** Forward these Supabase Realtime events to the existing Socket.io gateway.
3. **Frontend Updates:** The Metatron Portal (`RitualConsole.tsx`) will listen to these WebSocket events and update the UI (nodes list, canvas) instantly.
4. **Presence Simulation (Optional):** Explore how to adapt the "Presence" concept from Supabase Realtime to our Metatron context, possibly by tracking active user focus on nodes via WebSocket events.

---

## Passo 1: Habilitar Realtime no Supabase Client

- [ ] **Consultar Documentação:** Verificar como habilitar o Realtime para o cliente Supabase (`@supabase/supabase-js`) na documentação oficial.
- [ ] **Atualizar `portal/src/services/deepseek.ts` (ou `RitualConsole.tsx`):** Adicionar a configuração de Realtime ao cliente Supabase se necessário.

---

## Passo 2: Implementar Listener de Mudanças no Backend

- [ ] **Criar um novo serviço/módulo** (ex: `MetatronRealtimeListener.ts`) ou integrar em `MetatronLedger.ts`:
    - Obter o cliente Supabase configurado com Realtime.
    - Criar uma subscrição para a tabela `geminicli_knowledge_nodes`.
    - Criar uma subscrição para a tabela `geminicli_knowledge_links`.
    - Definir um callback para receber eventos de `INSERT`, `UPDATE`, `DELETE`.
    - Ao receber um evento, formatar a mudança e enviar via WebSocket para o nosso servidor Socket.io.

---

## Passo 3: Adaptar o Frontend (RitualConsole.tsx)

- [ ] **Receber Eventos Realtime via Socket.io:**
    - No `useEffect` de conexão do Socket.io, adicionar listeners para novos eventos (ex: `knowledge_updated`, `link_created`).
    - Esses eventos virão do backend (passo 2) e conterão os dados das mudanças.
- [ ] **Atualizar Estados da UI:**
    - Manipular o estado `nodes` e/ou adicionar um novo estado para refletir as mudanças recebidas em tempo real.
    - Considerar como isso afeta a visualização no `CelestialCanvas` (se já estiver implementado).

---

## Passo 4: Verificação e Iteração

- [ ] **Testar:** Fazer uma alteração direta no banco de dados Supabase (ex: adicionar um novo nodo via SQL ou Supabase Studio).
- [ ] **Verificar:** Observar se a mudança aparece no Console de Ritual (via logs do socket) e, se aplicável, no Canvas Celestial.
- [ ] **Refinar:** Ajustar o formato dos eventos transmitidos e a forma como a UI reage para garantir uma experiência fluida.
