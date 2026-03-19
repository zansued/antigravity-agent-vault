---
name: mcp-builder
description: Guia para criação de servidores MCP (Model Context Protocol) de alta performance para expandir as capacidades do Metatron.
---

# MCP Server Development (Metatron Extension)

Cria servidores MCP que permitem ao Metatron interagir com serviços externos de forma estruturada.

## Fases de Desenvolvimento

### 1. Design de Ferramentas (Tools)
- **Descoberta**: Nomes claros e descritivos (ex: `supabase_save_node`).
- **Esquema**: Use Zod ou Pydantic para validação rigorosa.

### 2. Implementação (TypeScript/Python)
- **Transport**: stdio para local, streamable HTTP para remoto.
- **Error Handling**: Mensagens acionáveis que guiam o agente para a solução.

### 3. Verificação (MCP Inspector)
- Use `npx @modelcontextprotocol/inspector` para validar ferramentas antes do deploy.

---
**Vault Integration**: Extensibilidade do Ecossistema Metatron.
