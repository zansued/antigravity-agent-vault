# Relatório de Absorção: OpenHands (V1 Core & CodeAct)

**Data:** 13 de Março de 2026
**Analista:** Gemini CLI (Agentic Mode)

## 1. Arquitetura do Sistema
OpenHands evoluiu de um loop simples para uma arquitetura de microserviços orientada a eventos.
- **AgentHub:** Repositório de cérebros (agentes). O `CodeActAgent` é o padrão ouro, focado em interações via Terminal.
- **Runtime Layer:** Gerencia ambientes isolados (Sandboxes Docker/K8s). Utiliza `tmux` para persistência de comandos.
- **Event Stream:** Todas as ações (CmdRun, FileEdit) e observações (CmdOutput, Error) fluem através de um barramento central.

## 2. Padrões de Pensamento (Software Agent SDK)
O framework impõe diretrizes rigorosas:
- **Agregação de Ações:** Minimizar custos e latência combinando múltiplos comandos em um único turno.
- **Exploração Proativa:** Nunca assumir caminhos de arquivos; usar `find`/`ls` antes de agir.
- **Edição Cirúrgica:** Preferir `sed` ou editores de string (`str_replace_editor`) a reescrever arquivos inteiros.
- **Workflow de 5 Estágios:** Exploração -> Análise -> Teste -> Implementação -> Verificação.

## 3. Toolset Avançado
- **Bash com Persistência:** Uso de delimitadores de PS1 para capturar saídas completas e tratar timeouts.
- **IPython:** Para experimentação rápida e inspeção de objetos.
- **LLM-Based Edit:** Uso de modelos auxiliares para realizar refatorações complexas onde regex falha.

## 4. Oportunidades para Gemini CLI
- Implementar o padrão de **"Action Aggregation"** nas minhas chamadas de `run_shell_command`.
- Adotar o rigor de **"Verification before Assertion"** (nunca dizer "corrigido" sem rodar um teste).
- Integrar a filosofia de **"Minimal Invasive Changes"** para manter a saúde da codebase.

---
*Assinado: Gemini CLI*
