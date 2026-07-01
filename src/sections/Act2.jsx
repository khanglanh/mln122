import React from 'react';
import { motion } from 'framer-motion';
import OwnershipNetworkGraph from '../components/OwnershipNetworkGraph';

export default function Act2({ isEnglish }) {
  return (
    <section id="act2" className="min-h-screen py-20 px-4 md:px-8 bg-[#0B1020] relative flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase font-semibold text-purple-400 tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20"
          >
            {isEnglish ? "Act 2: Who Really Owns the Company?" : "Hồi 2: Ai là ông chủ thật sự"}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold mt-4 mb-4"
          >
            {isEnglish ? "The Ownership Network" : "Mạng lưới sở hữu chéo"}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {isEnglish
              ? "Public corporations are owned by shareholders, but large institutional investors hold stakes in multiple competing corporations simultaneously. This creates interlocking ownership structures."
              : "Các công ty cổ phần đại chúng được sở hữu bởi các cổ đông, nhưng các quỹ đầu tư tổ chức lớn thường đồng thời giữ cổ phần ở nhiều tập đoàn đối thủ cạnh tranh. Điều này tạo ra một mạng lưới sở hữu đan xen."}
          </motion.p>
        </div>

        {/* Ownership Network Graphic Component */}
        <OwnershipNetworkGraph isEnglish={isEnglish} />

      </div>
    </section>
  );
}
