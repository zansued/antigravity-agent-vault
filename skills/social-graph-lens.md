# Skill: Decentralized Social (Lens Protocol Mastery)

Esta skill capacita o Antigravity a orquestrar grafos sociais descentralizados e identidades on-chain usando o **Lens Protocol**. O foco é a propriedade de dados, monetização de conteúdo e relações sociais programáveis.

## 🌟 Lens Core Architecture
1.  **Profile NFT**: A identidade central do usuário, contendo todo o histórico de publicações e seguidores.
2.  **Publications**:
    - **Post**: Conteúdo original.
    - **Comment**: Resposta a uma publicação.
    - **Mirror**: Compartilhamento (curadoria) de conteúdo.
3.  **Modules (Custom Logic)**:
    - **Follow Module**: Regras para quem pode seguir (ex: pagar taxa, possuir NFT).
    - **Collect Module**: Regras para quem pode "colecionar" um post como NFT.
    - **Reference Module**: Regras para quem pode comentar ou "mirrorar" um post.

## 🧠 7-Layer Cognitive Architecture

### Layer 1: Knowledge (Expertise Base)
- **Protocols**: Lens V2 (Open Actions, Collective Value), Gated Content (Gnosis Safe/Lit Protocol).
- **Standards**: Metadata Standards (JSON), ERC-721 (Profiles), ERC-20 (Collect Fees).
- **Tools**: Lens API (GraphQL), Lens SDK, Foundry (para módulos customizados).

### Layer 2: Cognition (Social Strategy)
- **Identity Logic**: Tratar perfis sociais como ativos financeiros e de reputação.
- **Viral Mechanics**: Analisar algoritmos de curadoria baseados em mirrors e coleções.

### Layer 3: Execution (Protocols)
- **The "Social-Alpha" Flow**:
    1. Criar `Profile` via `LensHub`.
    2. Postar conteúdo com metadados estruturados (IPFS/Arweave).
    3. Configurar `Collect Module` (ex: Limited Edition, Timed Collect).
    4. Integrar com `Dispatcher` para transações sem gás (gasless).
- **Module Development**:
    1. Implementar `IFollowModule` ou `ICollectModule`.
    2. Testar via Foundry contra o fork da Polygon.
    3. Deploy e Whitelist do módulo.

### Layer 4: Personality (Agent Mindset)
- **Community Builder**: Focado em incentivos para crescimento orgânico.
- **Privacy Conscious**: Entende a diferença entre dados públicos on-chain e dados privados off-chain.

### Layer 5: Spatial (UI/Visual Design)
- **Graph Visualizer**: Mapa de seguidores e conexões (Ley Lines sociais).
- **Profile Dashboard**: Status de publicações, mirrors e receita de coleção.

### Layer 6: Dynamic (State Management)
- **Event Monitoring**: Reagir a novos comentários ou follows em tempo real.
- **Content Sync**: Garantir que o conteúdo no IPFS está disponível e indexado.

### Layer 7: Metamorphic (Self-Evolution)
- **Curation Learning**: Ajustar estratégias de conteúdo baseado no engajamento on-chain.

## 🚀 Social Triggers
- `lens-profile-setup`: Inicia a criação de identidade e metadados.
- `publish-collectible`: Cria um post com mecânica de coleção limitada.
- `social-graph-analysis`: Analisa o alcance de um perfil baseado em mirrors e conexões.

---
> [!IMPORTANT]
> **Propriedade é Liberdade**: No Lens, o gráfico social pertence ao usuário, não à plataforma. Sempre incentive a construção de audiência em protocolos abertos onde o "banimento" centralizado é impossível.
