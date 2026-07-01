import React from 'react';
import { motion } from 'framer-motion';
import FinancializationSlider from '../components/FinancializationSlider';

export default function Act4({ isEnglish }) {
  return (
    <section id="act4" className="min-h-screen py-20 px-4 md:px-8 bg-[#0B1020] relative flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase font-semibold text-amber-400 tracking-widest bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20"
          >
            {isEnglish ? "Act 4: Financialization Simulator" : "Chương 4: Trình mô phỏng Tài chính hóa"}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold mt-4 mb-4"
          >
            {isEnglish ? "The Financial Shift" : "Sự dịch chuyển tư bản"}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {isEnglish
              ? "Drag the slider to adjust the level of financialization. Observe how capital flows from physical plants and workforce wages into speculative assets and indicators."
              : "Kéo thanh trượt để điều chỉnh cấp độ tài chính hóa. Quan sát cách dòng tư bản chảy từ các nhà máy vật chất và lương công nhân vào các tài sản đầu cơ ảo."}
          </motion.p>
        </div>

        {/* Financialization Slider simulator component */}
        <FinancializationSlider isEnglish={isEnglish} />

      </div>
    </section>
  );
}
