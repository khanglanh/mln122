import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ChevronDown, Compass } from 'lucide-react';
import CanvasParticles from '../components/CanvasParticles';

export default function Hero({ onStartClick, isEnglish }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 bg-[#0B1020] overflow-hidden">
      {/* Background Interactive Particles */}
      <CanvasParticles />

      {/* Decorative blurred rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl glow-bg pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl glow-bg pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Course tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Compass size={14} className="animate-spin-slow" />
          <span>{isEnglish ? "Marxist Political Economy Coursework" : "Học liệu môn Kinh tế chính trị Mác–Lênin"}</span>
        </motion.div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tight uppercase leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300"
        >
          THE PUPPET MASTERS
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-2xl mt-6 max-w-2xl font-light italic leading-relaxed"
        >
          {isEnglish 
            ? "\"When you buy a Coca-Cola or Pepsi, where does the money eventually go?\""
            : "\"Khi bạn mua một lon Coca-Cola hay Pepsi, số tiền đó cuối cùng sẽ chảy về đâu?\""}
        </motion.p>

        {/* Subtitle description explaining viewpoint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-gray-500 text-xs md:text-sm mt-4 max-w-lg leading-relaxed font-mono"
        >
          {isEnglish 
            ? "Follow the money. Discover who owns the profits. An interactive simulation mapping institutional shareholding and financialization in modern capitalism."
            : "Đi theo dòng tiền. Khám phá chủ sở hữu lợi nhuận. Trực quan tương tác mô phỏng cơ chế cổ đông định chế và sự tài chính hóa của chủ nghĩa tư bản."}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10"
        >
          <button
            onClick={onStartClick}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>{isEnglish ? "Start Investigation" : "Bắt đầu cuộc điều tra"}</span>
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Disclaimers & Ethics */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4 pointer-events-none">
        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono bg-slate-950/40 p-2 rounded-lg border border-white/5">
          <ShieldAlert size={14} className="text-amber-500/80 shrink-0" />
          <span>
            {isEnglish 
              ? "Academic model. Visualizes shareholding networks, not conspiracy assertions."
              : "Mô hình học thuật. Trực quan hóa cấu trúc sở hữu chéo, không khẳng định tuyệt đối."}
          </span>
        </div>
      </div>
    </section>
  );
}
