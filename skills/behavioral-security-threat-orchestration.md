---
name: behavioral-security-threat-orchestration
description: Use when designing active defense systems that detect malicious behavior patterns (brute force, scraping, L7 DDoS) and automate remediation across infrastructure components.
author: Gemini CLI (inspired by CrowdSec)
---

# Behavioral Security & Threat Orchestration

## Overview
Capacidade de projetar e operar sistemas de segurança proativa que analisam o comportamento de eventos em tempo real para identificar e mitigar ameaças antes que elas causem danos, utilizando inteligência coletiva e automação de bloqueio.

## Quando Usar
- Proteção de APIs e aplicações Web contra ataques de força bruta ou preenchimento de credenciais.
- Detecção de scrapers agressivos ou robôs que tentam minerar o Canon do AxionOS.
- Orquestração de respostas de segurança automáticas (Bouncers) em firewalls, gateways ou proxies.

## Core Patterns

### 1. Leaky Bucket Analysis (Detecção por Transbordamento)
Não bloqueie no primeiro erro. Utilize a lógica de baldes com vazamento para diferenciar ruído de ataque:
- **Capacity:** Defina o limite de eventos permitidos em uma janela de tempo (ex: 5 falhas de login).
- **Leak Rate:** Permita que o contador diminua ao longo do tempo se não houver novos eventos.
- **Overflow:** Se o balde transbordar, dispare um alerta e uma decisão de remediação imediata.

### 2. Event Parsing & Enrichment
Transforme logs brutos em sinais de inteligência acionáveis:
- **Normalization:** Extraia IP de origem, timestamp e tipo de ação de logs heterogêneos.
- **Enrichment:** Adicione contexto como GeoIP, Autonomous System (AS) e reputação histórica do IP antes da tomada de decisão.

### 3. Active Remediation (The Bouncer Pattern)
Desacople a detecção da aplicação da punição:
- **Central API (LAPI):** Um hub centralizado que mantém a lista de "decisões" (ex: banir IP 1.2.3.4 por 4 horas).
- **Distributed Bouncers:** Agentes leves (no Firewall, Nginx, Cloudflare ou na App) que consultam o hub e aplicam o bloqueio de forma transparente.

## Quick Reference
| Componente | Função |
| --- | --- |
| Acquisition | Leitura de logs (File, Journald, Docker, S3) |
| Parser | Estruturação e enriquecimento de dados |
| Scenario | Lógica de detecção (YAML) baseada em comportamento |
| Decision | O veredito de segurança (Ban, Captcha, Throttle) |
| Bouncer | O executor da remediação na infraestrutura |

## Erros Comuns
- **False Positives:** Configurar baldes muito pequenos que bloqueiam usuários legítimos com conexões instáveis.
- **Stateless Detection:** Tentar detectar ataques complexos analisando eventos isoladamente sem manter um histórico de curto prazo.
- **Manual Response:** Depender de intervenção humana para ataques automatizados de alta velocidade (DDoS/Scraping).
