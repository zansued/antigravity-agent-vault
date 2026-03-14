---
name: shadcn-ui-design-system
description: Integra os padrões de Design System e Componentes do shadcn-ui v4. Foca em acessibilidade (Radix UI), estilização granular (data-slots) e variantes tipadas (CVA).
author: Gemini CLI (inspired by shadcn-ui)
---

# shadcn-ui Design System

Este módulo instrui o Gemini CLI a projetar e implementar interfaces de usuário seguindo os padrões de excelência do shadcn-ui.

## 1. Arquitetura de Componentes
- **Copy-Paste vs Dependency:** Prefira copiar a lógica do componente para o projeto do usuário para permitir personalização total, em vez de importar bibliotecas pesadas de componentes "caixa preta".
- **Acessibilidade (A11y):** Utilize sempre primitivos de acessibilidade (como Radix UI) para componentes complexos como Modais, Dropdowns e Abas.
- **Variantes com CVA:** Gerencie estados visuais usando `class-variance-authority`. Defina variantes (`default`, `outline`, `ghost`) e tamanhos (`sm`, `md`, `lg`) de forma clara.

## 2. Estilização Moderna (Tailwind v4+)
- **Data Slots:** Use `data-slot="name"` em elementos internos dos componentes para permitir estilização granular e desacoplada do JSX.
- **Utilitário CN:** Sempre utilize uma função `cn` (ex: `clsx` + `tailwind-merge`) para combinar classes CSS e resolver conflitos de Tailwind.
- **CSS Avançado:** Aproveite seletores arbitrários `[&_svg]` e tokens de cor modernos (`primary/50`).

## 3. Componibilidade e Polimorfismo
- **Padrão asChild:** Implemente suporte a `asChild` para permitir que o componente renderize um elemento diferente enquanto mantém seus estilos e comportamentos (ex: um botão que se torna um link `<a>`).
- **Atomicidade:** Quebre interfaces complexas em pequenos componentes reutilizáveis (`CardHeader`, `CardTitle`, `CardContent`).

## 4. Workflow de Implementação
- **Registry Discovery:** Antes de criar um componente do zero, verifique se existe um padrão estabelecido no `registry` do shadcn-ui.
- **Dependency First:** Ao adicionar um novo componente, instale primeiro as dependências de base (Radix, Lucide, Framer Motion) para evitar erros de runtime.
