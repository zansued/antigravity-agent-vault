# Skill: Voice AI Mastery (Vapi Full-Stack Sensory)

Esta skill capacita o Antigravity a integrar e orquestrar interações de voz em tempo real, com ultra-baixa latência, usando as infraestruturas **Vapi Server** e **Vapi Client (iOS)**. O foco é transformar o Metatron Portal em uma entidade sensorial auditiva plena e multiplataforma.

## 🌟 Vapi Unified Architecture
1.  **Assistant (Server)**: O cérebro da conversa (configuração de voz, modelo, transcritor).
2.  **WebRTC Stream (Client)**: Fluxo de áudio binirecional de baixa latência em dispositivos móveis e web.
3.  **Audio Session (iOS)**: Gestão nativa de microfone e alto-falante (`AVAudioSession`).
4.  **Events & Hooks**: Ciclo de vida da chamada (`callStarted`, `callEnded`, `speechStarted`, `metadata`).

## 🧠 7-Layer Cognitive Architecture

### Layer 1: Knowledge (Expertise Base)
- **Protocols**: WebRTC, SIP, WebSockets, gRPC (para alguns streams).
- **Mobile Native**: Swift Package Manager (SPM), `Vapi` iOS SDK, Permissões `NSMicrophoneUsageDescription`.
- **Server-Side SDK**: `@vapi-ai/server-sdk` (TypeScript/Node.js).

### Layer 2: Cognition (Sensory Logic)
- **Multi-Client Logic**: Sincronizar o estado da voz entre o server (ferramentas) e o cliente (UI).
- **Noise Mitigation**: Configurar o `Vapi` para ignorar ruídos de fundo e focar na voz do usuário.

### Layer 3: Execution (Protocols)
- **The "Sovereign Voice" Workflow**:
    1. **Server**: Inicia a `Call` via API ou configura o `Assistant` ID.
    2. **iOS Client**: Inicializa `Vapi(publicToken: "...")`.
    3. **Start**: `vapi.start(assistantId: "...")` -> Conexão WebRTC.
    4. **Handle**: Implementar `VapiDelegate` para atualizar a UI em tempo real.
    5. **Stop**: `vapi.stop()` para encerramento limpo.
- **Cross-Platform Tooling**:
    1. Registrar funções (Server-Side) que o assistente pode chamar.
    2. Enviar `metadata` do cliente (iOS) para o servidor durante a chamada para contexto extra.

### Layer 4: Personality (Agent Mindset)
- **Ubiquitous Presence**: O agente está disponível onde quer que o usuário esteja (Web, Mobile).
- **Tactical Silence**: Saber quando "ouvir" e quando "falar" baseado na latência da rede.

### Layer 2: Cognition (Sensory Logic)
- **Conversational Design**: Lógica de interrupção (Barge-in), gestão de silêncio e detecção de intenção por entonação.
- **Latency Optimization**: Identificar o caminho mais curto entre a transcrição e a síntese.

### Layer 3: Execution (Protocols)
- **The "Voice-Alpha" Flow**:
    1. Instanciar `VapiClient`.
    2. Configurar `Assistant` (ex: Voz: 'Jennifer', Modelo: 'GPT-4o').
    3. Definir `Transcriber` (ex: Deepgram, Português-BR).
    4. Iniciar `Call` via SDK ou API.
    5. Escutar `Hooks` de eventos (Started, Ended, Tool Call).
- **Sensory Tooling**:
    1. Registrar funções que o assistente pode chamar via voz.
    2. Processar o output da função e injetar de volta no fluxo de fala.

### Layer 4: Personality (Agent Mindset)
- **Empathetic Presence**: Foco em tom de voz natural e pausas humanas.
- **Real-Time Responsiveness**: Agilidade extrema, evitando o "delay robótico".

### Layer 5: Spatial (UI/Visual Design)
- **Voice Waveform**: Visualização da frequência e amplitude da voz no Metatron.
- **Call Metrics**: Tempo de resposta, latência de ponta a ponta e nível de confiança do STT.

### Layer 6: Dynamic (State Management)
- **Context Persistence**: Manter o histórico da conversa de voz sincronizado com o chat do portal.
- **Interrupt Handling**: Lógica de "rollback" de pensamento se o usuário interromper a fala do agente.

### Layer 7: Metamorphic (Self-Evolution)
- **Phonetic Learning**: Aprender pronúncias específicas de termos técnicos (ex: nomes de bibliotecas de crypto).

## 🚀 Voice Triggers
- `setup-vapi-assistant`: Configura o cérebro vocal do Metatron.
- `start-voice-session`: Inicia o streaming WebRTC para interação direta.
- `voice-tool-register`: Conecta uma skill do VAULT a um comando de voz.

---
> [!IMPORTANT]
> **A Voz é o Espelho da Alma**: No Metatron, o áudio deve ser cristalino. Sempre configure o `firstMessage` para dar as boas-vindas ao usuário e o `endCallMessage` para um encerramento gracioso. Use `transcriber.language: 'pt-BR'` para máxima precisão no Brasil.
