import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, DollarSign, ArrowRight } from 'lucide-react';
import MoneyFlowAnimation from '../components/MoneyFlowAnimation';
import productsData from '../data/products.json';
import cocaImg from '../assets/coca.png';
import pepsiImg from '../assets/pepsi.png';

export default function Act1({ isEnglish, onContinue }) {
  const cokePrice = productsData.find(p => p.id === 'coca_cola')?.price || 13000;
  const pepsiPrice = productsData.find(p => p.id === 'pepsi')?.price || 15000;

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isFlowComplete, setIsFlowComplete] = useState(false);

  const selectBrand = (brandId) => {
    const brand = productsData.find(p => p.id === brandId);
    setSelectedBrand(brand);
    setIsFlowComplete(false);
  };

  const handleBackToSelect = () => {
    setSelectedBrand(null);
    setIsFlowComplete(false);
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
                <img src={cocaImg} className="h-32 object-contain filter drop-shadow-[0_10px_20px_rgba(239,68,68,0.3)] group-hover:scale-105 transition-transform duration-300" alt="Coca-Cola" />
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
                <img src={pepsiImg} className="h-32 object-contain filter drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform duration-300" alt="PepsiCo" />
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
            className="w-full space-y-8"
          >
            <div className="flex justify-start">
              <button 
                onClick={handleBackToSelect}
                className="px-4 py-2 text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg border border-white/10 cursor-pointer"
              >
                {isEnglish ? "← Back to Brand Selection" : "← Quay lại chọn thương hiệu"}
              </button>
            </div>
            
            <MoneyFlowAnimation 
              brand={selectedBrand} 
              isEnglish={isEnglish} 
              onComplete={() => setIsFlowComplete(true)} 
            />

            {isFlowComplete && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="max-w-2xl mx-auto w-full mt-10"
              >
                <div className="glass-panel rounded-2xl p-8 border-2 border-red-500/20 bg-gradient-to-b from-red-950/10 via-slate-950/50 to-slate-950/80 text-center relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
                  
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400 mx-auto mb-4">
                    <DollarSign size={24} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight text-red-400">
                    {isEnglish ? "We successfully traced the money." : "Chúng ta đã theo dấu dòng tiền thành công."}
                  </h3>
                  
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 max-w-lg mx-auto">
                    {isEnglish
                      ? "Half of your payment goes to retail, shipping, and storage. Another portion sustains the factory and workforce. But one crucial mystery remains: who actually receives the corporate profits and dividends?"
                      : "Một nửa số tiền bạn trả dùng cho bán lẻ, giao nhận và lưu kho. Một phần khác duy trì nhà máy và người lao động. Nhưng một câu hỏi cốt lõi vẫn chưa được trả lời: ai thực sự nhận được phần thặng dư lợi nhuận khổng lồ này?"}
                  </p>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                  <button
                    onClick={onContinue}
                    className="px-8 py-3.5 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer border border-white/10"
                  >
                    <span>{isEnglish ? "Continue Investigation" : "Tiếp tục điều tra"}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
