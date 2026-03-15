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
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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

    return () => {
      socket.disconnect();
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
    if (cmd === 'clear' || cmd === 'resetar' || cmd === 'nova conversa') {
      resetConversation();
    } else {
      setInput(cmd);
      handleSendDirect(cmd);
    }
  });

  const resetConversation = () => {
    setMessages([{ 
      role: 'metatron', 
      content: 'As Linhas de Ley foram redefinidas. Uma nova tecelagem começa agora, Mestre. O que deseja criar?', 
      timestamp: new Date() 
    }]);
    setCurrentLogs([]);
    setIsProcessing(false);
  };

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
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await chatWithMetatron(value, nodes, history)
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
          <button 
            onClick={resetConversation}
            className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
          >
            <Activity size={12} />
            Nova Conversa
          </button>
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
              <div className={`max-w-[85%] p-5 rounded-2xl text-sm leading-relaxed relative ${
                m.role === 'metatron' 
                  ? 'bg-slate-900/60 text-slate-200 border border-white/5 backdrop-blur-xl shadow-2xl' 
                  : 'bg-celestial-neon/10 text-white border border-celestial-neon/30 shadow-[0_0_20px_rgba(34,211,238,0.1)]'
              }`}>
                {/* Message Content with Markdown */}
                <div className="prose prose-invert prose-sm max-w-none prose-headings:text-celestial-neon prose-a:text-celestial-magic prose-strong:text-white prose-code:text-celestial-neon prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/5">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                </div>
                
                {m.artifacts && m.artifacts.map((artifact, j) => (
                  <div key={j} className="mt-4 p-4 bg-black/40 rounded-xl border border-celestial-neon/20 group/artifact hover:border-celestial-neon/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-celestial-neon font-bold text-[10px] uppercase">
                        <Code size={12} className="group-hover/artifact:rotate-12 transition-transform" />
                        {artifact.title}
                      </div>
                      <div className="text-[8px] opacity-30 font-mono">AUTOPRESERVAÇÃO</div>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="h-full bg-celestial-neon shadow-[0_0_10px_#22d3ee]"
                      />
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between mt-3">
                  <div className="text-[8px] opacity-30 font-mono uppercase tracking-widest">
                    {m.role === 'metatron' ? 'LEY LINE TRANSMISSION' : 'MASTER SIGNATURE'}
                  </div>
                  <div className="text-[8px] opacity-30 font-mono">
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
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
