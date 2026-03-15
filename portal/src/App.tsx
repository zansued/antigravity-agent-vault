import { RegistryPanel } from './components/RegistryPanel'
import { RitualConsole } from './components/RitualConsole'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden selection:bg-celestial-neon/30 selection:text-celestial-neon">
      {/* Visual background elements */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-celestial-void via-slate-950 to-slate-900 -z-10" />
      
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex overflow-hidden"
      >
        {/* Sidebar / Book Navigation Placeholder (Left) */}
        <div className="hidden lg:flex w-16 border-r border-white/5 bg-slate-950/50 flex-col items-center py-8 gap-8">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-celestial-neon to-celestial-magic animate-pulse shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
        </div>

        {/* Main Interface */}
        <RitualConsole />
        
        {/* Knowledge Panel (Right) */}
        <RegistryPanel />
      </motion.main>
    </div>
  )
}

export default App
