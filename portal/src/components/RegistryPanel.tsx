import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Wrench, 
  Server, 
  Database, 
  FolderGit2, 
  Network, 
  Blocks, 
  Globe, 
  Layers, 
  Monitor, 
  Sparkles,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react'

const supabase = createClient(
  'https://supa.techstorebrasil.com',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewogICJyb2xlIjogInNlcnZpY2Vfcm9sZSIsCiAgImlzcyI6ICJzdXBhYmFzZSIsCiAgImlhdCI6IDE3MTUwNTA4MDAsCiAgImV4cCI6IDE4NzI4MTcyMDAKfQ.1w168CO-icK3_NsOLyNllE35tVAKmv5ygfnE_AgbMGs'
)

const getNodeConfig = (type: string) => {
  const normalizedType = (type || '').toUpperCase()
  switch (normalizedType) {
    case 'CONCEPT': return { icon: Brain, color: 'text-purple-400', border: 'border-purple-500/30', glow: 'shadow-purple-500/20' }
    case 'TOOL': return { icon: Wrench, color: 'text-orange-400', border: 'border-orange-500/30', glow: 'shadow-orange-500/20' }
    case 'SERVER': return { icon: Server, color: 'text-green-400', border: 'border-green-500/30', glow: 'shadow-green-500/20' }
    case 'DATABASE': return { icon: Database, color: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-blue-500/20' }
    case 'PROJECT': return { icon: FolderGit2, color: 'text-pink-400', border: 'border-pink-500/30', glow: 'shadow-pink-500/20' }
    case 'ORCHESTRATOR': return { icon: Network, color: 'text-celestial-neon', border: 'border-celestial-neon/30', glow: 'shadow-celestial-neon/20' }
    case 'MODULE': return { icon: Blocks, color: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'shadow-yellow-500/20' }
    case 'DOMAIN': return { icon: Globe, color: 'text-indigo-400', border: 'border-indigo-500/30', glow: 'shadow-indigo-500/20' }
    case 'FRAMEWORK': return { icon: Layers, color: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-red-500/20' }
    case 'INTERFACE': return { icon: Monitor, color: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-cyan-500/20' }
    default: return { icon: Sparkles, color: 'text-celestial-gold', border: 'border-celestial-gold/30', glow: 'shadow-celestial-gold/20' }
  }
}

export function RegistryPanel() {
  const [nodes, setNodes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNodes = async () => {
      const { data } = await supabase.from('geminicli_knowledge_nodes').select('*').order('created_at', { ascending: false })
      if (data) {
        setNodes(data)
        setLoading(false)
      }
    }
    fetchNodes()

    const channel = supabase.channel('registry-sync-v2')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'geminicli_knowledge_nodes' }, fetchNodes)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  return (
    <div className="w-96 h-full bg-slate-950/90 backdrop-blur-2xl border-l border-white/5 flex flex-col overflow-hidden relative shadow-2xl">
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.1),transparent_50%)] pointer-events-none" />

      {/* Header Section */}
      <div className="p-6 pb-2 border-b border-white/5 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-celestial-neon drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            </motion.div>
            <h2 className="text-lg font-black italic tracking-tighter text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
              Metatron Book
            </h2>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-celestial-neon/10 border border-celestial-neon/20 text-[10px] font-bold text-celestial-neon animate-pulse-glow uppercase">
            LIVE SYNC
          </div>
        </div>
        <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-4">
          Conhecimento tecendo a realidade.
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar relative z-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-24 w-full rounded-2xl bg-white/5 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
            ))
          ) : (
            nodes.map((node, index) => {
              const { icon: Icon, color, border, glow } = getNodeConfig(node.type)
              
              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                  whileHover={{ scale: 1.02 }}
                  className="group relative"
                >
                  {/* Outer Glow Effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-md ${glow}`} />
                  
                  {/* Card Main Body */}
                  <div className={`
                    relative bg-slate-900/40 backdrop-blur-md border border-white/10 
                    p-4 rounded-2xl overflow-hidden transition-all duration-300
                    hover:bg-slate-800/60 hover:border-white/20
                    ${border}
                  `}>
                    
                    {/* Background Beam Effect */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-celestial-neon to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-border-beam" />

                    <div className="flex items-start gap-4">
                      {/* Icon Hexagon-like container */}
                      <div className={`
                        relative w-12 h-12 flex items-center justify-center rounded-xl 
                        bg-slate-950/80 border border-white/5 group-hover:border-white/20
                        transition-transform duration-500 group-hover:rotate-12
                      `}>
                        <Icon className={`w-6 h-6 ${color} drop-shadow-[0_0_8px_currentColor]`} />
                        
                        {/* Status Beacon */}
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 ${color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`} />
                      </div>

                      {/* Info Section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-mono text-slate-500 tracking-tighter uppercase">
                            #{String(node.id).slice(0, 4)}
                          </span>
                          <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                        
                        <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors truncate mb-1">
                          {node.name}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] font-bold ${color} uppercase tracking-widest`}>
                            {node.type}
                          </div>
                          <span className="text-[9px] text-slate-600 font-mono">
                            {new Date(node.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Meta Data Tooltip-like reveal */}
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      whileHover={{ height: 'auto', opacity: 1 }}
                      className="mt-3 pt-3 border-t border-white/5 overflow-hidden"
                    >
                      <div className="flex items-center gap-2 text-[10px] text-slate-400">
                        <Info className="w-3 h-3" />
                        <span className="italic">Nível de Sincronia: 100% (Metatron Ledger)</span>
                      </div>
                    </motion.div>

                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Stats */}
      <div className="p-4 bg-white/5 border-t border-white/5 text-center">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Conselho dos Agentes | {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>
    </div>
  )
}
