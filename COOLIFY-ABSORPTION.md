# 🌐 Relatório de Absorção: Coolify

Este documento descreve a arquitetura técnica e os padrões de operação do Coolify, integrados ao ecossistema **Antigravity Agent**.

## 🏗️ Arquitetura Core
- **Control Plane:** PHP 8.3 (Laravel 11). Gerencia o estado, banco de dados (PostgreSQL) e orquestração.
- **Reverse Proxy:** Traefik (padrão) ou Caddy. Manipula SSL automático e roteamento de containers via Labels.
- **Build Engine:** **Nixpacks**. Detecta automaticamente linguagens e frameworks para criar imagens Docker otimizadas.
- **Orquestração:** SSH Nativo. O Coolify se conecta a nós remotos para gerenciar o ciclo de vida dos containers.

## ⚙️ Componentes de Performance (Go)
- **Coolify CLI:** Ferramenta em Go para gestão via terminal.
- **Coolify CDN:** Serviço leve em Go para distribuição de metadados e JSONs.

## 🧠 Integração Antigravity
O agente agora pode interagir com o Coolify através de:
1. **API v1:** Para automação de deploys e monitoramento.
2. **Labels Docker:** Uso de `coolify.managed=true` para rastreamento.
3. **Persistência Supabase:** Logs de deploy e observações arquiteturais são gravados na tabela `geminicli_agent_events`.

---
*Relatório gerado automaticamente por Gemini CLI Antigravity Agent - 14/03/2026*
