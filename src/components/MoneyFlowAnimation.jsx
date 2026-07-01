import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Store, Truck, Factory, TrendingUp, Check,
  Users, Droplets, Megaphone, Settings, HelpCircle
} from 'lucide-react';

// Helper component for animating flowing coins/particles along lines
function CoinStream({ color = "#fbbf24", duration = 2.5, count = 4, direction = "horizontal", className = "" }) {
  const isHorizontal = direction === "horizontal";

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={
            isHorizontal
              ? { left: "-10%", top: "50%", opacity: 0 }
              : direction === "vertical-down"
                ? { top: "-10%", left: "50%", opacity: 0 }
                : { bottom: "-10%", left: "50%", opacity: 0 }
          }
          animate={
            isHorizontal
              ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }
              : direction === "vertical-down"
                ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] }
                : { bottom: ["0%", "100%"], opacity: [0, 1, 1, 0] }
          }
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: i * (duration / count),
            ease: "linear"
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor]"
          style={{ backgroundColor: color, color: color }}
        />
      ))}
    </div>
  );
}

export default function MoneyFlowAnimation({ brand, isEnglish, onComplete }) {
  const [step, setStep] = useState(0); // 0: Start, 1: Customer Active, 2: Store Active, 3: Distributor Active, 4: Split/Explore

  const totalPrice = brand?.price || 10000;
  const currency = brand?.currency || 'VND';
  const formatPrice = (val) => `${val.toLocaleString()} ${currency}`;

  // Auto-progress purchase flow to simulate investigation step-by-step
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2200);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 2200);
      return () => clearTimeout(timer);
    } else if (step === 3) {
      const timer = setTimeout(() => setStep(4), 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Trigger completion callback when reaching the split phase (step 4)
  useEffect(() => {
    if (step === 4 && onComplete) {
      onComplete();
    }
  }, [step, onComplete]);

  const handleBuy = () => {
    setStep(1);
  };

  const resetFlow = () => {
    setStep(0);
  };

  // Render investigation sidebar steps helper
  const renderInvestigationStep = (stepNumber, title, titleVi, desc, descVi, checked, active) => {
    return (
      <div className={`p-3.5 rounded-xl border text-left transition-all duration-300 ${active
          ? 'bg-indigo-950/20 border-indigo-500/35 shadow-[0_0_15px_rgba(99,102,241,0.05)]'
          : checked
            ? 'bg-emerald-950/10 border-emerald-500/20 opacity-90'
            : 'bg-transparent border-white/5 opacity-40'
        }`}>
        <div className="flex items-center gap-2.5 mb-1.5">
          <div className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-bold ${checked
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : active
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 animate-pulse'
                : 'bg-slate-800 text-gray-400'
            }`}>
            {checked ? <Check size={12} strokeWidth={3} /> : stepNumber}
          </div>
          <h4 className={`text-xs font-bold ${active ? 'text-indigo-300' : checked ? 'text-emerald-400' : 'text-gray-300'}`}>
            {isEnglish ? title : titleVi}
          </h4>
        </div>
        <p className="text-[11px] text-gray-400 pl-8 leading-relaxed">
          {isEnglish ? desc : descVi}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4">
      {step === 0 ? (
        /* ========================================== */
        /* START TRANSACTION SCREEN                   */
        /* ========================================== */
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel rounded-2xl p-8 max-w-md w-full border border-white/10 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="inline-block px-3 py-1 bg-amber-500/5 text-amber-300 border border-amber-500/20 text-[10px] font-semibold rounded-full uppercase tracking-wider mb-5">
              {isEnglish ? "Investigative Simulation" : "Mô phỏng điều tra"}
            </span>
            <h3 className="text-2xl font-black mb-3 tracking-tight">
              {isEnglish ? `Trace 1 Can of ${brand.name}` : `Theo dấu 1 lon ${brand.name}`}
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {isEnglish
                ? `Simulate a standard ${formatPrice(totalPrice)} consumer transaction to trace who actually benefits from each coin paid.`
                : `Mô phỏng giao dịch tiêu dùng ${formatPrice(totalPrice)} thông thường để khám phá ai thực sự nhận được tiền từ túi của bạn.`}
            </p>

            <div className="bg-slate-950/60 rounded-xl p-4 mb-6 border border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{isEnglish ? "Retail Price" : "Giá bán lẻ"}</span>
              <span className="text-2xl font-black text-amber-300">{formatPrice(totalPrice)}</span>
            </div>

            <button
              onClick={handleBuy}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/10"
            >
              <ShoppingCart size={16} className="group-hover:scale-110 transition-transform" />
              <span>{isEnglish ? "Purchase and Track Money Flow" : "Mua & Theo Dõi Dòng Tiền"}</span>
            </button>
          </motion.div>
        </div>
      ) : (
        /* ========================================== */
        /* FLOW SIMULATION PANEL                     */
        /* ========================================== */
        <div className="grid grid-cols-1 lg:grid-cols-[13fr_7fr] gap-8 items-start">

          {/* Main Investigation Canvas (Left & Middle Columns) */}
          <div className="space-y-6">

            {/* Top Pipeline Card */}
            <div className="glass-panel rounded-2xl p-6 relative border border-white/5 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{isEnglish ? "Phase 1: Local Distribution" : "Giai đoạn 1: Phân phối thực tế"}</span>
                <span className="text-xs text-gray-500 font-mono">{formatPrice(totalPrice)} Base Transaction</span>
              </div>

              {/* Top Horizontal Flow nodes */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 md:gap-2 relative z-10">

                {/* 1. Customer */}
                <div className={`flex-1 p-4 rounded-xl flex flex-col items-center glass-panel border ${step === 1 ? 'border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-blue-950/5' : step > 1 ? 'border-blue-500/10 opacity-70' : 'border-white/5'
                  } transition-all duration-300 min-h-[110px] justify-center relative w-full`}>
                  <div className="w-9 h-9 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 mb-2">
                    <ShoppingCart size={16} />
                  </div>
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{isEnglish ? "1. Customer" : "1. Người mua"}</div>
                  <div className="text-xs font-bold mt-1 text-blue-400">{formatPrice(totalPrice)}</div>
                </div>

                {/* Connector 1 */}
                <div className="relative w-8 h-8 md:w-16 md:h-1 flex items-center justify-center shrink-0">
                  <div className="w-0.5 h-8 md:w-full md:h-0.5 bg-white/10 relative">
                    {step >= 1 && (
                      <CoinStream color="#3b82f6" direction="horizontal" />
                    )}
                  </div>
                </div>

                {/* 2. Convenience Store */}
                <div className={`flex-1 p-4 rounded-xl flex flex-col items-center glass-panel border ${step === 2 ? 'border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)] bg-purple-950/5' : step > 2 ? 'border-purple-500/10 opacity-70' : 'border-white/5'
                  } transition-all duration-300 min-h-[110px] justify-center relative w-full`}>
                  <div className="w-9 h-9 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 mb-2">
                    <Store size={16} />
                  </div>
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{isEnglish ? "2. Store Keeps" : "2. Cửa hàng giữ"}</div>
                  <div className="text-xs font-bold mt-1 text-purple-400">{formatPrice(totalPrice * 0.3)}</div>
                  {step >= 2 && (
                    <div className="text-[9px] text-gray-500 font-mono mt-0.5">{isEnglish ? `Remaining: ${formatPrice(totalPrice * 0.7)}` : `Còn lại: ${formatPrice(totalPrice * 0.7)}`}</div>
                  )}
                </div>

                {/* Connector 2 */}
                <div className="relative w-8 h-8 md:w-16 md:h-1 flex items-center justify-center shrink-0">
                  <div className="w-0.5 h-8 md:w-full md:h-0.5 bg-white/10 relative">
                    {step >= 2 && (
                      <CoinStream color="#a855f7" direction="horizontal" />
                    )}
                  </div>
                </div>

                {/* 3. Distributor */}
                <div className={`flex-1 p-4 rounded-xl flex flex-col items-center glass-panel border ${step === 3 ? 'border-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.15)] bg-amber-950/5' : step > 3 ? 'border-amber-500/10 opacity-70' : 'border-white/5'
                  } transition-all duration-300 min-h-[110px] justify-center relative w-full`}>
                  <div className="w-9 h-9 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mb-2">
                    <Truck size={16} />
                  </div>
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">{isEnglish ? "3. Distributor Keeps" : "3. NPP giữ"}</div>
                  <div className="text-xs font-bold mt-1 text-amber-400">{formatPrice(totalPrice * 0.2)}</div>
                  {step >= 3 && (
                    <div className="text-[9px] text-gray-500 font-mono mt-0.5">{isEnglish ? `Remaining: ${formatPrice(totalPrice * 0.5)}` : `Còn lại: ${formatPrice(totalPrice * 0.5)}`}</div>
                  )}
                </div>

              </div>
            </div>

            {/* Downward branch splitting representation */}
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Branch Header Message */}
                <div className="text-center">
                  <span className="text-xs uppercase font-mono tracking-widest text-amber-400 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 shadow-sm">
                    {isEnglish ? `Remaining ${formatPrice(totalPrice * 0.5)} splits into two branches` : `${formatPrice(totalPrice * 0.5)} còn lại rẽ làm hai nhánh`}
                  </span>
                </div>

                {/* Two-Column Branch Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                  {/* ========================================== */}
                  {/* LEFT COLUMN: REAL ECONOMY                  */}
                  {/* ========================================== */}
                  <div className="glass-panel rounded-2xl p-5 border border-emerald-500/10 bg-emerald-950/2 space-y-4">
                    <div className="text-left border-b border-white/5 pb-3">
                      <h4 className="text-md font-extrabold text-emerald-400 flex items-center gap-1.5">
                        <Factory size={18} />
                        {isEnglish ? "Real Economy" : "Kinh tế sản xuất thực"}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isEnglish ? `Money used to produce the actual product (${formatPrice(totalPrice * 0.3)}).` : `Chi phí thực tế để làm ra lon nước (${formatPrice(totalPrice * 0.3)}).`}
                      </p>
                    </div>

                    {/* Stack of Production Cards */}
                    <div className="flex flex-col gap-3 relative">

                      {/* Card 1: Factory */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 relative bg-slate-950/40">
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                          <Factory size={15} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Factory" : "Nhà máy"}</span>
                            <span className="text-xs font-mono font-bold text-emerald-400">+{formatPrice(totalPrice * 0.1)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Manufacturing facilities and production equipment." : "Khấu hao thiết bị sản xuất và điện năng nhà máy."}
                          </p>
                        </div>
                      </div>

                      {/* Connection Line */}
                      <div className="h-3 relative w-full flex justify-center">
                        <div className="w-0.5 h-full bg-emerald-500/10">
                          <CoinStream color="#10b981" direction="vertical-down" count={2} />
                        </div>
                      </div>

                      {/* Card 2: Raw Materials */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 relative bg-slate-950/40">
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                          <Droplets size={15} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Raw Materials" : "Nguyên liệu"}</span>
                            <span className="text-xs font-mono font-bold text-emerald-400">+{formatPrice(totalPrice * 0.08)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Aluminum cans, sugar, filtered water, and concentrates." : "Vỏ lon nhôm, lượng đường, nước tinh lọc và cốt hương liệu."}
                          </p>
                        </div>
                      </div>

                      {/* Connection Line */}
                      <div className="h-3 relative w-full flex justify-center">
                        <div className="w-0.5 h-full bg-emerald-500/10">
                          <CoinStream color="#10b981" direction="vertical-down" count={2} />
                        </div>
                      </div>

                      {/* Card 3: Workers */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 relative bg-slate-950/40">
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                          <Users size={15} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Workers" : "Công nhân"}</span>
                            <span className="text-xs font-mono font-bold text-emerald-400">+{formatPrice(totalPrice * 0.07)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Wages for labor directly in bottling plant and packaging." : "Tiền lương trả trực tiếp cho công nhân trực dây chuyền."}
                          </p>
                        </div>
                      </div>

                      {/* Connection Line */}
                      <div className="h-3 relative w-full flex justify-center">
                        <div className="w-0.5 h-full bg-emerald-500/10">
                          <CoinStream color="#10b981" direction="vertical-down" count={2} />
                        </div>
                      </div>

                      {/* Card 4: Marketing */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 relative bg-slate-950/40">
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                          <Megaphone size={15} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Marketing" : "Tiếp thị"}</span>
                            <span className="text-xs font-mono font-bold text-emerald-400">+{formatPrice(totalPrice * 0.03)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Advertisements, local distribution campaigns." : "Quảng bá sản phẩm, định vị quầy kệ tại siêu thị."}
                          </p>
                        </div>
                      </div>

                      {/* Connection Line */}
                      <div className="h-3 relative w-full flex justify-center">
                        <div className="w-0.5 h-full bg-emerald-500/10">
                          <CoinStream color="#10b981" direction="vertical-down" count={2} />
                        </div>
                      </div>

                      {/* Card 5: Operations */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 relative bg-slate-950/40">
                        <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                          <Settings size={15} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Operations" : "Vận hành"}</span>
                            <span className="text-xs font-mono font-bold text-emerald-400">+{formatPrice(totalPrice * 0.02)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Administration, regional logistics and compliance." : "Hành chính doanh nghiệp và kiểm định chất lượng."}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* ========================================== */}
                  {/* RIGHT COLUMN: CORPORATE PROFIT             */}
                  {/* ========================================== */}
                  <div className="glass-panel rounded-2xl p-5 border border-amber-500/10 bg-amber-950/2 space-y-4">
                    <div className="text-left border-b border-white/5 pb-3">
                      <h4 className="text-md font-extrabold text-amber-400 flex items-center gap-1.5">
                        <TrendingUp size={18} />
                        {isEnglish ? "Corporate Profit" : "Lợi nhuận doanh nghiệp"}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isEnglish ? `Remaining profit after production costs (${formatPrice(totalPrice * 0.2)}).` : `Lợi nhuận thặng dư ròng tích lũy (${formatPrice(totalPrice * 0.2)}).`}
                      </p>
                    </div>

                    {/* Stack of Profit Cards */}
                    <div className="flex flex-col gap-3 relative">

                      {/* Card 1: Company Profit */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 bg-slate-950/40">
                        <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 mt-0.5">
                          <TrendingUp size={15} />
                        </div>
                        <div className="text-left w-full">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Corporate Retained" : "Lợi nhuận giữ lại"}</span>
                            <span className="text-xs font-mono font-bold text-amber-400">+{formatPrice(totalPrice * 0.2)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Surplus value extracted from the retail sale cycle." : "Giá trị thặng dư tích tụ sau khi khấu trừ sản xuất thực."}
                          </p>
                        </div>
                      </div>

                      {/* Connection Line */}
                      <div className="h-3 relative w-full flex justify-center">
                        <div className="w-0.5 h-full bg-amber-500/10">
                          <CoinStream color="#fbbf24" direction="vertical-down" count={2} />
                        </div>
                      </div>

                      {/* Card 2: Dividends */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 bg-slate-950/40">
                        <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 mt-0.5">
                          <TrendingUp size={15} className="rotate-45" />
                        </div>
                        <div className="text-left w-full">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Dividends & Buybacks" : "Cổ tức & Mua lại cổ phiếu"}</span>
                            <span className="text-xs font-mono font-bold text-amber-400">+{formatPrice(totalPrice * 0.14)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Cash rewards and value distributed back to share owners." : "Lợi nhuận chuyển đổi thành cổ tức chi trả cho chủ sở hữu."}
                          </p>
                        </div>
                      </div>

                      {/* Connection Line */}
                      <div className="h-3 relative w-full flex justify-center">
                        <div className="w-0.5 h-full bg-red-500/10">
                          <CoinStream color="#ef4444" direction="vertical-down" count={2} />
                        </div>
                      </div>

                      {/* Card 3: Unknown Owners */}
                      <div className="glass-panel p-3 border border-red-500/15 rounded-xl flex items-start gap-3 bg-red-950/5 mb-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-full blur-xl pointer-events-none" />
                        <div className="p-2 bg-red-500/20 text-red-400 rounded-lg shrink-0 mt-0.5 animate-pulse">
                          <HelpCircle size={15} />
                        </div>
                        <div className="text-left w-full">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-red-300">{isEnglish ? "Unknown Owners" : "Chủ sở hữu bí ẩn"}</span>
                            <span className="text-xs font-mono font-bold text-red-400">+{formatPrice(totalPrice * 0.06)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish
                              ? "The ultimate recipients of these corporate profits. Who actually owns these shares?"
                              : "Nơi nhận cuối cùng của dòng lợi nhuận này. Ai thực sự nắm giữ những cổ phần đó?"}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

              </motion.div>
            )}

            {/* Bottom Control Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-white/5 z-10">
              <span className="text-xs text-gray-500">
                {isEnglish ? "Interactive Money Flow Map" : "Bản đồ dòng tiền tương tác"}
              </span>
              <button
                onClick={resetFlow}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-medium text-xs rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                {isEnglish ? "Reset Investigation" : "Đặt lại cuộc điều tra"}
              </button>
            </div>

          </div>

          {/* ========================================== */}
          {/* INVESTIGATION PANEL (Right Sidebar)        */}
          {/* ========================================== */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 lg:sticky lg:top-24 h-fit flex flex-col gap-6">
            <div className="space-y-6">
              <h3 className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-left">
                {isEnglish ? "Investigation Progress" : "Tiến trình điều tra"}
              </h3>

              <div className="flex flex-col gap-4">
                {renderInvestigationStep(
                  1,
                  "Purchase Initiated",
                  "Bắt đầu giao dịch",
                  "Buy a beverage and trace the initial transaction.",
                  `Người dùng thực hiện mua lon nước ngọt trị giá ${formatPrice(totalPrice)}.`,
                  step >= 1,
                  step === 1
                )}

                {renderInvestigationStep(
                  2,
                  "Retail & Logistics",
                  "Chi phí phân phối",
                  "Distributors and retail stores retain 50% of the price.",
                  `Cửa hàng và Đại lý trung gian giữ lại ${formatPrice(totalPrice * 0.5)} vận hành.`,
                  step >= 3,
                  step === 2 || step === 3
                )}

                {renderInvestigationStep(
                  3,
                  "The Grand Split",
                  "Phân tách dòng tiền",
                  "Observe the split between product value and profit surplus.",
                  `Tiền tách làm hai nhánh: ${formatPrice(totalPrice * 0.3)} sản xuất thực và ${formatPrice(totalPrice * 0.2)} tích lũy thặng dư.`,
                  step >= 4,
                  step === 4
                )}

                {renderInvestigationStep(
                  4,
                  "The Mystery Remains",
                  "Bí ẩn chưa lời giải",
                  "The money trail goes cold at the dividends paid to unknown owners.",
                  "Dòng tiền kết thúc tại phần cổ tức chuyển giao cho những chủ sở hữu bí ẩn.",
                  step >= 4,
                  step === 4
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] text-gray-500 leading-relaxed text-left">
                {isEnglish
                  ? "*Percentages modeled represent typical corporate breakdowns of beverage manufacturing networks based on financial filings."
                  : "*Tỉ lệ phần trăm mô phỏng theo số liệu báo cáo tài chính thường niên của các tập đoàn đồ uống đóng chai."}
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
