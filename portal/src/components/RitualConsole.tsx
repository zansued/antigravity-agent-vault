import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Send, Command, Bot, User, Code, Activity } from 'lucide-react'
import { VoiceLoader } from './VoiceLoader'
import { chatWithMetatron } from '../services/deepseek'
import { BoltParser, Artifact } from '../utils/BoltParser'
import { io, Socket } from 'socket.io-client'
import { supabase } from '../lib/supabase'
import VoiceInterface from './VoiceInterface'
import { useVoiceCommands } from '../hooks/useVoiceCommands'

interface RealtimeLog {
  type: 'info' | 'success' | 'stdout' | 'stderr'
  message: string
}

interface Message {
  role: 'metatron' | 'user'
  content: string
  timestamp: Date
  artifacts?: Artifact[]
  logs?: RealtimeLog[]
}

// Interface para os dados do Nodos do Supabase Realtime
interface SupabaseNode {
  id: string;
  name: string;
  type: string;
  metadata?: any;
  created_at: string;
}

export function RitualConsole() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'metatron', content: 'As Linhas de Ley estão sintonizadas. Posso criar ou modificar minha própria interface para você. O que deseja tecer hoje, Mestre?', timestamp: new Date() }
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [loadingText, setLoadingText] = useState("MEDITANDO")
  const [nodes, setNodes] = useState<SupabaseNode[]>([])
  const [currentLogs, setCurrentLogs] = useState<RealtimeLog[]>([])
  const [isVoiceOpen, setIsVoiceOpen] = useState(true)
  const socketRef = useRef<Socket | null>(null)
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Conectar ao Gateway Realtime do Metatron (Socket.io)
    const socket = io();
    socketRef.current = socket;

    // Listener para logs de processos do backend (Autopoiesis, Shell)
    socket.on('log', (log: RealtimeLog) => {
      setCurrentLogs(prev => [...prev, log].slice(-50)); // Mantém os últimos 50 logs
    });

    // Listener para atualizações de Nodos do Supabase Realtime via Socket.io
    socket.on('knowledge_update', (newNode: SupabaseNode) => {
      console.log('[Metatron] Node update received via Socket.io:', newNode);
      setNodes(prevNodes => {
        const exists = prevNodes.some(node => node.id === newNode.id);
        if (exists) {
          // Atualiza nodo existente
          return prevNodes.map(node => node.id === newNode.id ? newNode : node);
        } else {
          // Adiciona novo nodo
          return [...prevNodes, newNode];
        }
      });
    });

    // Listener para atualizações de Links do Supabase Realtime via Socket.io
    socket.on('link_update', (newLink: any) => {
      console.log('[Metatron] Link update received via Socket.io:', newLink);
      // Futuramente, adicionar lógica para atualizar ou adicionar links no estado se necessário.
    });

    // Conectar e Inscrever no Supabase Realtime diretamente
    const channelName = `metatron-nodes-${Math.random().toString(36).substring(7)}`;
    const channel = supabase.channel(channelName);

    channel.on('postgres_changes', {
      event: '*', 
      schema: 'public',
      table: 'geminicli_knowledge_nodes'
    }, (payload: any) => {
      console.log('[Supabase Realtime] Node change detected directly:', payload);
      // Atualiza o estado dos nodos com a mudança recebida do Supabase
      setNodes(prevNodes => {
        if (payload.eventType === 'INSERT') {
          return [...prevNodes, payload.new as SupabaseNode];
        } else if (payload.eventType === 'UPDATE') {
          return prevNodes.map(node => node.id === payload.new.id ? payload.new as SupabaseNode : node);
        } else if (payload.eventType === 'DELETE') {
          return prevNodes.filter(node => node.id !== payload.old.id);
        }
        return prevNodes;
      });
    }).subscribe((status: string, err?: any) => {
      if (status === 'SUBSCRIBED') {
        console.log('[Supabase Realtime] Inscrito com sucesso nos nodos diretamente.');
      } else {
        console.error(`[Supabase Realtime] Erro na inscrição direta (${status}):`, err);
        if (status === 'CHANNEL_ERROR') {
          console.warn('[Metatron] Tentando reconectar Linhas de Ley...');
          setTimeout(() => channel.subscribe(), 5000);
        }
      }
    });

    return () => {
      socket.disconnect();
      supabase.removeChannel(channel);
    }
  }, []) // Dependência vazia para executar apenas na montagem

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentLogs]);

  const executeArtifacts = async (artifacts: Artifact[]) => {
    setCurrentLogs([]); // Limpa logs anteriores
    for (const artifact of artifacts) {
      setLoadingText(`CONSTRUINDO: ${artifact.title.toUpperCase()}`)
      for (const action of artifact.actions) {
        try {
          await fetch('/api/metatron-action', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(action)
          })
        } catch (e) {
          console.error('[Metatron Action] Falha na execução:', e)
        }
      }
    }
  };

  const { processText } = useVoiceCommands((cmd) => {
    if (cmd === 'clear') {
      setMessages([{ role: 'metatron', content: 'Console limpo, Mestre.', timestamp: new Date() }]);
    } else {
      setInput(cmd);
      handleSendDirect(cmd);
    }
  });

  const handleSendDirect = async (overrideValue?: string) => {
    const value = overrideValue || input;
    if (!value.trim() || isProcessing) return
    
    const userMsg: Message = { role: 'user', content: value, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsProcessing(true)
    setLoadingText("MEDITANDO")
    setCurrentLogs([]);

    try {
      const response = await chatWithMetatron(value, nodes)
      const artifacts = BoltParser.parse(response);
      
      if (artifacts.length > 0) {
        await executeArtifacts(artifacts);
        setMessages(prev => [...prev, { 
          role: 'metatron', 
          content: 'As Runas foram tecidas com sucesso. O fluxo de dados está em tempo real.', 
          timestamp: new Date(),
          artifacts,
          logs: currentLogs
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'metatron', content: response, timestamp: new Date() }])
      }

    } catch (error) {
      console.error('Erro no chat:', error)
      setMessages(prev => [...prev, { role: 'metatron', content: 'Erro na conexão neural.', timestamp: new Date() }])
    } finally {
      setIsProcessing(false)
    }
  };

  const handleSend = () => handleSendDirect();

  return (
    <div className="flex-1 flex flex-col p-8 relative overflow-hidden">
      <VoiceLoader isActive={isProcessing} text={loadingText} />

      {/* Hero Welcome */}
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-2"
        >
          <div className="p-2 rounded-lg bg-celestial-neon/10 border border-celestial-neon/20">
            <Terminal className="w-5 h-5 text-celestial-neon" />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">
            Console de Ritual
          </h1>
        </motion.div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-slate-950/50 backdrop-blur-md border border-white/5 rounded-3xl p-6 mb-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                m.role === 'metatron' ? 'bg-celestial-neon/10 border-celestial-neon/30 text-celestial-neon' : 'bg-white/5 border-white/10 text-white'
              }`}>
                {m.role === 'metatron' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                m.role === 'metatron' 
                  ? 'bg-slate-900/80 text-slate-200 border border-white/5' 
                  : 'bg-celestial-neon/20 text-white border border-celestial-neon/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]'
              }`}>
                {m.content}
                
                {m.artifacts && m.artifacts.map((artifact, j) => (
                  <div key={j} className="mt-4 p-3 bg-slate-950 rounded-xl border border-celestial-neon/20">
                    <div className="flex items-center gap-2 text-celestial-neon font-bold text-[10px] uppercase mb-2">
                      <Code size={12} />
                      {artifact.title}
                    </div>
                  </div>
                ))}

                <div className="text-[8px] mt-2 opacity-30 font-mono">
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Realtime Stream Panel */}
        {currentLogs.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-4 p-4 bg-black/60 rounded-2xl border border-celestial-magic/30 font-mono text-[10px]"
          >
            <div className="flex items-center gap-2 text-celestial-magic mb-3 animate-pulse">
              <Activity size={14} />
              <span>FLUXO DE DADOS EM TEMPO REAL</span>
            </div>
            <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
              {currentLogs.map((log, idx) => (
                <div key={idx} className={
                  log.type === 'stderr' ? 'text-red-400' : 
                  log.type === 'success' ? 'text-emerald-400' : 'text-slate-300'
                }>
                  <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  {log.message}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="relative z-20">
        <div className="relative flex items-center gap-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-2 pl-6 shadow-2xl group transition-all focus-within:border-celestial-neon/50">
          <div className="flex items-center gap-2 mr-2">
            <Command className="w-5 h-5 text-slate-500" />
            <button 
              onClick={() => setIsVoiceOpen(!isVoiceOpen)}
              className={`p-2 rounded-lg transition-all ${isVoiceOpen ? 'bg-celestial-neon/20 text-celestial-neon' : 'text-slate-500 hover:text-white'}`}
              title="Alternar Interface de Voz"
            >
              <Activity size={16} />
            </button>
          </div>
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Comande o Metatron (ex: 'teça um componente de áudio')..."
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-white font-medium placeholder:text-slate-600 py-3 disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isProcessing}
            className="p-3 bg-celestial-neon text-black rounded-xl hover:bg-white transition-all active:scale-95 disabled:opacity-50 font-bold flex items-center gap-2"
          >
            <span className="hidden sm:inline">TECER</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating Voice Interface - Improved Positioning */}
      <AnimatePresence>
        {isVoiceOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 left-8 w-80 z-[100]"
          >
            <div className="relative">
              {/* Close Button for Voice Card */}
              <button 
                onClick={() => setIsVoiceOpen(false)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:text-white z-10"
              >
                ×
              </button>
              <VoiceInterface 
                onCommand={(cmd) => {
                  const processed = processText(cmd);
                  if (!processed) {
                    handleSendDirect(cmd);
                  }
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
