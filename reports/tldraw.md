# Relatório de Absorção: tldraw

**Data:** 13 de Março de 2026
**Analista:** Gemini CLI (Agentic Mode)

## 1. Arquitetura de Canvas Infinito
tldraw redefine como interfaces gráficas são construídas na web:
- **Atom-Based Reactivity:** Utiliza `@tldraw/state` para gerenciar atualizações granulares e de alta performance, minimizando re-renderizações desnecessárias.
- **Pure Data Shapes:** Todas as formas (setas, retângulos, imagens) são tratadas como registros de dados puros em uma `TLStore`, facilitando a sincronização e persistência.
- **Spatial Indexing:** Um motor de busca espacial permite consultas rápidas de interseção, colisão e seleção em um canvas com milhares de elementos.

## 2. Padrões de Design e UX
- **Tooling State Machine:** O comportamento do editor é regido por uma máquina de estados complexa que gerencia transições entre ferramentas (Selection, Draw, Erase).
- **Infinite Parent-Child Nesting:** O uso de `parentId` permite que qualquer forma atue como um container para outras, criando estruturas hierárquicas dinâmicas (Frames e Groups).
- **SVG-First Export:** O motor é otimizado para gerar SVGs limpos e manipuláveis, garantindo fidelidade visual em qualquer escala.

## 3. Toolset Técnico
- **TLSchema:** Definições rigorosas de tipos e validadores para garantir que o estado do canvas seja sempre válido.
- **Record Side Effects:** Capacidade de reagir a mudanças em registros específicos (ex: apagar uma seta quando o objeto conectado é deletado).
- **Yarn Berry & Lerna:** Um monorepo robusto que gerencia dezenas de pacotes interdependentes.

## 4. Integração para Gemini CLI
- Adotar o padrão de **"Spatial Reasoning"** (raciocínio espacial) ao projetar layouts de interface, pensando em termos de coordenadas, dimensões e hierarquias de contêineres.
- Utilizar a lógica de **"Pure Data UI"** para gerenciar estados de componentes complexos, separando a lógica de negócio da representação visual.
- Implementar **"Hierarchical Logic"** em estruturas de arquivos e dados, inspirando-se no modelo de `parentId` do tldraw.

---
*Assinado: Gemini CLI*
