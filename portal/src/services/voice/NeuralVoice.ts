
/**
 * NeuralVoice Service v2 (Worker-ized)
 * Handles local high-fidelity speech synthesis using Kokoro via Web Worker.
 */

export interface TranscriptionResponse {
  text: string;
}

export interface TTSOptions {
  voiceId?: string;
  model?: string;
  speed?: number;
}

class NeuralVoiceService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private currentAudio: HTMLAudioElement | null = null;
  private worker: Worker | null = null;
  private isInitializing: boolean = false;
  private isReady: boolean = false;
  private onReadyCallbacks: (() => void)[] = [];

  constructor() {
    // Initialize worker if in browser
    if (typeof window !== 'undefined') {
       this.initWorker();
    }
  }

  private initWorker() {
    if (this.worker) return;
    
    console.log("[NeuralVoice] Spawnando Worker Neural...");
    this.worker = new Worker(new URL('./kokoro.worker.ts', import.meta.url), {
      type: 'module'
    });

    this.worker.onmessage = (e) => {
      const { type, message, progress, audioUrl } = e.data;
      
      switch (type) {
        case "status":
          console.log(`[Metatron Worker] ${message}`);
          break;
        case "progress":
          // Could emit events for progress bars
          break;
        case "ready":
          console.log("[Metatron Worker] Motor Neural Sintonizado.");
          this.isReady = true;
          this.onReadyCallbacks.forEach(cb => cb());
          this.onReadyCallbacks = [];
          break;
        case "complete":
          this.playAudio(audioUrl);
          break;
        case "error":
          console.error(`[Metatron Worker] Erro: ${message}`);
          break;
      }
    };
  }

  private normalizeText(text: string): string {
    return text
      .replace(/(\r\n|\n|\r)/gm, " ")
      .replace(/\*\*/g, "")
      .replace(/__/g, "")
      .replace(/`[^`]*`/g, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/[#*>\-]/g, "")
      .replace(/(\.\.\.)/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  private async playAudio(url: string) {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }

    // Attempt to play using AudioContext for precise sample rate handling
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
      
      console.log("[NeuralVoice] Reproduzindo em 24kHz nativos.");
    } catch (err) {
      console.warn("[NeuralVoice] AudioContext fallback failed, using standard Audio:", err);
      this.currentAudio = new Audio(url);
      this.currentAudio.play().catch(e => console.error("[NeuralVoice] Playback failed:", e));
    }
  }

  /**
   * Initialize Kokoro TTS (Worker Init)
   */
  async initKokoro() {
    if (this.isReady || this.isInitializing) return;
    this.isInitializing = true;
    this.worker?.postMessage({ type: "init" });
  }

  /**
   * Primary Speech Engine: Kokoro (Worker Off-thread)
   */
  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    const cleanText = this.normalizeText(text);
    if (!cleanText) return;

    if (!this.isReady) {
      console.warn("[NeuralVoice] Motor não está pronto. Carregando e usando Web Speech de fallback.");
      this.initKokoro();
      this.webSpeechFallback(cleanText, options);
      return;
    }

    this.worker?.postMessage({ 
      type: "generate", 
      text: cleanText, 
      voiceId: options.voiceId || "am_adam" 
    });
  }

  private webSpeechFallback(text: string, options: TTSOptions) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = options.speed || 1.1;
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang === 'pt-BR');
    if (ptVoice) utterance.voice = ptVoice;
    window.speechSynthesis.speak(utterance);
  }


  /**
   * Audio Recording for Whisper (Optional/Online)
   */
  async startRecording(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];
    this.mediaRecorder.ondataavailable = (event) => this.audioChunks.push(event.data);
    this.mediaRecorder.start();
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) return reject('Recorder not initialized');
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mpeg' });
        resolve(audioBlob);
      };
      this.mediaRecorder.stop();
    });
  }

  /**
   * Transcribe via Browser Speech Recognition (Free/Local)
   * This is used by VoiceInterface.tsx directly via react-speech-recognition
   */
  async transcribe(audioBlob: Blob): Promise<string> {
    // If user specifically wants server-side Whisper, we keep this, 
    // but recommend browser-native for free use.
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.mp3');
      const response = await fetch('/api/metatron-whisper', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Transcription failed');
      const data = await response.json();
      return data.text || '';
    } catch (error) {
      console.error('[NeuralVoice] Whisper failed:', error);
      return "O Vazio não conseguiu processar sua voz remotamente.";
    }
  }
}

export const neuralVoice = new NeuralVoiceService();
