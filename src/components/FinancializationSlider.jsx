import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Factory, TrendingUp, Users, AlertTriangle, Coins, RefreshCw } from 'lucide-react';
import config from '../data/financialization.json';

export default function FinancializationSlider({ isEnglish }) {
  const [sliderValue, setSliderValue] = useState(30); // Start at 30% financialization

  // Calculations based on slider value
  const financializationLevel = sliderValue;
  const productionLevel = 100 - financializationLevel;

  // Metrics
  const productiveEconomyScore = Math.max(10, Math.round(productionLevel * 1.1));
  const financialAssetsVal = (1.0 + (financializationLevel / 100) * 4.5).toFixed(2);
  const employmentCount = Math.max(2, Math.round(productionLevel * 1.5));
  const speculativeActivity = Math.round(financializationLevel * 2.2);

  // Warning thresholds
  const isWarning = financializationLevel >= config.warning_threshold && financializationLevel < config.bubble_threshold;
  const isBubble = financializationLevel >= config.bubble_threshold;

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Visual Simulation Canvas */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between min-h-[460px] relative overflow-hidden">
          
          {/* Background Glows based on state */}
          <div className="absolute inset-0 pointer-events-none transition-all duration-500">
            {isBubble ? (
              <div className="absolute inset-0 bg-red-950/20 blur-3xl rounded-full scale-75 opacity-40 transition-all" />
            ) : isWarning ? (
              <div className="absolute inset-0 bg-yellow-950/10 blur-3xl rounded-full scale-75 opacity-30 transition-all" />
            ) : (
              <div className="absolute inset-0 bg-blue-950/10 blur-3xl rounded-full scale-75 opacity-30 transition-all" />
            )}
          </div>

          <div className="relative z-10 flex justify-between items-center mb-6">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              {isEnglish ? "Interactive System Sandbox" : "Hộp cát hệ thống tương tác"}
            </span>
            <div className="flex items-center gap-1 bg-slate-900 border border-white/10 px-3 py-1 rounded-full text-xs text-amber-400 font-bold">
              <Coins size={14} />
              <span>{isEnglish ? "Total Capital Pool: 100 Units" : "Tổng lượng tư bản: 100 Đơn vị"}</span>
            </div>
          </div>

          {/* Graphical splits: Factory vs Stock Exchange */}
          <div className="relative z-10 grid grid-cols-2 gap-8 my-6 items-stretch">
            
            {/* Real Factory building */}
            <motion.div 
              animate={{ 
                scale: 0.8 + (productionLevel / 100) * 0.35,
                opacity: 0.3 + (productionLevel / 100) * 0.7 
              }}
              transition={{ type: 'spring', stiffness: 80 }}
              className="p-5 rounded-2xl bg-emerald-950/15 border border-emerald-500/20 flex flex-col items-center justify-center text-center relative"
            >
              <motion.div 
                animate={{ 
                  y: [0, -5, 0],
                  filter: productionLevel < 25 ? 'grayscale(1)' : 'grayscale(0)'
                }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 mb-4"
              >
                <Factory size={32} />
              </motion.div>
              <h4 className="text-sm font-extrabold text-emerald-300">{isEnglish ? "Productive Plant" : "Nhà máy sản xuất"}</h4>
              
              {/* Workers Grid */}
              <div className="grid grid-cols-5 gap-1.5 mt-4 min-h-[40px]">
                {Array.from({ length: Math.min(15, Math.ceil(employmentCount / 10)) }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="text-emerald-400"
                  >
                    <Users size={12} />
                  </motion.div>
                ))}
              </div>

              <div className="text-[11px] text-gray-500 mt-2 font-mono">
                {isEnglish ? `Allocation: ${productionLevel} units` : `Phân bổ: ${productionLevel} đơn vị`}
              </div>
            </motion.div>

            {/* Financial Asset building */}
            <motion.div 
              animate={{ 
                scale: 0.8 + (financializationLevel / 100) * 0.35,
                opacity: 0.3 + (financializationLevel / 100) * 0.7 
              }}
              transition={{ type: 'spring', stiffness: 80 }}
              className="p-5 rounded-2xl bg-purple-950/15 border border-purple-500/20 flex flex-col items-center justify-center text-center relative"
            >
              <motion.div 
                animate={{ 
                  scale: isBubble ? [1, 1.08, 1] : 1,
                  boxShadow: isBubble ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'none'
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${isBubble ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-purple-500/10 border-purple-500/30 text-purple-400'}`}
              >
                <TrendingUp size={32} />
              </motion.div>
              <h4 className="text-sm font-extrabold text-purple-300">
                {isBubble ? (isEnglish ? "Speculative Bubble" : "Bong bóng đầu cơ") : (isEnglish ? "Financial Assets" : "Thị trường tài sản")}
              </h4>

              {/* Floating Asset Coins */}
              <div className="flex gap-1.5 mt-4 min-h-[40px] flex-wrap justify-center max-w-[140px]">
                {Array.from({ length: Math.min(15, Math.ceil(speculativeActivity / 15)) }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                    className={isBubble ? "text-red-400" : "text-purple-400"}
                  >
                    <Coins size={12} />
                  </motion.div>
                ))}
              </div>

              <div className="text-[11px] text-gray-500 mt-2 font-mono">
                {isEnglish ? `Allocation: ${financializationLevel} units` : `Phân bổ: ${financializationLevel} đơn vị`}
              </div>
            </motion.div>

          </div>

          {/* Alerts / Warning logs */}
          <div className="relative z-10 min-h-[60px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isBubble && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs flex items-center gap-2 max-w-lg"
                >
                  <AlertTriangle size={18} className="shrink-0 animate-bounce" />
                  <span>{isEnglish ? config.bubble_msg.en : config.bubble_msg.vi}</span>
                </motion.div>
              )}
              {isWarning && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 p-3 rounded-xl text-xs flex items-center gap-2 max-w-lg"
                >
                  <AlertTriangle size={18} className="shrink-0" />
                  <span>{isEnglish ? config.warnings.en : config.warnings.vi}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slider input control */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-gray-400">
                {isEnglish ? "Productive Economy" : "Kinh tế sản xuất"} ({productionLevel}%)
              </span>
              <span className="text-xs font-bold text-purple-400">
                {isEnglish ? "Financial Investment" : "Đầu tư tài chính"} ({financializationLevel}%)
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderValue}
              onChange={(e) => setSliderValue(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-900 border border-white/5 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] text-gray-600 mt-1">
              <span>0% (Raw Production)</span>
              <span>50% (Equilibrium)</span>
              <span>100% (Pure Speculative Circulation)</span>
            </div>
          </div>
        </div>

        {/* Dynamic metrics readout */}
        <div className="glass-panel rounded-2xl p-5 border border-white/10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Coins size={16} className="text-amber-400" />
              <h3 className="text-sm font-bold text-gray-300">
                {isEnglish ? "Simulation Metrics" : "Số liệu đo lường hệ thống"}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Productive economy index */}
              <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{isEnglish ? config.metrics_description.productive_economy.name : config.metrics_description.productive_economy.name_vi}</span>
                  <span className="font-bold text-emerald-400">{productiveEconomyScore}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${productiveEconomyScore}%` }} 
                    className="h-full bg-emerald-500" 
                  />
                </div>
              </div>

              {/* Financial asset valuation */}
              <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{isEnglish ? config.metrics_description.financial_assets.name : config.metrics_description.financial_assets.name_vi}</span>
                  <span className={`font-bold ${isBubble ? 'text-red-400' : 'text-purple-400'}`}>{financialAssetsVal}x</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${Math.min(100, (parseFloat(financialAssetsVal) / 5.5) * 100)}%` }} 
                    className={`h-full ${isBubble ? 'bg-red-500' : 'bg-purple-500'}`} 
                  />
                </div>
              </div>

              {/* Employment */}
              <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{isEnglish ? config.metrics_description.employment.name : config.metrics_description.employment.name_vi}</span>
                  <span className="font-bold text-blue-400">{employmentCount}k</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${(employmentCount / 150) * 100}%` }} 
                    className="h-full bg-blue-500" 
                  />
                </div>
              </div>

              {/* Speculative Activity volume */}
              <div className="p-3 bg-slate-900 border border-white/5 rounded-xl">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>{isEnglish ? config.metrics_description.speculative_activity.name : config.metrics_description.speculative_activity.name_vi}</span>
                  <span className="font-bold text-amber-400">{speculativeActivity}</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${(speculativeActivity / 220) * 100}%` }} 
                    className="h-full bg-amber-500" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick reset buttons */}
          <div className="mt-8 pt-4 border-t border-white/5">
            <button 
              onClick={() => setSliderValue(30)}
              className="w-full py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw size={14} />
              <span>{isEnglish ? "Reset to Equilibrium (30%)" : "Khôi phục trạng thái ổn định (30%)"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
