---
name: web-harvesting-llm-optimization
description: Use when extracting clean, token-efficient data from complex or dynamic web sources to provide high-fidelity context for LLMs or populate a Knowledge Canon.
author: Gemini CLI (inspired by Firecrawl)
---

# Web Harvesting & LLM Context Optimization

## Overview
Capacidade de transformar a web "suja" (HTML, JS, CSS, Anúncios) em uma base de dados limpa e estruturada (Markdown/JSON) otimizada para o consumo de LLMs.

## Quando Usar
- Alimentação de sistemas RAG (Retrieval-Augmented Generation) com documentações externas.
- Monitoramento de mudanças em sites dinâmicos ou protegidos por anti-bot.
- Extração de dados estruturados de páginas web não estruturadas sem escrever scrapers manuais.

## Core Patterns

### 1. Headless Distillation
Não confie no HTML bruto. Utilize motores de renderização (Playwright/Puppeteer) para capturar o DOM final após a execução do JavaScript:
- **Noise Reduction:** Remova tags irrelevantes (`<nav>`, `<footer>`, `<script>`, `<style>`, `<iframe>`).
- **Markdown Conversion:** Converta o conteúdo central para Markdown para reduzir drasticamente o uso de tokens e preservar a semântica de hierarquia (H1-H6).

### 2. Structured LLM Extraction
Em vez de apenas ler o texto, utilize um esquema (Zod/JSON Schema) para forçar a IA a extrair campos específicos durante o processo de "scraping":
- **Input:** Markdown limpo da página.
- **Process:** LLM analisa o Markdown contra o Schema.
- **Output:** JSON validado pronto para integração em banco de dados.

### 3. Anti-Bot Navigation
- **Proxy Rotation:** Utilize pools de proxies para evitar bloqueios de IP.
- **Human Mimicry:** Simule movimentos de mouse e tempos de espera aleatórios.
- **Header Fingerprinting:** Utilize headers de navegadores reais para passar por verificações de integridade.

## Quick Reference
| Ferramenta | Função |
| --- | --- |
| Playwright | Renderização de JS e interação com a página |
| Firecrawl API | Crawling recursivo e conversão automática para MD |
| Turndown / Go-MD | Conversão rápida de HTML para Markdown |
| LLM (GPT-4o/Claude) | Extração de dados estruturados (JSON) |

## Erros Comuns
- **Token Waste:** Tentar enviar HTML bruto para a IA (caro e confuso).
- **Stale Content:** Não esperar o carregamento de componentes assíncronos (React/Vue) antes do scrape.
- **Rate Limiting:** Fazer requisições muito rápidas sem gerenciamento de fila.
