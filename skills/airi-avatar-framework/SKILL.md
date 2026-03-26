---
name: airi-avatar-framework
description: Architectural patterns and implementation guides based on Moeru AI's AIRI for creating high-fidelity, autonomous, and multi-modal AI characters.
---

# AIRI Avatar Framework Skill

This skill captures the "Soul Container" philosophy of Project AIRI, focusing on multi-modal autonomy, modularity, and web-native high performance.

## 🌟 The "Soul Container" Philosophy
An avatar is not just a chatbot with a face. It is a "Living Being" with:
- **Brain**: Pluggable LLM engines with stateful memory and tool-use (Minecraft, Factorio, etc.).
- **Ears/Mouth**: Low-latency STT (Whisper) and TTS (ElevenLabs, VibeVoice) with VAD (Voice Activity Detection).
- **Body**: Support for VRM (3D) and Live2D, with automatic physical behaviors (blink, look-at, idle movements).

## 🛠️ Architectural Patterns

### 1. Standardized Provider Store
Don't hardcode API calls. Use a provider-based store pattern to easily swap services.
```typescript
interface SpeechProvider {
  id: string;
  name: string;
  speak: (text: string) => Promise<void>;
}
```

### 2. Eventa (Type-safe IPC/RPC)
Use a centralized event bus for communication between the "Brain" and the "Body".
- `OnCharacterSpeak`: Triggers lip-sync.
- `OnUserDetected`: Triggers "look-at" behavior.

### 3. WebGPU & WASM Optimization
Move heavy inference (like VAD or small LLMs) to the browser using:
- **Transformers.js**: For local STT.
- **WebGPU**: For rendering high-fidelity avatars.

## 🚀 "Neuro-sama" Inspired Behaviors
- **Proactive Conversation**: The avatar shouldn't always wait for a prompt.
- **Environmental Awareness**: React to window changes, clipboard content, or game state.
- **Physical Prosody**: Sync body expressions (emotions) with the vocal tone and content intensity.

## 💻 Code Patterns

### provider-style structure
```typescript
export const useAiriBrain = defineStore('airi-brain', () => {
  const currentProvider = ref<Provider>('openai');
  const chat = async (message: string) => {
    // Orchestrate between memory, tools, and LLM
  };
  return { chat };
});
```

### Motion Sync
Always map audio frequency ranges to specific visemes (mouth shapes) for realistic speech.

## 📚 References
- [moeru-ai/airi](https://github.com/moeru-ai/airi)
- [Neuro-sama (Inspiration)](https://www.youtube.com/@Neurosama)
