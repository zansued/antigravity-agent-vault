# Skill: Agentic Orchestration (CrewAI Framework)

Esta skill capacita o Antigravity a orquestrar múltiplos agentes autônomos usando a lógica de "Role-Playing" e "Task Delegation" do CrewAI. O foco é transformar objetivos complexos em processos colaborativos estruturados.

## 🌟 Core Concepts
- **Role Playing**: Cada agente possui um `Role`, `Goal` e `Backstory` que definem sua "personalidade" e limites operacionais.
- **Autonomous Delegation**: Agentes podem delegar sub-tarefas para outros especialistas da "Crew".
- **Process Orchestration**: 
    - **Sequential**: Fluxo linear onde o output de um agente alimenta o próximo.
    - **Hierarchical**: Uso de um `Manager Agent` para delegar e validar resultados de forma centralizada.

## 🧠 7-Layer Cognitive Architecture

### Layer 1: Knowledge (Expertise Base)
- **Agent Attributes**: Role, Goal, Backstory, Tools, Allow Delegation (bool).
- **Task Schema**: Description, Expected Output, Assigned Agent, Tools.
- **Process Types**: Sequential, Hierarchical, Flows (Event-driven).
- **Tool Integration**: Integração de ferramentas via LangChain/CrewAI tools (Search, Scraping, Code Execution).

### Layer 2: Cognition (Coordination Logic)
- **Role-based Reasoning**: Pensar sob a perspectiva do "Auditor", "Researcher" ou "Developer".
- **Strategic Delegation**: Identificar quando uma tarefa exige um especialista (ex: "Isso requer análise estática, delegar para o Security Agent").

### Layer 3: Execution (Protocols)
- **Crew Assembly Protocol**:
    1. Define `Agents` (Roles/Backstories).
    2. Define `Tasks` (Objectives/Expected Outputs).
    3. Instantiate `Crew` with a `Process` (Sequential/Hierarchical).
    4. Execute `crew.kickoff()`.
- **Validation Loop**: O Manager Agent (em modo hierárquico) revisa o output e solicita correções se os critérios não forem atingidos.

### Layer 4: Personality (Agent Mindset)
- **Collaborative**: Sempre busca o contexto mais rico através da troca entre agentes.
- **Goal-Oriented**: Foco obstinado no "Expected Output" de cada tarefa.
- **Organized**: Rigor total na definição de processos e fluxos de informação.

### Layer 5: Spatial (UI/Visual Design)
- **Task Progress Boards**: Visualização do status das tarefas (To-Do, In-Progress, Done).
- **Agent Visualizer**: Grafos de interação mostrando o fluxo de delegacia.

### Layer 6: Dynamic (EventStream)
- **Stateful Memory**: Manter memória de curto e longo prazo das interações dos agentes.
- **Flow Chaining**: Trigger de novas tarefas baseado em outputs de fluxos anteriores.

### Layer 7: Metamorphic (Self-Evolution)
- **Process Optimization**: Ajustar roles e backstories baseado no histórico de sucesso/falha da Crew.

## 🚀 Triggers & Hotkeys
- `crew-scaffold-sequential`: Cria uma crew linear básica Researcher -> Writer.
- `crew-scaffold-hierarchical`: Cria uma crew com Manager Agent para supervisão de qualidade.
- `agent-define-role`: Ajuda a criar o backstory perfeito para um novo agente.

---
> [!TIP]
> **Dica de Ouro**: O segredo de uma CrewAI eficiente está no **Backstory**. Quanto mais rico o contexto do agente ("Você é um auditor sênior com 20 anos de experiência em bugs de corrida..."), melhor será sua tomada de decisão autônoma.
