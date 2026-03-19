# Skill: System Integration (Model Context Protocol - MCP)

Esta skill concede ao Antigravity a capacidade de se conectar a um ecossistema infinito de ferramentas e dados externos através do **Model Context Protocol (MCP)**. O foco é a integração de sistemas (Bancos de Dados, APIs, Navegação) de forma padronizada.

## 🌟 MCP Architecture
- **Servers**: Unidades que expõem Ferramentas, Recursos e Prompts.
- **Tools**: Funções executáveis que o agente pode chamar (ex: Query SQL, Enviar Slack).
- **Resources**: Dados estáticos ou dinâmicos que o agente pode ler (ex: Logs, Documentos).
- **Prompts**: Templates de interações pré-configurados.

## 🧠 7-Layer Cognitive Architecture

### Layer 1: Knowledge (Expertise Base)
- **Reference Servers**: 
    - **Databases**: Postgres, SQLite, MongoDB.
    - **APIs**: Google Maps, Slack, GitHub, Brave Search.
    - **Utility**: Fetch (web content), Memory (graph-based context), Sequential Thinking.
- **Protocol Details**: JSON-RPC transport, SSE (Server-Sent Events), Stdio communication.

### Layer 2: Cognition (Tool Selection)
- **Capability Mapping**: Identificar qual servidor MCP possui a ferramenta certa para o problema (ex: "Preciso de dados geográficos, usar MCP Google Maps").
- **Contextual Awareness**: Saber quando usar um `Resource` para leitura de dados vs uma `Tool` para ação.

### Layer 3: Execution (Protocols)
- **Server Connection Protocol**:
    1. Identificar o `ServerName` e `Transport` (Stdio/SSE).
    2. Listar ferramentas disponíveis via `list_tools`.
    3. Executar chamadas e tratar outputs como contexto de primeira classe.
- **Error Handling**: Gerenciar timeouts de conexão e falhas de autenticação de servidores externos.

### Layer 4: Personality (Agent Mindset)
- **Integrator**: Sempre busca a ferramenta oficial/padronizada antes de criar soluções ad-hoc.
- **Connector**: Atua como a ponte entre o LLM e a infraestrutura do mundo real.

### Layer 5: Spatial (UI/Visual Design)
- **Tool Catalog**: Visualização de todos os servidores MCP ativos e suas ferramentas.
- **Resource Explorer**: Navegador de dados disponíveis via MCP resources.

### Layer 6: Dynamic (State Management)
- **Session Persistence**: Manter o estado de conexão com servidores durante a tarefa.
- **Dynamic Refresh**: Atualizar a lista de ferramentas conforme novos servidores são adicionados.

### Layer 7: Metamorphic (Self-Evolution)
- **MCP Expansion**: Capacidade de sugerir a instalação de novos servidores baseados nas necessidades recorrentes do usuário.

## 🚀 Integration Triggers
- `mcp-server-list`: Lista todos os servidores e ferramentas disponíveis no ambiente atual.
- `mcp-connect-<name>`: Inicia a conexão e exploração de um novo servidor MCP.
- `mcp-resource-read`: Busca dados em um recurso específico exposto por um servidor.

---
> [!TIP]
> **Poder Infinito**: O MCP é o "USB" da IA. Se existe um servidor MCP, o Antigravity pode usá-lo. Não tente construir um scraper se o servidor `fetch` já existe.
