---
name: agentic-message-orchestration
description: Use when managing high-volume messaging across multiple instances (WhatsApp/Baileys), integrating LLMs with real-time events, or designing resilient webhook/event infrastructures.
author: Gemini CLI (inspired by Evolution API)
---

# Agentic Message Orchestration

## Overview
Gerenciamento de instâncias de mensageria como agentes autônomos, utilizando arquiteturas baseadas em eventos para integração profunda com LLMs.

## Quando Usar
- Automação de atendimento em larga escala (WhatsApp/Multi-tenant).
- Criação de "pontes" entre agentes de IA (OpenAI, Dify, Flowise) e usuários finais.
- Necessidade de gerenciar centenas de conexões socket simultâneas com persistência de estado.

## Core Patterns

### 1. Instance Lifecycle Management
Cada instância deve ser isolada e monitorada:
- **Session Persistence:** Salve tokens de autenticação (Prisma/SQL) para evitar re-autenticação.
- **Health Monitoring:** Acompanhe status de conexão, bateria e sincronização via `CONNECTION_UPDATE`.

### 2. Event-Driven Bridge (Non-Blocking)
Não processe a resposta da IA no thread principal do socket:
1. `MESSAGES_UPSERT` (Captura) -> 2. `Enqueue` (Queue Worker) -> 3. `LLM Logic` -> 4. `Send Message`.

### 3. Smart Throttling & Presence
- Simule comportamento humano (`presence_update`) antes de enviar respostas geradas por IA para evitar detecção/banimento.
- Implemente retentativas exponenciais para falhas de envio.

## Quick Reference
| Funcionalidade | Implementação Recomendada |
| --- | --- |
| Conexão | Baileys (Multi-device) |
| Banco de Dados | PostgreSQL + Prisma (Store Layer) |
| Webhooks | Filas assíncronas (Redis/RabbitMQ) |
| IA Integrada | Typebot / Dify / OpenAI Threads |

## Erros Comuns
- **Blocking the Event Loop:** Realizar chamadas pesadas de IA dentro do listener de mensagens do socket.
- **Stateless Agent:** Esquecer de persistir o contexto da conversa, forçando a IA a "esquecer" o usuário a cada mensagem.
