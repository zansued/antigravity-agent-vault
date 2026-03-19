
import { KokoroTTS } from "kokoro-js";
import { detectWebGPU } from "../../utils/gpu";

let tts: any = null;
const model_id = "onnx-community/Kokoro-82M-v1.0-ONNX";

async function init() {
  try {
    const hasWebGPU = await detectWebGPU();
    const device = hasWebGPU ? "webgpu" : "wasm";
    
    self.postMessage({ type: "status", message: `Despertando hardware (${device})...` });
    
    tts = await KokoroTTS.from_pretrained(model_id, {
      dtype: device === "wasm" ? "q8" : "fp32",
      device,
      progress_callback: (progress: any) => {
        if (progress.status === 'progress') {
           self.postMessage({ type: "progress", progress: progress.loaded / progress.total });
        }
      }
    });

    self.postMessage({ type: "ready", voices: tts.voices });
  } catch (err: any) {
    self.postMessage({ type: "error", message: err.message });
  }
}

self.onmessage = async (e) => {
  const { type, text, voiceId } = e.data;

  if (type === "init") {
    await init();
  } else if (type === "generate") {
    if (!tts) {
      self.postMessage({ type: "error", message: "Motor não inicializado." });
      return;
    }

    try {
      self.postMessage({ type: "status", message: "Processando frequências..." });
      const audio = await tts.generate(text, { 
        voice: voiceId || "am_adam", // Deeper male voice for Metatron
        speed: 0.9 // Slightly slower for more gravitas
      });
      const blob = audio.toBlob();
      
      // Send result back
      self.postMessage({ 
        type: "complete", 
        audioUrl: URL.createObjectURL(blob), 
        text 
      });
    } catch (err: any) {
      self.postMessage({ type: "error", message: err.message });
    }
  }
};
