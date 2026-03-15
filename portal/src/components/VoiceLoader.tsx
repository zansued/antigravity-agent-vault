import * as React from "react";
import { motion } from "framer-motion";

interface VoiceLoaderProps {
  size?: number; 
  text?: string;
  isActive: boolean;
}

export const VoiceLoader: React.FC<VoiceLoaderProps> = ({ size = 180, text = "SINTONIZANDO", isActive }) => {
  if (!isActive) return null;

  const letters = text.split("");

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xl">
      <div
        className="relative flex items-center justify-center font-bold select-none tracking-[0.2em]"
        style={{ width: size, height: size }}
      >
        {/* Glowing Circle with complex shadow animation */}
        <motion.div
          animate={{ 
            rotate: 360,
            boxShadow: [
              "inset 0 6px 12px 0 #38bdf8, inset 0 12px 18px 0 #005dff, inset 0 36px 36px 0 #1e40af",
              "inset 0 6px 12px 0 #60a5fa, inset 0 12px 6px 0 #0284c7, inset 0 24px 36px 0 #005dff",
              "inset 0 6px 12px 0 #4dc8fd, inset 0 12px 18px 0 #005dff, inset 0 36px 36px 0 #1e40af"
            ]
          }}
          transition={{ 
            rotate: { duration: 5, repeat: Infinity, ease: "linear" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute inset-0 rounded-full border border-white/5"
        />

        {/* Animated Letters */}
        <div className="flex gap-1 relative z-10">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0.4, y: 0 }}
              animate={{ 
                opacity: [0.4, 1, 0.4],
                y: [0, -5, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.1,
                ease: "easeInOut"
              }}
              className="inline-block text-white text-xs font-mono drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Outer Pulse */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -inset-4 rounded-full bg-celestial-neon/5 blur-2xl"
        />
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 text-[10px] text-slate-500 font-mono tracking-[0.5em] uppercase"
      >
        O Metatron está processando a luz...
      </motion.p>
    </div>
  );
};
