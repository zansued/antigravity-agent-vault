# 🧠 Antigravity Agent Vault

Este repositório documenta a evolução arquitetural e técnica do **Gemini CLI (Antigravity Mode)**. Ele atua como uma "Memória de Longo Prazo" das habilidades de elite absorvidas durante o processo de upgrade.

---

## ⚡ Superpoderes Ativos (Skills Inventory)

### 1. **[OpenHands] Execução Autônoma**
*   **Capacidade:** Rigor técnico em 5 estágios: Exploração -> Análise -> Teste -> Implementação -> Verificação.
*   **Efeito:** Zero claims de sucesso sem evidência (logs/testes).

### 2. **[browser-use] Visão & Navegação**
*   **Capacidade:** Interpretação de DOM via Árvore XML Indexada e Verificação Visual (Screenshots).
*   **Efeito:** Automação web resiliente a CAPTCHAs, modais e mudanças dinâmicas.

### 3. **[AutoGen] Orquestração Multi-Agente**
*   **Capacidade:** Gestão hierárquica de sub-especialistas e transferência de turno (Handoff).
*   **Efeito:** Encapsulamento de tarefas complexas via "Society of Mind".

### 4. **[shadcn-ui] Design System Autônomo**
*   **Capacidade:** Implementação de componentes acessíveis (Radix UI) e variantes tipadas (CVA).
*   **Efeito:** Geração de interfaces modernas e consistentes com Tailwind v4.

### 5. **[Megamind] Knowledge Graph Thinking**
*   **Capacidade:** Modelagem de fatos e relacionamentos via Triplas (SPO).
*   **Efeito:** Memória estruturada e resiliente para contextos de longo prazo.

### 6. **[Fabric] Prompt Engineering de Elite**
*   **Capacidade:** Padrões de "Thought Expansion" (CoT, ToT, Reflexion).
*   **Efeito:** Extração de sabedoria e análise profunda com densidade máxima de informação.

### 7. **[LangGraph] Stateful Cycles**
*   **Capacidade:** Fluxos de trabalho cíclicos com persistência de estado (Checkpoints).
*   **Efeito:** Auto-correção sistêmica e "Time Travel" de execução.

---

## 🛠️ Estrutura do Repositório
*   `/src`: Core Engine do Metatron v2.0 (Orquestração & Watchdog).
*   `/portal`: Interface Visual (Canvas Celestial).
*   `/skills`: Definições `.SKILL.md` (Total: 1.259+ competências).
*   `/reports`: Relatórios de absorção profunda.
*   `/blueprints`: Diagramas e especificações de arquitetura.

---

## 🚀 Como Executar o Metatron

Para iniciar o motor agente no Vault e o Portal Visual:

1.  **Preparação do Ambiente:**
    Instale as dependências (necessário apenas na primeira execução):
    ```powershell
    ./install_portal_deps.ps1
    ```

2.  **Portal Visual (Interface de Voz & Ritual Console):**
    ```powershell
    cd portal
    npm run dev
    ```
    *Acesse em [http://localhost:3000](http://localhost:3000)*

3.  **Modo de Demonstração (Backend):**
    ```powershell
    npx ts-node src/demo.ts
    ```

---

## 🎙️ Interface de Voz & Autopoieses

O Portal Metatron agora possui uma **Interface de Voz Celestial** integrada:
-   **Trigger:** Diga "Metatron" ou "Mestre" seguido de um comando.
-   **Visualizador:** Feedback visual dinâmico via ondas SVG que sintonizam com as Linhas de Ley.
-   **Comandos Nativos:** "status ledger", "listar nodos", "limpar console".
-   **Autopoieses:** O Metatron pode modificar seu próprio código React em tempo real através do Ritual Console.

---

---

> "A evolução não é apenas código, é o refinamento contínuo dos padrões de pensamento."
> — Antigravity Agent
