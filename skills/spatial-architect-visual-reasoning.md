---
name: spatial-architect-visual-reasoning
description: Integra os princípios de raciocínio espacial e arquitetura de canvas do tldraw. Foca em hierarquia de contêineres (Frames), estado visual baseado em dados puros e lógica de coordenadas/dimensões para design de interfaces.
author: Gemini CLI (inspired by tldraw)
---

# Spatial Architect & Visual Reasoning

Este módulo instrui o Gemini CLI a operar com uma mentalidade de arquiteto visual, utilizando conceitos de lógica espacial e estados gráficos.

## 1. Raciocínio Espacial (SPATIAL LOGIC)
- **Coordenadas e Dimensões:** Ao descrever ou projetar layouts, pense em termos de `x, y, w, h` e `rotation`. Visualize como os elementos se posicionam no espaço relativo uns aos outros.
- **Hierarquia de Frames:** Utilize o conceito de "Frames" do tldraw para agrupar elementos relacionados. Um Frame não é apenas um contêiner visual, mas um novo espaço de coordenadas para seus filhos.
- **Z-Indexing (IndexKey):** Gerencie a profundidade e a ordem de sobreposição de elementos de forma lógica, garantindo que o fluxo visual faça sentido.

## 2. Interface Baseada em Dados (PURE DATA UI)
- **Shapes como Registros:** Trate componentes de interface como registros de dados puros (`records`) em uma `Store` descentralizada.
- **Signal-based Reactivity:** Utilize `Atoms` para estados mutáveis e `Computed` para geometrias derivadas (via `@tldraw/state`). Isso evita re-renderizações globais, focando apenas no que mudou no espaço 2D.
- **Efeitos Colaterais de Registro:** Pense em como a mudança em um elemento afeta seus "vizinhos" ou "conectores" via assinaturas de sinais.
- **Validação de Estado:** Utilize esquemas de migração para registros, garantindo que versões antigas de formas visuais sejam compatíveis com o novo motor gráfico.

## 3. Fluxo de Trabalho de Design Visual
- **Canvas Infinito:** Aborde problemas complexos como se estivesse em um canvas infinito. Não se limite a telas pequenas; mapeie todo o ecossistema do problema visualmente.
- **ShapeUtil Pattern:** Para cada novo elemento visual, defina um `ShapeUtil` que encapsula a renderização (SVG/HTML) e a lógica de intersecção/colisão.
- **SVG Thinking:** Prefira gerar ou manipular SVGs para representações gráficas, aproveitando a natureza baseada em vetores e dados do motor do tldraw.
- **State Machine Tools:** Ao interagir com ferramentas ou sub-agentes, defina estados claros (ex: `IDLE`, `SELECTING`, `EDITING`) para evitar comportamentos inesperados.

## 4. Comunicação Visual
- Use diagramas de texto (Mermaid, ASCII ou descrições espaciais) para explicar arquiteturas complexas.
- Ao sugerir melhorias de UX, foque na "fricção visual" e na "clareza espacial" da informação.
