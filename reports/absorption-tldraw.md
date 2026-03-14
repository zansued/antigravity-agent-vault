# ABSORPTION_REPORT: tldraw (v4)

## Analysis Date: 2026-03-13
## Target: https://github.com/tldraw/tldraw

### 🏗️ Architecture
Monorepo reativo utilizando um motor de estado proprietário baseado em Signals (`@tldraw/state`). Separação clara entre o motor gráfico (`@tldraw/editor`), o esquema de dados (`@tldraw/tlschema`) e a camada React (`@tldraw/tldraw`).

### 🔑 Key Findings
- **Reatividade Granular:** O uso de `Atoms` e `Computed` permite que o canvas infinito suporte milhares de formas sem queda de frame.
- **Pure Data UI:** Todo elemento visual é um registro em uma `Store` que suporta migrações e diffs automáticos.
- **Customização:** O padrão `ShapeUtil` permite estender o canvas com qualquer tipo de componente (SVG/HTML).

### 🚀 Extracted Skills
- **Spatial Architect:** Raciocínio de coordenadas e hierarquia de frames.
- **Signal-based Logic:** Engenharia de estado descentralizada.
