import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Factory, 
  TrendingUp, 
  ArrowRight, 
  HelpCircle, 
  Cpu,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

// Helper component for animating flowing coins/particles along lines
function MoneyParticleStream({ color = "#10b981", duration = 2, count = 5, active = true }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ top: "0%", left: "50%", opacity: 0, scale: 0.8 }}
          animate={{ 
            top: ["0%", "100%"], 
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.2, 1.2, 0.8]
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: i * (duration / count),
            ease: "easeInOut"
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] z-20"
          style={{ backgroundColor: color, color: color }}
        />
      ))}
    </div>
  );
}

export default function Act3({ isEnglish }) {
  // Stages: 'selection', 'real-sim', 'finance-sim', 'comparison', 'explanation', 'conclusion'
  const [stage, setStage] = useState('selection'); 
  const [completedPaths, setCompletedPaths] = useState([]);
  const [animStep, setAnimStep] = useState(0);
  const [loopFlowActive, setLoopFlowActive] = useState(true);

  // Steps data for Real Production Path animation
  const realAnimSteps = [
    { label_vi: "Vốn ban đầu (100 triệu)", label_en: "Initial Capital (100M)", cost: "100M", change: "" },
    { label_vi: "Mua máy móc sản xuất", label_en: "Buy factory machinery", cost: "40 triệu", change: "-40M" },
    { label_vi: "Nhập nguyên liệu thô", label_en: "Purchase raw materials", cost: "30 triệu", change: "-30M" },
    { label_vi: "Thuê nhân công lao động", label_en: "Hire production workers", cost: "20 triệu", change: "-20M" },
    { label_vi: "Vận hành nhà xưởng", label_en: "Power & factory operations", cost: "10 triệu", change: "-10M" },
    { label_vi: "Chế tạo hàng hóa", label_en: "Manufacture physical goods", cost: "Thành phẩm", change: "Hàng hóa" },
    { label_vi: "Bán sản phẩm ra thị trường", label_en: "Sell commodities to buyers", cost: "Giao dịch", change: "Bán" },
    { label_vi: "Doanh thu thu về", label_en: "Total revenue returned", cost: "110 triệu", change: "110M" },
    { label_vi: "Lợi nhuận ròng thực tế", label_en: "Actual net profit", cost: "+10 triệu", change: "+10M", highlight: true }
  ];

  // Steps data for Financial Investment Path animation
  const financeAnimSteps = [
    { label_vi: "Vốn ban đầu (100 triệu)", label_en: "Initial Capital (100M)", cost: "100M", change: "" },
    { label_vi: "Mua cổ phiếu tập đoàn", label_en: "Buy corporate stock", cost: "100 triệu", change: "-100M" },
    { label_vi: "Nắm giữ danh mục đầu tư", label_en: "Hold investment portfolio", cost: "Đợi tăng giá", change: "Nắm giữ" },
    { label_vi: "Giá tài sản tăng vọt", label_en: "Asset price surges", cost: "Đường giá lên", change: "Tăng giá" },
    { label_vi: "Bán cổ phiếu chốt lời", label_en: "Sell shares at peak", cost: "Chốt lời", change: "Bán" },
    { label_vi: "Tổng tiền thu về", label_en: "Total cash returned", cost: "120 triệu", change: "120M" },
    { label_vi: "Lợi nhuận tài chính ròng", label_en: "Net financial profit", cost: "+20 triệu", change: "+20M", highlight: true }
  ];

  // Auto-progress substeps during simulations
  useEffect(() => {
    if (stage !== 'real-sim' && stage !== 'finance-sim') return;
    const stepsLength = stage === 'real-sim' ? realAnimSteps.length : financeAnimSteps.length;
    
    if (animStep < stepsLength - 1) {
      const timer = setTimeout(() => {
        setAnimStep(prev => prev + 1);
      }, 950);
      return () => clearTimeout(timer);
    } else {
      const currentPath = stage === 'real-sim' ? 'real' : 'finance';
      if (!completedPaths.includes(currentPath)) {
        setCompletedPaths(prev => [...prev, currentPath]);
      }
    }
  }, [stage, animStep]);

  // Click handler to launch a path simulation
  const startInvestigationPath = (path) => {
    setAnimStep(0);
    if (path === 'real') {
      setStage('real-sim');
    } else {
      setStage('finance-sim');
    }
  };

  const handleNextPathAction = () => {
    if (completedPaths.length === 2) {
      setStage('comparison');
    } else {
      setStage('selection');
    }
  };

  const handleStartExplanation = () => {
    setStage('explanation');
  };

  const handleStartConclusion = () => {
    setStage('conclusion');
  };

  const handleNextAct = () => {
    const act4Element = document.getElementById('act4');
    if (act4Element) {
      act4Element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const resetAll = () => {
    setStage('selection');
    setCompletedPaths([]);
    setAnimStep(0);
  };

  return (
    <section id="act3" className="min-h-screen py-20 px-4 md:px-8 bg-[#0B1020] relative flex flex-col justify-center border-t border-white/5 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Step Indicator Header */}
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] uppercase font-bold text-purple-400 tracking-widest bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20"
          >
            {isEnglish ? "Act 3: The Financialization Investigation" : "Hồi 3: Hành trình điều tra tài chính hóa"}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mt-4 mb-3 tracking-tight text-white"
          >
            {isEnglish ? "Why Does Profit Flow to Finance?" : "Tại sao lợi nhuận lại chảy về tài chính?"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-medium"
          >
            {isEnglish 
              ? "There are two paths for capital to generate profit. Trace each path to uncover the anomaly."
              : "Có hai con đường để đồng vốn sinh lời. Hãy lần theo từng con đường để tìm ra điều bất thường."}
          </motion.p>
        </div>

        {/* MAIN INTERACTIVE AREA */}
        <div className="relative min-h-[520px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            
            {/* STAGE: SELECTION */}
            {stage === 'selection' && (
              <motion.div 
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full max-w-4xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Card: Real Production */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`glass-panel rounded-2xl p-8 border-emerald-500/10 bg-emerald-950/2 relative overflow-hidden flex flex-col justify-between min-h-[280px] transition-all ${
                      completedPaths.includes('real') ? 'opacity-60 border-emerald-500/35' : 'hover:border-emerald-500/30'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] text-emerald-400 font-mono tracking-widest font-bold">
                          {isEnglish ? "PATH 1" : "CON ĐƯỜNG 1"}
                        </span>
                        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                          <Factory size={24} />
                        </div>
                      </div>

                      <h4 className="text-2xl font-extrabold text-emerald-300">
                        {isEnglish ? "Productive Investment" : "Đầu tư sản xuất"}
                      </h4>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        {isEnglish 
                          ? "Deploy capital to create actual physical commodities."
                          : "Tạo ra hàng hóa thông qua máy móc, nguyên liệu và sức lao động."}
                      </p>
                    </div>

                    <div className="mt-8">
                      {completedPaths.includes('real') ? (
                        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                          <span>✓ {isEnglish ? "Investigation Completed" : "Đã hoàn thành điều tra"}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => startInvestigationPath('real')}
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{isEnglish ? "Investigate Path" : "Bắt đầu điều tra"}</span>
                          <ArrowRight size={13} />
                        </button>
                      )}
                    </div>
                  </motion.div>

                  {/* Right Card: Financial Investment */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className={`glass-panel rounded-2xl p-8 border-purple-500/10 bg-purple-950/2 relative overflow-hidden flex flex-col justify-between min-h-[280px] transition-all ${
                      completedPaths.includes('finance') ? 'opacity-60 border-purple-500/35' : 'hover:border-purple-500/30'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-[10px] text-purple-400 font-mono tracking-widest font-bold">
                          {isEnglish ? "PATH 2" : "CON ĐƯỜNG 2"}
                        </span>
                        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                          <TrendingUp size={24} />
                        </div>
                      </div>

                      <h4 className="text-2xl font-extrabold text-purple-300">
                        {isEnglish ? "Financial Investment" : "Đầu tư tài chính"}
                      </h4>
                      <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                        {isEnglish 
                          ? "Deploy capital directly into financial assets."
                          : "Đầu tư vào tài sản tài chính để tích lũy qua biến động giá."}
                      </p>
                    </div>

                    <div className="mt-8">
                      {completedPaths.includes('finance') ? (
                        <div className="text-xs text-purple-400 font-bold flex items-center gap-1">
                          <span>✓ {isEnglish ? "Investigation Completed" : "Đã hoàn thành điều tra"}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => startInvestigationPath('finance')}
                          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{isEnglish ? "Investigate Path" : "Bắt đầu điều tra"}</span>
                          <ArrowRight size={13} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* STAGE: REAL SIMULATION */}
            {stage === 'real-sim' && (
              <motion.div 
                key="real-sim"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-xl"
              >
                <div className="glass-panel border-emerald-500/20 rounded-2xl p-6 md:p-8 bg-slate-950/40 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <Cpu size={12} className="animate-spin-slow" />
                      {isEnglish ? "Simulating Productive Capital" : "Mô phỏng dòng vốn sản xuất"}
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {animStep + 1} / {realAnimSteps.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 relative pl-6">
                    <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-white/5">
                      <div 
                        className="absolute top-0 w-full transition-all duration-300 bg-emerald-500"
                        style={{ height: `${(animStep / (realAnimSteps.length - 1)) * 100}%` }}
                      />
                    </div>

                    {realAnimSteps.map((step, idx) => {
                      const isPast = idx < animStep;
                      const isActive = idx === animStep;
                      const isFuture = idx > animStep;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: isFuture ? 0.15 : 1, x: 0 }}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            isActive
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                              : isPast ? 'bg-slate-900/40 border-white/5 text-gray-400' : 'bg-transparent border-transparent text-gray-600'
                          }`}
                        >
                          <div className={`absolute -left-5 w-2 h-2 rounded-full border -translate-x-1/2 transition-colors duration-300 ${
                            isActive ? 'bg-emerald-400 border-emerald-500' : isPast ? 'bg-emerald-900 border-emerald-700' : 'bg-slate-800 border-slate-700'
                          }`} />
                          <span className="text-xs font-bold">{isEnglish ? step.label_en : step.label_vi}</span>
                          <span className="text-xs font-mono font-bold text-gray-300">{step.cost}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {animStep === realAnimSteps.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-4 border-t border-white/5"
                    >
                      <button
                        onClick={handleNextPathAction}
                        className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                      >
                        <span>
                          {completedPaths.length === 2 
                            ? (isEnglish ? "Compare Both Paths" : "So sánh 2 con đường")
                            : (isEnglish ? "Continue to Remaining Path" : "Tiếp tục điều tra con đường còn lại")}
                        </span>
                        <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STAGE: FINANCE SIMULATION */}
            {stage === 'finance-sim' && (
              <motion.div 
                key="finance-sim"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-xl"
              >
                <div className="glass-panel border-purple-500/20 rounded-2xl p-6 md:p-8 bg-slate-950/40 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <Cpu size={12} className="animate-spin-slow" />
                      {isEnglish ? "Simulating Financial Capital" : "Mô phỏng dòng vốn tài chính"}
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-400">
                      {animStep + 1} / {financeAnimSteps.length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 relative pl-6">
                    <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-white/5">
                      <div 
                        className="absolute top-0 w-full transition-all duration-300 bg-purple-500"
                        style={{ height: `${(animStep / (financeAnimSteps.length - 1)) * 100}%` }}
                      />
                    </div>

                    {financeAnimSteps.map((step, idx) => {
                      const isPast = idx < animStep;
                      const isActive = idx === animStep;
                      const isFuture = idx > animStep;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: isFuture ? 0.15 : 1, x: 0 }}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                            isActive
                              ? 'bg-purple-950/20 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                              : isPast ? 'bg-slate-900/40 border-white/5 text-gray-400' : 'bg-transparent border-transparent text-gray-600'
                          }`}
                        >
                          <div className={`absolute -left-5 w-2 h-2 rounded-full border -translate-x-1/2 transition-colors duration-300 ${
                            isActive ? 'bg-purple-400 border-purple-500' : isPast ? 'bg-purple-900 border-purple-700' : 'bg-slate-800 border-slate-700'
                          }`} />
                          <span className="text-xs font-bold">{isEnglish ? step.label_en : step.label_vi}</span>
                          <span className="text-xs font-mono font-bold text-gray-300">{step.cost}</span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {animStep === financeAnimSteps.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 pt-4 border-t border-white/5"
                    >
                      <button
                        onClick={handleNextPathAction}
                        className="w-full py-3 px-5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
                      >
                        <span>
                          {completedPaths.length === 2 
                            ? (isEnglish ? "Compare Both Paths" : "So sánh 2 con đường")
                            : (isEnglish ? "Continue to Remaining Path" : "Tiếp tục điều tra con đường còn lại")}
                        </span>
                        <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* STAGE: COMPARISON DILEMMA */}
            {stage === 'comparison' && (
              <motion.div 
                key="comparison"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-xl relative"
              >
                <div className="absolute inset-0 bg-red-500/5 rounded-3xl blur-2xl animate-pulse pointer-events-none" />

                <div className="glass-panel border-red-500/20 rounded-3xl p-6 md:p-8 bg-slate-950/85 text-center relative overflow-hidden shadow-2xl">
                  <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400 mx-auto mb-5 animate-bounce">
                    <AlertTriangle size={24} />
                  </div>

                  <h3 className="text-xl md:text-2xl font-black text-red-400 mb-2 tracking-tight">
                    {isEnglish ? "Did you notice anything unusual?" : "Bạn có nhận thấy điều gì bất thường?"}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6 max-w-md mx-auto">
                    {isEnglish 
                      ? "Both investigations started with 100 million VND, but they ended with entirely different results:"
                      : "Cả hai con đường điều tra đều khởi đầu từ 100 triệu đồng, nhưng kết quả đem lại hoàn toàn chênh lệch:"}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* Real */}
                    <div className="bg-emerald-950/15 border border-emerald-500/20 rounded-2xl p-4 flex flex-col items-center">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg mb-2">
                        <Factory size={16} />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{isEnglish ? "Productive" : "Đầu tư sản xuất"}</span>
                      <span className="text-xs font-mono text-gray-500 mt-1">100M → 110M</span>
                      <span className="text-lg font-black text-emerald-400 mt-0.5">+10 triệu (+10%)</span>
                    </div>

                    {/* Financial */}
                    <div className="bg-purple-950/15 border border-purple-500/20 rounded-2xl p-4 flex flex-col items-center">
                      <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg mb-2">
                        <TrendingUp size={16} />
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{isEnglish ? "Financial" : "Đầu tư tài chính"}</span>
                      <span className="text-xs font-mono text-gray-500 mt-1">100M → 120M</span>
                      <span className="text-lg font-black text-purple-400 mt-0.5">+20 triệu (+20%)</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 mb-6">
                    <p className="text-xs md:text-sm font-black text-gray-200 italic">
                      {isEnglish 
                        ? `"Why does the path that does not directly produce goods yield a higher profit?"`
                        : `"Tại sao con đường không trực tiếp tạo ra hàng hóa lại mang về lợi nhuận cao hơn?"`}
                    </p>
                  </div>

                  <button
                    onClick={handleStartExplanation}
                    className="w-full py-4 px-6 bg-gradient-to-r from-red-600 via-indigo-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                  >
                    <span>{isEnglish ? "Find the Explanation" : "Tìm lời giải"}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE: EXPLANATION & PARALLEL TIMELINES */}
            {stage === 'explanation' && (
              <motion.div 
                key="explanation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full space-y-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Timeline: Real Economy */}
                  <div className="glass-panel border-emerald-500/10 rounded-2xl p-6 bg-emerald-950/2 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-emerald-500/25 text-emerald-400 rounded-lg">
                          <Factory size={20} />
                        </div>
                        <h4 className="text-md font-bold text-emerald-300">
                          {isEnglish ? "Real Economy Pipeline" : "Chu trình kinh tế thực"}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                        T - H - T'
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 relative py-2">
                      {[
                        { step: "Tiền", step_en: "Money" },
                        { step: "Máy móc", step_en: "Machinery" },
                        { step: "Nguyên liệu", step_en: "Materials" },
                        { step: "Lao động", step_en: "Labor" },
                        { step: "Sản xuất", step_en: "Production" },
                        { step: "Hàng hóa", step_en: "Goods" },
                        { step: "Tiền nhiều hơn", step_en: "More Money" }
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="glass-panel p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs bg-slate-900/40 relative"
                        >
                          <span className="text-gray-400 font-mono">0{idx + 1}.</span>
                          <span className="font-bold text-gray-200">{isEnglish ? item.step_en : item.step}</span>
                          <div className={`w-2 h-2 rounded-full ${idx === 6 ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500/40'}`} />
                          
                          {idx < 6 && (
                            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-2.5 w-0.5 bg-emerald-500/15 pointer-events-none">
                              <MoneyParticleStream color="#10b981" count={1} duration={1.5} active={loopFlowActive} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs font-bold text-emerald-400">
                      {isEnglish ? "Every profit must go through production." : "Mọi lợi nhuận đều phải đi qua sản xuất."}
                    </div>
                  </div>

                  {/* Right Timeline: Financial Economy */}
                  <div className="glass-panel border-purple-500/10 rounded-2xl p-6 bg-purple-950/2 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-purple-500/25 text-purple-400 rounded-lg">
                          <TrendingUp size={20} />
                        </div>
                        <h4 className="text-md font-bold text-purple-300">
                          {isEnglish ? "Financial Economy Pipeline" : "Chu trình kinh tế tài chính"}
                        </h4>
                      </div>
                      <span className="text-[10px] font-bold bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                        T - T'
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5 relative py-2">
                      {[
                        { step: "Tiền", step_en: "Money" },
                        { step: "Tài sản tài chính", step_en: "Financial Assets" },
                        { step: "Giá tài sản tăng", step_en: "Asset Appreciation" },
                        { step: "Tiền nhiều hơn", step_en: "More Money" }
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="glass-panel p-3 rounded-xl border border-white/5 flex items-center justify-between text-xs bg-slate-900/40 relative"
                        >
                          <span className="text-gray-400 font-mono">0{idx + 1}.</span>
                          <span className="font-bold text-gray-200">{isEnglish ? item.step_en : item.step}</span>
                          <div className={`w-2 h-2 rounded-full ${idx === 3 ? 'bg-purple-400 animate-pulse' : 'bg-purple-500/40'}`} />

                          {idx < 3 && (
                            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 h-3.5 w-0.5 bg-purple-500/15 pointer-events-none">
                              <MoneyParticleStream color="#a855f7" count={1} duration={1.2} active={loopFlowActive} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center text-xs font-bold text-purple-400">
                      {isEnglish ? "Profit forms from the appreciation of financial assets." : "Lợi nhuận hình thành từ sự tăng giá của tài sản tài chính."}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <button 
                    onClick={() => setLoopFlowActive(!loopFlowActive)}
                    className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                      loopFlowActive ? 'bg-purple-600/20 border-purple-500/40 text-purple-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <RefreshCw size={12} className={loopFlowActive ? "animate-spin" : ""} />
                    <span>
                      {loopFlowActive ? (isEnglish ? "Money Flow Active" : "Dòng tiền đang chạy") : (isEnglish ? "Pause Animation" : "Tạm dừng dòng tiền")}
                    </span>
                  </button>
                  <p className="text-[11px] text-gray-500 max-w-lg text-center leading-relaxed">
                    {isEnglish 
                      ? "The productive economy must loop through commodities, while the financial economy loops directly back to cash, moving significantly faster."
                      : "Nhận thấy dòng tiền kinh tế thực phải hóa thân thành tư liệu sản xuất và lao động thực tế, trong khi kinh tế tài chính gần như chỉ xoay vòng trực tiếp giữa tài sản tài chính và tiền."}
                  </p>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleStartConclusion}
                    className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer border border-white/10"
                  >
                    <span>{isEnglish ? "View Conclusion" : "Xem kết luận điều tra"}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STAGE: CONCLUSION & BRIDGE */}
            {stage === 'conclusion' && (
              <motion.div 
                key="conclusion"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-3xl"
              >
                <div className="glass-panel rounded-3xl p-8 border border-amber-500/20 bg-gradient-to-b from-slate-900/60 to-slate-950/90 relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row items-center gap-6 justify-between border-b border-white/5 pb-6 mb-6">
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
                        {isEnglish ? "Investigation Report" : "Báo cáo điều tra"}
                      </span>
                      <h3 className="text-2xl font-black mt-3 text-white tracking-tight">
                        {isEnglish ? "The Financialization Phenomenon" : "Hiện tượng tài chính hóa (Financialization)"}
                      </h3>
                    </div>
                    <div className="p-2.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl font-black text-xs tracking-wide shrink-0">
                      {isEnglish ? "Financialization" : "Tài chính hóa"}
                    </div>
                  </div>

                  <div className="text-left text-xs md:text-sm text-gray-300 space-y-4 leading-relaxed font-medium">
                    <p>
                      {isEnglish 
                        ? "You have just uncovered the process of Financialization. In the modern economy, more and more capital chooses to bypass the physical production cycle entirely."
                        : "Bạn vừa phát hiện hiện tượng tài chính hóa. Trong nền kinh tế hiện đại, ngày càng nhiều dòng vốn chọn cách bỏ qua hoàn toàn chu trình sản xuất thực tế."}
                    </p>
                    <p>
                      {isEnglish 
                        ? "Instead of building factories, purchasing equipment, or employing workforce, capital is funneled directly into stocks, investment funds, and other financial products. This decoupling causes financial profits to accumulate much faster than real manufacturing returns."
                        : "Thay vì xây dựng nhà xưởng hay mở rộng sản xuất, vốn được đưa trực tiếp vào cổ phiếu, các quỹ đầu tư và tài sản tài chính. Điều này khiến lợi nhuận tài chính ngày càng tăng nhanh hơn và lớn hơn lợi nhuận từ hoạt động sản xuất."}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-red-950/15 border border-red-500/20 my-6 text-center">
                    <p className="text-xs md:text-sm font-black text-red-300">
                      {isEnglish
                        ? "If more and more capital chooses this path... what will happen to the real economy?"
                        : "Nếu ngày càng nhiều dòng vốn đều chọn con đường này... điều gì sẽ xảy ra với nền kinh tế thực?"}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2">
                    <button
                      onClick={resetAll}
                      className="px-4 py-2 bg-slate-900 border border-white/5 hover:border-white/10 text-gray-400 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw size={12} />
                      <span>{isEnglish ? "Re-evaluate Paths" : "Điều tra lại"}</span>
                    </button>

                    <button
                      onClick={handleNextAct}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-white/10"
                    >
                      <span>{isEnglish ? "Proceed to Act 4 Simulator" : "Đến Hồi 4: Trình giả lập"}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
