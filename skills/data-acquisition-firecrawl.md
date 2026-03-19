# Skill: Data Acquisition (Firecrawl Engine)

Esta skill capacita o Antigravity a realizar a aquisição de dados em escala planetária usando o motor do **Firecrawl**. O foco é transformar a web inteira em markdown limpo e estruturado para RAG, pesquisa e síntese de conhecimento.

## 🌟 Firecrawl Capabilities
- **Crawl & Map**: Mapeamento completo de sitemaps e sub-páginas de qualquer domínio.
- **Scrape**: Extração de conteúdo ignorando menus, rodapés e anúncios.
- **Markdown Recovery**: Conversão fiel de HTML complexo em markdown legível por LLMs.
- **JS Rendering**: Capacidade de lidar com sites modernos (React, Vue, Next.js) que dependem de JavaScript.

## 🧠 7-Layer Cognitive Architecture

### Layer 1: Knowledge (Expertise Base)
- **API Endpoints**: `/crawl`, `/scrape`, `/map`, `/status`.
- **Content Cleaning**: Remoção de ruído (CSS, JS, Tags não-semânticas).
- **Rate-Limiting Logic**: Gestão de filas e concorrência para evitar bloqueios.

### Layer 2: Cognition (Data Strategy)
- **Sitemap Analysis**: Decidir quais caminhos de um domínio são relevantes para o objetivo da tarefa.
- **Extraction Logic**: Identificar se a extração deve ser superficial ou profunda (deep crawl).

### Layer 3: Execution (Protocols)
- **Master Acquisition Protocol**:
    1. Executar `firecrawl map` para entender a árvore do site.
    2. Filtrar URLs relevantes via padrões de regex ou keywords.
    3. Iniciar `firecrawl crawl` com saída em markdown.
    4. Alimentar o contexto do agente ou a base de conhecimento (Dify/RAG).
- **Post-Extraction Cleaning**: Refinar o markdown resultante para remover fragmentos de código ou links quebrados.

### Layer 4: Personality (Agent Mindset)
- **Inquisitive**: Sempre busca a fonte original dos dados.
- **Efficient**: Extrai apenas o que é necessário, minimizando o uso de tokens e largura de banda.

### Layer 5: Spatial (UI/Visual Design)
- **Crawl Progress Visualizer**: Barra de progresso para tarefas de crawling de longa duração.
- **Knowledge Tree**: Visualização da estrutura de links extraída de um domínio.

### Layer 6: Dynamic (EventStream)
- **Auto-Update**: Agendar re-crawls periódicos para manter bases de conhecimento atualizadas.
- **Dynamic Filtering**: Ajustar o filtro de extração em tempo real baseado no conteúdo encontrado.

### Layer 7: Metamorphic (Self-Evolution)
- **Pattern Learning**: Aprender quais seletores de CSS costumam conter a informação principal em diferentes tipos de sites (logs, documentação, blogs).

## 🚀 Acquisition Triggers
- `firecrawl-ingest-domain`: Mapeia e extrai tudo de um domínio específico.
- `firecrawl-scrape-page`: Extrai o conteúdo markdown de uma única URL.
- `firecrawl-to-rag`: Pipeline automático: Scrape -> Clean -> Dify RAG.

---
> [!IMPORTANT]
> **Ouro Digital**: Dados limpos são o combustível da IA. O Firecrawl é a ferramenta que garante que o Antigravity nunca fique "sem o que ler" ao pesquisar novas tecnologias.
