import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, DollarSign } from 'lucide-react';
import MoneyFlowAnimation from '../components/MoneyFlowAnimation';
import productsData from '../data/products.json';

export default function Act1({ isEnglish }) {
  const cokePrice = productsData.find(p => p.id === 'coca_cola')?.price || 13000;
  const pepsiPrice = productsData.find(p => p.id === 'pepsi')?.price || 15000;

  const [selectedBrand, setSelectedBrand] = useState(null);

  const selectBrand = (brandId) => {
    const brand = productsData.find(p => p.id === brandId);
    setSelectedBrand(brand);
  };

  return (
    <section id="act1" className="min-h-screen py-14 px-4 md:px-8 bg-[#0B1020] relative flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase font-semibold text-blue-400 tracking-widest bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20"
          >
            {isEnglish ? "Act 1: Follow the Money" : "Hồi 1: Theo dấu dòng tiền"}
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold mt-4 mb-4"
          >
            {isEnglish ? "The Consumer's Choice" : "Lựa chọn của người tiêu dùng"}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {isEnglish
              ? "Every purchase triggers a network of transactions. Select a brand below to buy a can and trace the money through retail margins, logistical distributions, and corporate holdings."
              : "Mỗi hành vi mua hàng đều kích hoạt một chuỗi giao dịch. Hãy chọn một thương hiệu dưới đây để mua một lon nước và bắt đầu theo dấu dòng tiền qua các biên lợi nhuận bán lẻ, kho bãi và cổ phần tập đoàn."}
          </motion.p>
        </div>

        {/* Product Cards selection */}
        {!selectedBrand ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Coca-Cola Card */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => selectBrand('coca_cola')}
              className="glass-panel rounded-2xl p-6 border-red-500/10 hover:border-red-500/30 bg-red-950/5 relative overflow-hidden flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-gray-500 font-mono">GLOBAL BRAND A</span>
                <div className="p-2 bg-red-500/10 text-red-400 rounded-lg group-hover:scale-110 transition-transform">
                  <Sparkles size={16} />
                </div>
              </div>

              {/* Product Mock Representation */}
              <div className="my-10 flex flex-col items-center">
                <div className="w-16 h-32 bg-gradient-to-b from-red-600 to-red-800 rounded-xl relative shadow-2xl flex items-center justify-center border border-red-500/40">
                  <div className="absolute top-2 w-full h-1 bg-white/20" />
                  <span className="text-white font-black text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">COCA-COLA</span>
                  <div className="absolute bottom-2 w-full h-2 bg-black/20" />
                </div>
                <h3 className="text-xl font-bold mt-6 text-gray-100">Coca-Cola</h3>
                <p className="text-xs text-gray-400 italic mt-1">"{isEnglish ? "Real Magic" : "Phép màu đích thực"}"</p>
              </div>

              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-white/5">
                <span className="text-xs font-semibold text-gray-400">{isEnglish ? "Retail Price" : "Giá bán lẻ"}</span>
                <span className="text-sm font-bold text-red-400">{cokePrice.toLocaleString()} VND</span>
              </div>
            </motion.div>

            {/* Pepsi Card */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => selectBrand('pepsi')}
              className="glass-panel rounded-2xl p-6 border-blue-500/10 hover:border-blue-500/30 bg-blue-950/5 relative overflow-hidden flex flex-col justify-between cursor-pointer group transition-all"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-start">
                <span className="text-[10px] text-gray-500 font-mono">GLOBAL BRAND B</span>
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg group-hover:scale-110 transition-transform">
                  <Sparkles size={16} />
                </div>
              </div>

              {/* Product Mock Representation */}
              <div className="my-10 flex flex-col items-center">
                <div className="w-16 h-32 bg-gradient-to-b from-blue-600 to-blue-800 rounded-xl relative shadow-2xl flex items-center justify-center border border-blue-500/40">
                  <div className="absolute top-2 w-full h-1 bg-white/20" />
                  <span className="text-white font-black text-sm tracking-widest rotate-90 origin-center whitespace-nowrap">PEPSICO</span>
                  <div className="absolute bottom-2 w-full h-2 bg-black/20" />
                </div>
                <h3 className="text-xl font-bold mt-6 text-gray-100">PepsiCo</h3>
                <p className="text-xs text-gray-400 italic mt-1">"{isEnglish ? "Thirsty for More" : "Đã quá Pepsi ơi"}"</p>
              </div>

              <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-white/5">
                <span className="text-xs font-semibold text-gray-400">{isEnglish ? "Retail Price" : "Giá bán lẻ"}</span>
                <span className="text-sm font-bold text-blue-400">{pepsiPrice.toLocaleString()} VND</span>
              </div>
            </motion.div>

          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="flex justify-start mb-4">
              <button 
                onClick={() => setSelectedBrand(null)}
                className="px-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 cursor-pointer"
              >
                {isEnglish ? "← Back to Brand Selection" : "← Quay lại chọn thương hiệu"}
              </button>
            </div>
            <MoneyFlowAnimation brand={selectedBrand} isEnglish={isEnglish} />
          </motion.div>
        )}

      </div>
    </section>
  );
}
