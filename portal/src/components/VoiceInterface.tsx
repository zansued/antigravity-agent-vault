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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [voiceHistory, setVoiceHistory] = useState<string[]>([]);
  const [commandMode, setCommandMode] = useState<'metatron' | 'system'>('metatron');

  const { 
    transcript, 
    listening, 
    resetTranscript, 
    browserSupportsSpeechRecognition, 
    isMicrophoneAvailable 
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

  // Handle transcript updates
  useEffect(() => {
    if (transcript && transcript.trim()) {
      onTranscript?.(transcript);

      const lowerTranscript = transcript.toLowerCase();

      // METATRON commands
      if (commandMode === 'metatron') {
        if (lowerTranscript.includes('metatron') || lowerTranscript.includes('mestre')) {
          const command = transcript.replace(/metatron|mestre/gi, '').trim();
          if (command) {
            onCommand?.(command);
            addToHistory(`🎯 Comando: ${command}`);
            resetTranscript(); // Clear after command
          }
        }

        // Mode switching
        if (lowerTranscript.includes('modo sistema')) {
          setCommandMode('system');
          addToHistory('🔄 Modo alterado para: Sistema');
          playFeedbackTone(440, 0.3);
        }
      }

      // System commands
      if (commandMode === 'system') {
        if (lowerTranscript.includes('voltar metatron')) {
          setCommandMode('metatron');
          addToHistory('🔄 Modo alterado para: METATRON');
          playFeedbackTone(523.25, 0.3);
        }
      }
    }
  }, [transcript, commandMode, onTranscript, onCommand, resetTranscript]);

  const addToHistory = useCallback((message: string) => {
    setVoiceHistory(prev => [message, ...prev.slice(0, 9)]);
  }, []);

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

  const startListening = useCallback(() => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
    playFeedbackTone(329.63, 0.2);
    addToHistory('🎤 Escuta ativada');
  }, [playFeedbackTone, addToHistory]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    playFeedbackTone(261.63, 0.2);
    addToHistory('⏸️ Escuta pausada');
  }, [playFeedbackTone, addToHistory]);

  const toggleListening = useCallback(() => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  }, [listening, startListening, stopListening]);

  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = volume;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
      addToHistory(`🗣️ METATRON: "${text.substring(0, 50)}..."`);
    }
  }, [volume, addToHistory]);

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
    <div className={`bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl ${className}`}>
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
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Interface de Voz</h3>
            <span className="text-[10px] text-slate-500 tracking-tighter">
              {listening ? 'SINTONIZADO' : 'EM ESPERA'} • {commandMode.toUpperCase()}
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
        </div>
      </div>

      {/* Transcript Display */}
      <div className="relative mb-4 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-celestial-neon/20 to-celestial-magic/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className="relative p-3 bg-black/60 rounded-xl border border-white/5 min-h-[60px] flex flex-col justify-center overflow-hidden">
          {listening && (
            <div className="absolute bottom-0 left-0 right-0 h-1 flex items-end justify-around px-2 opacity-50">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    height: [2, Math.random() * 15 + 5, 2],
                    backgroundColor: i % 2 === 0 ? '#22d3ee' : '#818cf8'
                  }}
                  transition={{ 
                    duration: 0.5 + Math.random() * 0.5, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="w-[2px] rounded-full"
                />
              ))}
            </div>
          )}
          <p className="text-[11px] text-slate-300 italic font-medium leading-relaxed">
            {transcript || (listening ? "Ouvindo as constelações do código..." : "O Metatron aguarda seu chamado.")}
          </p>
        </div>
      </div>

      {/* Volume & History */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group">
            <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-celestial-neon transition-colors" />
          </div>
          <div className="flex-1 relative h-6 flex items-center">
            <input 
              type="range" min="0" max="1" step="0.05" value={volume} 
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-celestial-neon z-10"
            />
            <div 
              className="absolute left-0 h-1 bg-gradient-to-r from-celestial-neon to-celestial-magic rounded-lg pointer-events-none"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5 max-h-[120px] overflow-y-auto custom-scrollbar pr-1">
          <AnimatePresence initial={false}>
            {voiceHistory.map((entry, i) => (
              <motion.div 
                key={i + entry}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[10px] text-slate-500 border-l-2 border-celestial-neon/20 pl-3 py-1 bg-white/[0.02] rounded-r-lg hover:bg-white/[0.05] transition-colors"
              >
                {entry}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
