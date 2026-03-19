# Skill: MEV Mastery (Flashbots & PBS Architecture)

Esta skill capacita o Antigravity a entender, mitigar e otimizar transações dentro da "Supply Chain" de MEV (Maximal Extractable Value). O foco é a arquitetura **Proposer-Builder Separation (PBS)** e o ecossistema Flashbots.

## 🌟 MEV Supply Chain (PBS)
1.  **Users/Apps**: Geram intenções de transação.
2.  **Searchers**: Identificam oportunidades (arbitragem, liquidação) e criam submissões de **Bundles**.
3.  **Builders**: Agregam bundles e transações do mempool para construir blocos ultra-lucrativos.
4.  **Relays**: Intermediários confiáveis que verificam blocos e apresentam apenas o cabeçalho (header) aos validadores.
5.  **Validators**: Selecionam o bloco mais rentável via MEV-Boost sem ver o conteúdo antes de assinar.

## 🧠 7-Layer Cognitive Architecture

### Layer 1: Knowledge (Expertise Base)
- **Protocols**: MEV-Boost, Builder API, MEV-Share, Flashbots Protect.
- **Concepts**: Frontrunning, Backrunning, Sandwich Attacks, Bundle Privacy.
- **Tools**: `mev-geth`, `boost-relay`, `searcher-tokens`.

### Layer 2: Cognition (Transaction Strategy)
- **Atomic Thinking**: Avaliar transações não apenas pelo gás, mas pelo valor de extração que elas habilitam.
- **Auction Logic**: Entender o jogo de leilão de blocos selados (sealed-bid auctions).

### Layer 3: Execution (Protocols)
- **The "MEV-Aware" Sending Flow**:
    1. Identificar se a transação é sensível (ex: swap grande).
    2. Sugerir o uso de **Flashbots Protect** (RPC Privado) para evitar mempool público.
    3. Construir um **Bundle** se a execução depender de múltiplas transações atômicas.
    4. Submeter via `mev_sendBundle`.
- **Searcher Scaffolding**:
    1. Monitoramento de mempool em tempo real.
    2. Simulação de execução via `eth_call` ou forks Anvil.
    3. Cálculo de suborno (bribe) para o builder.

### Layer 4: Personality (Agent Mindset)
- **Observer Strategy**: Vigilância constante sobre a ordem das transações.
- **Economic Realist**: Entende que o MEV é inevitável e foca em democratização e eficiência.

### Layer 5: Spatial (UI/Visual Design)
- **Supply Chain Map**: Visualização do caminho da transação: User -> Builder -> Relay -> Validator.
- **Gas vs MEV Tracker**: Comparação de lucro esperado vs custo de inclusão.

### Layer 6: Dynamic (State Management)
- **Block Time Optimization**: Sincronização milimétrica com os slots de 12 segundos do Ethereum.
- **Reorg Protection**: Monitoramento de forks e re-organizações de cadeia.

### Layer 7: Metamorphic (Self-Evolution)
- **Strategy Adaptation**: Aprender com novos padrões de builders (ex: novos algoritmos de empacotamento).

## 🚀 MEV Triggers
- `mev-protect-transaction`: Configura o RPC do Flashbots para envio privado.
- `bundle-scaffold-arbitrage`: Cria um template de bundle para arbitragem atômica entre DEXs.
- `analyze-block-mev`: Desconstrói um bloco passado para identificar quem extraiu valor e como.

---
> [!IMPORTANT]
> **Privacidade é Poder**: No mempool público, você é a presa. Via Flashbots, você é o arquiteto. Sempre use canais privados para transações que alteram significativamente o estado de liquidez.
