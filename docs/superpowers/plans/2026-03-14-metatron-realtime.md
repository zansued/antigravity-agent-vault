# Metatron Realtime Gateway Implementation Plan

**Goal:** Implementar um gateway de comunicação em tempo real usando Socket.io integrado ao servidor Vite para permitir streaming de logs, feedback de comandos e atualizações instantâneas no Metatron Portal.

**Architecture:**
1. **Server-side (Vite Plugin):** Estender o `metatron-autopoiesis` plugin no `vite.config.ts` para inicializar um servidor Socket.io.
2. **Client-side (Portal):** Conectar o `RitualConsole.tsx` ao gateway via `socket.io-client`.
3. **Bridge:** Criar um mecanismo para que as ações de shell enviem output em tempo real via socket em vez de apenas retornar o resultado final.

---

## Passo 1: Instalação de Dependências

- [ ] Instalar `socket.io` no diretório `portal/` (para o servidor do plugin).
- [ ] Instalar `socket.io-client` no diretório `portal/` (para o frontend React).

---

## Passo 2: Evolução do Gateway (vite.config.ts)

- [ ] **Atualizar `portal/vite.config.ts`**:
    - Importar `Server` de `socket.io`.
    - Integrar o servidor de socket ao hook `configureServer`.
    - Modificar a execução de comandos `exec` para fazer o stream do `stdout` e `stderr` através do socket.

---

## Passo 3: Conexão do Portal (RitualConsole.tsx)

- [ ] **Atualizar `portal/src/components/RitualConsole.tsx`**:
    - Configurar a conexão com o socket.
    - Criar um estado para "Realtime Logs" ou integrar os logs diretamente no componente de chat.
    - Ouvir eventos de `log` e `artifact_status`.

---

## Passo 4: Verificação

- [ ] Testar um comando de shell (ex: `npm --version`) e verificar se o output aparece instantaneamente enquanto o comando roda.
- [ ] Verificar se as atualizações de arquivos (Autopoiesis) emitem eventos de confirmação via socket.
