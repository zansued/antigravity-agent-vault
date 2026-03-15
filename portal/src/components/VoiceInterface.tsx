import { useState, useEffect, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, Volume2, Brain, Zap, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceInterfaceProps {
  onTranscript?: (text: string) => void;
  onCommand?: (command: string) => void;
  isListening?: boolean;
  className?: string;
}

const VoiceInterface = ({ onTranscript, onCommand, isListening: externalListening, className = '' }: VoiceInterfaceProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [voiceHistory, setVoiceHistory] = useState<string[]>([]);
  const [lastTranscriptUpdate, setLastTranscriptUpdate] = useState<number>(Date.now());

  const { 
    transcript, 
    listening, 
    resetTranscript, 
    browserSupportsSpeechRecognition 
  } = useSpeechRecognition();

  // Initialize audio context
  useEffect(() => {
    const initAudio = () => {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
      }
    };
    initAudio();
    return () => {
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  const handleManualSend = useCallback((text?: string) => {
    const finalContent = text || transcript;
    if (finalContent && finalContent.trim().length > 1) {
      onCommand?.(finalContent.trim());
      setVoiceHistory(prev => [`🎯 Enviado: ${finalContent.trim().substring(0, 30)}...`, ...prev.slice(0, 9)]);
      resetTranscript();
      setLastTranscriptUpdate(Date.now());
    }
  }, [transcript, onCommand, resetTranscript]);

  // Handle transcript updates & trigger words
  useEffect(() => {
    if (transcript) {
      setLastTranscriptUpdate(Date.now());
      onTranscript?.(transcript);

      const lowerTranscript = transcript.toLowerCase();
      if (lowerTranscript.includes('metatron') || lowerTranscript.includes('mestre')) {
        const command = transcript.replace(/metatron|mestre/gi, '').trim();
        if (command.length > 3) {
          handleManualSend(command);
        }
      }
    }
  }, [transcript, onTranscript, handleManualSend]);

  // Idle Auto-send Logic
  useEffect(() => {
    if (!listening || !transcript || !transcript.trim()) return;

    const idleTimer = setInterval(() => {
      const timeSinceLastUpdate = Date.now() - lastTranscriptUpdate;
      if (timeSinceLastUpdate > 3000 && transcript.length > 15) {
        handleManualSend(transcript);
      }
    }, 1000);

    return () => clearInterval(idleTimer);
  }, [listening, transcript, lastTranscriptUpdate, handleManualSend]);

  const playFeedbackTone = useCallback((frequency: number, duration: number) => {
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      osc.frequency.value = frequency;
      osc.type = 'sine';
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.error('Failed to play tone:', error);
    }
  }, [audioContext, volume]);

  const toggleListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
      playFeedbackTone(261.63, 0.2);
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
      playFeedbackTone(329.63, 0.2);
    }
  }, [listening, playFeedbackTone]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className={`bg-red-900/20 border border-red-700/50 rounded-lg p-4 ${className}`}>
        <div className="flex items-center gap-2 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4" />
          <span>Navegador não suporta reconhecimento de voz</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className={`w-5 h-5 ${listening ? 'text-celestial-neon' : 'text-slate-500'}`} />
            {listening && (
              <motion.div 
                className="absolute -inset-1 bg-celestial-neon/30 rounded-full blur-sm"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Ritual de Voz</h3>
            <span className="text-[9px] text-slate-500 font-mono">
              {listening ? 'SINTONIZADO' : 'AGUARDANDO'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={toggleListening}
            className={`p-2 rounded-lg transition-all border ${
              listening 
                ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            {listening ? <Mic className="w-4 h-4 animate-pulse" /> : <MicOff className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => handleManualSend()}
            disabled={!transcript || transcript.trim().length < 2}
            className="p-2 rounded-lg bg-celestial-neon/20 border border-celestial-neon/30 text-celestial-neon hover:bg-celestial-neon/40 disabled:opacity-20 transition-all"
            title="Enviar Comand"
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transcript Display */}
      <div className="relative mb-4 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-celestial-neon/20 to-celestial-magic/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative p-3 bg-black/60 rounded-xl border border-white/5 min-h-[70px] flex flex-col justify-center">
          <p className="text-[11px] text-slate-300 italic font-medium leading-relaxed">
            {transcript || (listening ? "Metatron escuta suas frequências..." : "As Linhas de Ley aguardam o Mestre.")}
          </p>
          {listening && (
            <div className="mt-2 h-1 flex items-end justify-around opacity-30">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [2, Math.random() * 10 + 2, 2] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="w-[2px] bg-celestial-neon rounded-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* History */}
      <div className="space-y-1.5 max-h-[80px] overflow-y-auto custom-scrollbar pr-1">
        <AnimatePresence initial={false}>
          {voiceHistory.map((entry, i) => (
            <motion.div 
              key={i + entry}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] text-slate-500 border-l border-celestial-neon/30 pl-2 py-0.5"
            >
              {entry}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Volume Slider Small */}
      <div className="mt-3 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <Volume2 className="w-3 h-3 text-slate-400" />
        <input 
          type="range" min="0" max="1" step="0.1" value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-celestial-neon"
        />
      </div>
    </div>
  );
};

export default VoiceInterface;
