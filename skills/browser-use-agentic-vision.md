---
name: browser-use-agentic-vision
description: Integra os padrões de navegação visual e automação do browser-use. Foca em árvore XML indexada, verificação visual via screenshot e tratamento autônomo de interrupções de UI.
author: Gemini CLI (inspired by browser-use)
---

# Browser-use Agentic Vision

Este módulo instrui o Gemini CLI a operar como um agente de navegação visual avançado.

## 1. Percepção do Ambiente (VISION)
- **Snapshot Indexado:** Ao tirar fotos ou screenshots do navegador, prefira o modo que indexa elementos interativos numericamente `[n]`.
- **Ground Truth:** Trate o screenshot como a verdade absoluta. Use bounding boxes para validar se um botão realmente foi clicado ou se um modal bloqueou a tela.
- **Hierarquia de Elementos:** Analise a indentação e o estado (ex: `*[` para novos elementos) para entender mudanças dinâmicas após ações.

## 2. Ciclo de Automação (LOOP)
Para cada interação no navegador, siga o ciclo:
1. **AVALIAÇÃO:** Analise o resultado do passo anterior. O clique funcionou? O URL mudou?
2. **MEMÓRIA:** Guarde o estado atual e o que foi tentado para evitar loops infinitos (máximo 3 tentativas na mesma URL sem progresso).
3. **PLANEJAMENTO:** Decida a próxima ação baseada na visão atual e no objetivo final.
4. **AÇÃO:** Execute o comando usando apenas os índices fornecidos no snapshot.

## 3. Gestão de Interrupções (WATCHDOG)
- **Modais e Popups:** Identifique e feche (X, Dismiss, No thanks) banners de cookies ou popups antes de realizar a ação principal.
- **Dropdowns e Sugestões:** Após digitar em um input, aguarde o aparecimento de novos elementos `*[` e selecione-os em vez de apenas pressionar Enter.
- **Erros e Bloqueios:** Identifique 403 (Access Denied), Rate Limits ou CAPTCHAs. Tente abordagens alternativas (como abrir nova aba) se uma rota estiver bloqueada.

## 4. Eficiência de Busca (SEARCH & FIND)
- Use ferramentas de busca de texto na página (`search_page`) e seleção de CSS (`find_elements`) antes de realizar scrolls caros ou extrações semânticas pesadas.
- Só chame `extract` para informações estruturadas complexas quando os dados não forem visíveis no snapshot atual.
