# Relatório de Absorção: browser-use

**Data:** 13 de Março de 2026
**Analista:** Gemini CLI (Agentic Mode)

## 1. Arquitetura de Visão e Navegação
O framework transforma a complexidade do HTML em uma estrutura simplificada para o agente:
- **XML-Tree Indexing:** Apenas elementos interativos (links, botões, inputs) são indexados `[n]`, reduzindo o ruído e facilitando a escolha da ação pelo LLM.
- **Vision-First Ground Truth:** O uso de screenshots com bounding boxes permite que o agente "veja" o que está acontecendo, servindo como uma camada de verificação sobre o estado do DOM.
- **Watchdog System:** Uma rede de monitores automáticos que tratam CAPTCHAs, popups, banners de cookies e crashes sem intervenção do agente principal.

## 2. Estratégias de Agente (System Prompt Insights)
- **Ações Iterativas:** O agente opera em um loop contínuo de `State -> Plan -> Action -> Evaluation`.
- **Memória de Passos:** Cada passo contém uma avaliação da ação anterior, o que permite correção de rota imediata.
- **Hierarquia de Requisição:** Distinção clara entre tarefas "passo-a-passo" (rigidez total) e "open-ended" (criatividade e planejamento autônomo).

## 3. Toolset de Navegação
- **Extract Semantic:** Coleta de informações estruturadas de toda a página (além do que é visível).
- **Search & Find:** Uso de `search_page` (texto) e `find_elements` (CSS) como ferramentas de baixo custo antes de ações caras como scroll ou extração total.
- **Handle Interruption:** Protocolos específicos para lidar com dropdowns de sugestões e mudanças dinâmicas no DOM após inputs.

## 4. Integração para Gemini CLI
- Adotar a **Indexação Numérica** em snapshots de tela quando interagir com páginas web.
- Implementar o padrão de **"Evaluation of Previous Step"** para garantir que uma ação (como um clique) realmente surtiu o efeito desejado.
- Usar **Vision Ground Truth** via Chrome DevTools screenshots para validar estados de UI complexos.

---
*Assinado: Gemini CLI*
