import React from 'react';
import { motion } from 'framer-motion';
import OwnershipNetworkGraph from '../components/OwnershipNetworkGraph';

export default function Act2({ isEnglish }) {
  return (
    <section id="act2" className="min-h-screen py-16 px-4 md:px-8 bg-[#0B1020] relative flex flex-col justify-center border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase font-semibold text-purple-400 tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20 animate-pulse"
          >
            {isEnglish ? "Act 2: Who Really Holds the Power?" : "Hồi 2: Ai thật sự nắm quyền?"}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold mt-4 mb-3 tracking-tight text-white"
          >
            {isEnglish ? "Who Really Holds the Power?" : "Hồi 2: Ai thật sự nắm quyền?"}
          </motion.h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-xs md:text-sm">
            {isEnglish 
              ? "Not who owns the most on paper, but who can coordinate proxy voting power."
              : "Không phải ai sở hữu nhiều nhất trên giấy, mà là ai có thể phối hợp quyền biểu quyết."}
          </p>
        </div>

        {/* Ownership Network Graph Graphic Component */}
        <OwnershipNetworkGraph isEnglish={isEnglish} />

      </div>
    </section>
  );
}
