# ABSORPTION_REPORT: Firecrawl (v1)

## Analysis Date: 2026-03-13
## Target: https://github.com/mendableai/firecrawl

### 🏗️ Architecture
O `firecrawl` é uma infraestrutura distribuída de extração de dados web. A arquitetura é centrada em uma API TypeScript (Node.js) que orquestra microserviços especializados:
- **Go HTML-to-MD:** Um conversor de alta performance para reduzir tokens.
- **Playwright Service:** Gerenciamento de headless browsers em escala.
- **LLM Engine:** Integração para extração estruturada de dados diretamente do DOM.

### 🔑 Key Findings
- **Token Efficiency:** A conversão agressiva de HTML para Markdown é o segredo para a performance do agente ao consumir dados da web.
- **Dynamic Scrapers:** O uso de schemas (JSON) permite que a IA faça o "scraping" sem precisar de regras CSS/XPath rígidas.
- **Anti-Bot Resilience:** Implementação de estratégias avançadas de navegação e proxy.

### 🚀 Extracted Skills
- **Web Harvesting Specialist:** Extração de conhecimento de sites complexos.
- **LLM Context Optimizer:** Conversão inteligente de dados para formatos densos em tokens.
