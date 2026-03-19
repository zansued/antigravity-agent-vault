import { useState, useEffect, useCallback, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff, Volume2, Brain, Zap, AlertCircle, Radio, Activity, MessageSquare, Globe, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { neuralVoice } from '../services/voice/NeuralVoice';

interface VoiceInterfaceProps {
  onTranscript?: (text: string) => void;
  onCommand?: (command: string) => void;
  isListening?: boolean;
  className?: string;
}

const VoiceInterface = ({ onTranscript, onCommand, isListening: externalListening, className = '' }: VoiceInterfaceProps) => {
  const [isWhisperEnabled, setIsWhisperEnabled] = useState(false);
  const [isRecordingWhisper, setIsRecordingWhisper] = useState(false);
  const [isConversationalMode, setIsConversationalMode] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isTranslatorMode, setIsTranslatorMode] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('Portuguese (BR)');
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [volume, setVolume] = useState(0.7);
  const [voiceHistory, setVoiceHistory] = useState<string[]>([]);
  const [lastTranscriptUpdate, setLastTranscriptUpdate] = useState<number>(Date.now());
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleManualSend = useCallback(async (text?: string) => {
    const finalContent = text || transcript;
    if (finalContent && finalContent.trim().length > 1) {
      onCommand?.(finalContent.trim());
      setVoiceHistory(prev => [`🎯 Enviado: ${finalContent.trim().substring(0, 30)}...`, ...prev.slice(0, 9)]);
      resetTranscript();
      setLastTranscriptUpdate(Date.now());
      
      // Feedback tone
      playFeedbackTone(440, 0.1); 
    }
  }, [transcript, onCommand, resetTranscript]);

  // Handle transcript updates & trigger words
  useEffect(() => {
    if (transcript) {
      setLastTranscriptUpdate(Date.now());
      onTranscript?.(transcript);

      const lowerTranscript = transcript.toLowerCase();
      // Auto-send on trigger word "Metatron" or "Mestre"
      if (lowerTranscript.split(' ').some(word => word === 'metatron' || word === 'mestre')) {
        const command = transcript.replace(/metatron|mestre/gi, '').trim();
        if (command.length > 3) {
          handleManualSend(command);
        }
      }
    }
  }, [transcript, onTranscript, handleManualSend]);

  // Intelligent Auto-send (Auto-Transmit)
  useEffect(() => {
    if (!listening || !transcript || !transcript.trim()) {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
      return;
    }

    // Faster auto-send for short commands, slower for complex thoughts
    const getWaitTime = (len: number) => {
      if (len < 20) return 1500; // 1.5s for short bursts
      if (len < 100) return 2500; // 2.5s for sentences
      return 4000; // 4s for deep thoughts
    };

    if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    
    idleTimerRef.current = setInterval(() => {
      const timeSinceLastUpdate = Date.now() - lastTranscriptUpdate;
      if (timeSinceLastUpdate > getWaitTime(transcript.length)) {
        handleManualSend(transcript);
      }
    }, 500);

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
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
      gainNode.gain.linearRampToValueAtTime(volume * 0.1, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.error('Failed to play tone:', error);
    }
  }, [audioContext, volume]);

  const toggleStandardListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
      playFeedbackTone(261.63, 0.2);
    } else {
      SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
      playFeedbackTone(329.63, 0.2);
    }
  }, [listening, playFeedbackTone]);

  const toggleWhisperRecording = useCallback(async () => {
    if (isRecordingWhisper) {
      setIsRecordingWhisper(false);
      try {
        const audioBlob = await neuralVoice.stopRecording();
        playFeedbackTone(220, 0.2);
        
        setVoiceHistory(prev => [`🌀 Processando via Whisper...`, ...prev.slice(0, 9)]);
        const text = await neuralVoice.transcribe(audioBlob);
        if (text) onCommand?.(text);
      } catch (error) {
        console.error('Whisper recording failed:', error);
        setVoiceHistory(prev => [`❌ Erro no Whisper`, ...prev.slice(0, 9)]);
      }
    } else {
      try {
        await neuralVoice.startRecording();
        setIsRecordingWhisper(true);
        playFeedbackTone(330, 0.2);
      } catch (error) {
        console.error('Failed to start Whisper recording:', error);
        setVoiceHistory(prev => [`❌ Permissão Negada (Mic)`, ...prev.slice(0, 9)]);
      }
    }
  }, [isRecordingWhisper, playFeedbackTone, onCommand]);

  const toggleLocalSession = useCallback(async () => {
    if (isSessionActive) {
      setIsSessionActive(false);
      playFeedbackTone(220, 0.2);
      setVoiceHistory(prev => [`🌑 Metatron em Repouso`, ...prev.slice(0, 9)]);
    } else {
      try {
        setVoiceHistory(prev => [`🌟 Sintonizando Kokoro Local...`, ...prev.slice(0, 9)]);
        await neuralVoice.initKokoro();
        setIsSessionActive(true);
        playFeedbackTone(523.25, 0.3);
        setVoiceHistory(prev => [`✨ Canal Neural Ativo`, ...prev.slice(0, 9)]);
      } catch (error) {
        console.error('Failed to init local session:', error);
        setVoiceHistory(prev => [`❌ Falha no Hardware Neural`, ...prev.slice(0, 9)]);
      }
    }
  }, [isSessionActive, playFeedbackTone]);

  const handleMainAction = () => {
    if (isConversationalMode) {
      toggleLocalSession();
    } else if (isWhisperEnabled) {
      toggleWhisperRecording();
    } else {
      toggleStandardListening();
    }
  };

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
            {isRecordingWhisper ? (
              <Activity className="w-5 h-5 text-purple-400 animate-pulse" />
            ) : (
              <Brain className={`w-5 h-5 ${listening ? 'text-celestial-neon' : 'text-slate-500'}`} />
            )}
            {(listening || isRecordingWhisper) && (
              <motion.div 
                className={`absolute -inset-1 rounded-full blur-sm ${isRecordingWhisper ? 'bg-purple-500/30' : 'bg-celestial-neon/30'}`}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              Ritual de Voz 
              <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 rounded border border-sky-500/30 font-mono">NEURAL</span>
              {isWhisperEnabled && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 rounded border border-purple-500/30 font-mono">WHISPER</span>}
            </h3>
            <span className="text-[9px] text-slate-500 font-mono">
              {listening || isRecordingWhisper ? 'SINTONIZADO' : 'AGUARDANDO'}
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {/* Conversational Mode Toggle */}
          <button 
            onClick={() => {
              setIsConversationalMode(!isConversationalMode);
              if (listening) SpeechRecognition.stopListening();
            }}
            className={`p-2 rounded-lg transition-all border ${
              isConversationalMode 
                ? 'bg-celestial-magic/20 border-celestial-magic/50 text-celestial-magic shadow-[0_0_10px_rgba(139,92,246,0.3)]' 
                : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
            }`}
            title="Sintonia Neural (Tempo Real)"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Whisper Toggle */}
          {!isConversationalMode && (
            <button 
              onClick={() => setIsWhisperEnabled(!isWhisperEnabled)}
              className={`p-2 rounded-lg transition-all border ${
                isWhisperEnabled 
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' 
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
              }`}
              title="Ativar Whisper Tunnel"
            >
              <Radio className="w-4 h-4" />
            </button>
          )}

          {/* Translator Mode Toggle (Only in Conversational) */}
          {isConversationalMode && (
            <button 
              onClick={() => setIsTranslatorMode(!isTranslatorMode)}
              className={`p-2 rounded-lg transition-all border ${
                isTranslatorMode 
                  ? 'bg-orange-500/20 border-orange-500/50 text-orange-400' 
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
              }`}
              title="Modo Tradutor Orbital"
            >
              <Globe className="w-4 h-4" />
            </button>
          )}

          {/* Main Action Button */}
          <button 
            onClick={handleMainAction}
            className={`p-2 rounded-lg transition-all border ${
              (listening || isRecordingWhisper || isSessionActive)
                ? 'bg-red-500/20 border-red-500/50 text-red-400 ring-2 ring-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            {(listening || isRecordingWhisper || isSessionActive) ? <Power className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4" />}
          </button>
          
          <button 
            onClick={() => handleManualSend()}
            disabled={!transcript || transcript.trim().length < 2 || isConversationalMode}
            className="p-2 rounded-lg bg-celestial-neon/20 border border-celestial-neon/30 text-celestial-neon hover:bg-celestial-neon/40 disabled:opacity-20 transition-all"
            title="Enviar Comando"
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Translator Settings */}
      <AnimatePresence>
        {isConversationalMode && isTranslatorMode && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden"
          >
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-3 flex items-center justify-between">
              <span className="text-[10px] text-orange-300 font-mono uppercase">Língua Alvo:</span>
              <select 
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="bg-black/40 text-[10px] text-orange-200 border border-orange-500/30 rounded px-2 py-1 outline-none font-mono"
              >
                <option value="Portuguese (BR)">PORTUGUESE (BR)</option>
                <option value="English">ENGLISH</option>
                <option value="Spanish">SPANISH</option>
                <option value="French">FRENCH</option>
                <option value="German">GERMAN</option>
                <option value="Japanese">JAPANESE</option>
                <option value="Chinese">CHINESE</option>
                <option value="Italian">ITALIAN</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript Display */}
      <div className="relative mb-4 group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-celestial-neon/20 to-celestial-magic/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
        <div className={`relative p-3 bg-black/60 rounded-xl border border-white/5 min-h-[70px] flex flex-col justify-center transition-all ${isSessionActive ? 'ring-1 ring-celestial-magic/30' : ''}`}>
          <p className="text-[11px] text-slate-300 italic font-medium leading-relaxed">
            {isSessionActive ? "Canal Neural Ativo. Metatron ouve e responde simultaneamente." : (
              isRecordingWhisper ? "Sintonizando Whisper Tunnel... Fale agora." : (transcript || (listening ? "Metatron escuta suas frequências..." : "As Linhas de Ley aguardam o Mestre."))
            )}
          </p>
          {(listening || isRecordingWhisper || isSessionActive) && (
            <div className="mt-2 h-1 flex items-end justify-around opacity-30">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [2, Math.random() * 10 + 2, 2] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className={`w-[2px] rounded-full ${
                    isSessionActive ? 'bg-celestial-magic' : 
                    isRecordingWhisper ? 'bg-purple-400' : 
                    'bg-celestial-neon'
                  }`}
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
