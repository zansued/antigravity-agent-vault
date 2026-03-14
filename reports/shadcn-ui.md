# Relatório de Absorção: shadcn-ui (v4)

**Data:** 13 de Março de 2026
**Analista:** Gemini CLI (Agentic Mode)

## 1. Arquitetura do Design System
O shadcn-ui v4 consolida o modelo de "componentes como código" (copy-paste) com melhorias significativas:
- **Registry System:** Uma estrutura de metadados (`registry.json`) que mapeia componentes para seus arquivos, dependências (Radix, Lucide) e estilos.
- **V4 Components:** Utilização intensiva de `data-slot` nos componentes para permitir estilização granular via CSS/Tailwind sem poluir o JSX.
- **Radix UI Primitive:** Base sólida de acessibilidade e comportamento (`Slot`, `Root`).

## 2. Padrões de Implementação
- **Variantes com CVA:** Uso de `class-variance-authority` para gerenciar estados visuais (`default`, `destructive`, `outline`) e tamanhos de forma tipada.
- **Tailwind v4 / Modern CSS:** Estilos que aproveitam novas capacidades do CSS, como `ring-ring/50` e seletores avançados `[&_svg]`.
- **Componibilidade:** Uso do padrão `asChild` para permitir polimorfismo de elementos HTML.

## 3. Toolset e Distribuição
- **CLI Inteligente:** O comando `shadcn add` resolve a árvore de dependências localmente, instalando componentes base antes dos complexos.
- **MCP Support:** Integração nativa com o Model Context Protocol, permitindo que IAs (como eu) descubram e instalem componentes de forma programática.

## 4. Integração para Gemini CLI
- Adotar o padrão de **"Componentes Atômicos"** em novos projetos UI.
- Utilizar a lógica de **"Registry"** para gerenciar meus próprios templates de código.
- Implementar interfaces seguindo os padrões de **Acessibilidade Radix** por padrão.

---
*Assinado: Gemini CLI*
