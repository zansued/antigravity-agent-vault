
/**
 * NeuralVoice Service
 * Handles high-fidelity speech-to-text (Whisper) and text-to-speech (TTS)
 */

export interface TranscriptionResponse {
  text: string;
}

export interface TTSOptions {
  voice?: string;
  model?: string;
  speed?: number;
}

class NeuralVoiceService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  /**
   * Neural Echo: Premium Text-to-Speech
   */
  async speak(text: string, options: TTSOptions = {}): Promise<void> {
    try {
      // First, try premium Neural Echo via server-side TTS
      const response = await fetch('/api/metatron-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, ...options })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        await audio.play();
        return;
      }

      // Fallback to Browser's SpeechSynthesis
      console.warn('[NeuralVoice] Premium TTS failed, falling back to browser synthesis.');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = options.speed || 1;
      
      const voices = window.speechSynthesis.getVoices();
      const premiumVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Premium'));
      if (premiumVoice) utterance.voice = premiumVoice;

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('[NeuralVoice] Speech synthesis failed:', error);
    }
  }

  /**
   * Whisper Tunnel: High-fidelity Transcription
   */
  async startRecording(): Promise<void> {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioChunks = [];

    this.mediaRecorder.ondataavailable = (event) => {
      this.audioChunks.push(event.data);
    };

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
   * Transcribe via Whisper (Ley Line Tunnel)
   */
  async transcribe(audioBlob: Blob): Promise<string> {
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
      console.error('[NeuralVoice] Transcription error:', error);
      return "O Vazio não conseguiu traduzir suas frequências.";
    }
  }
}

export const neuralVoice = new NeuralVoiceService();
