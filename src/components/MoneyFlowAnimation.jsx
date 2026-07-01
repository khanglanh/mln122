import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Store, Truck, Factory, TrendingUp, Check,
  Users, Droplets, Megaphone, Settings, Landmark, Briefcase,
  HelpCircle, Sparkles, ArrowRight, CornerDownRight
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

const investors = [
  {
    id: 'blackrock',
    name: 'BlackRock',
    desc: 'Largest Asset Manager',
    desc_vi: 'Quỹ quản lý tài sản lớn nhất thế giới',
    aum: '≈11 Trillion USD AUM',
    aum_vi: '≈11 nghìn tỷ USD tài sản',
    share: 'Top Institutional Shareholder',
    share_vi: 'Cổ đông tổ chức lớn',
    companies: ['Coca-Cola', 'PepsiCo', 'Apple', 'Amazon', 'Microsoft', 'Visa', 'Nvidia'],
    detail: "BlackRock is the world's largest asset manager. While it does not directly operate companies, its significant ownership stakes give it substantial voting influence across many of the world's largest corporations.",
    detail_vi: "BlackRock là quỹ quản lý tài sản lớn nhất thế giới. Dù không trực tiếp điều hành doanh nghiệp, quỹ có ảnh hưởng lớn thông qua quyền biểu quyết tại đại hội cổ đông và các khoản đầu tư dài hạn vào nhiều tập đoàn đa quốc gia."
  },
  {
    id: 'vanguard',
    name: 'Vanguard',
    desc: 'Leading Long-term Asset Manager',
    desc_vi: 'Một trong những tập đoàn quản lý tài sản lớn nhất thế giới',
    aum: '≈10 Trillion USD AUM',
    aum_vi: '≈10 nghìn tỷ USD tài sản',
    share: 'Top Institutional Shareholder',
    share_vi: 'Cổ đông tổ chức lớn',
    companies: ['Coca-Cola', 'PepsiCo', 'Apple', 'Amazon', 'Microsoft', 'Google', 'Tesla', 'Nvidia'],
    detail: "Vanguard is one of the world's largest asset managers, known for its long-term investment strategy and extensive ownership across thousands of global companies.",
    detail_vi: "Vanguard là một trong những tập đoàn quản lý tài sản lớn nhất thế giới, nổi tiếng với chiến lược đầu tư dài hạn và nắm giữ cổ phần tại hàng nghìn doanh nghiệp trên toàn cầu."
  },
  {
    id: 'state',
    name: 'State Street',
    desc: 'Big Three Asset Manager',
    desc_vi: 'Một trong ba tập đoàn quản lý tài sản lớn nhất thế giới (Big Three)',
    aum: '≈4.7 Trillion USD AUM',
    aum_vi: '≈4,7 nghìn tỷ USD tài sản',
    share: 'Top Institutional Shareholder',
    share_vi: 'Cổ đông tổ chức lớn',
    companies: ['Coca-Cola', 'Apple', 'Amazon', 'Microsoft', 'Visa'],
    detail: "State Street is one of the Big Three asset managers. Although less visible than BlackRock and Vanguard, it remains one of the largest institutional shareholders in many major global corporations.",
    detail_vi: "State Street là một thành viên của nhóm Big Three. Mặc dù ít được công chúng biết đến hơn BlackRock và Vanguard, quỹ vẫn là cổ đông lớn của nhiều tập đoàn hàng đầu thế giới."
  }
];

export default function MoneyFlowAnimation({ brand, isEnglish }) {
  const [step, setStep] = useState(0); // 0: Start, 1: Customer Active, 2: Store Active, 3: Distributor Active, 4: Split/Explore
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  const totalPrice = brand?.price || 10000;
  const currency = brand?.currency || 'VND';
  const formatPrice = (val) => `${val.toLocaleString()} ${currency}`;

  // Auto-progress purchase flow to simulate investigation step-by-step
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 2600);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 2600);
      return () => clearTimeout(timer);
    } else if (step === 3) {
      const timer = setTimeout(() => setStep(4), 2600);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleBuy = () => {
    setStep(1);
    setSelectedInvestor(null);
  };

  const resetFlow = () => {
    setStep(0);
    setSelectedInvestor(null);
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
                          <Briefcase size={15} />
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
                        <div className="w-0.5 h-full bg-amber-500/10">
                          <CoinStream color="#fbbf24" direction="vertical-down" count={2} />
                        </div>
                      </div>

                      {/* Card 3: Institutional Shareholders */}
                      <div className="glass-panel p-3 border border-white/5 rounded-xl flex items-start gap-3 bg-slate-950/40 mb-2">
                        <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0 mt-0.5">
                          <Landmark size={15} />
                        </div>
                        <div className="text-left w-full">
                          <div className="flex items-center justify-between w-full gap-2">
                            <span className="text-xs font-bold text-gray-200">{isEnglish ? "Institutional Shareholders" : "Cổ đông định chế"}</span>
                            <span className="text-xs font-mono font-bold text-amber-400">+{formatPrice(totalPrice * 0.06)}</span>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                            {isEnglish ? "Capital managers holding massive ownership stakes." : "Các siêu định chế quản lý tài sản chi phối phần lớn cổ phần."}
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>

                {/* ========================================== */}
                {/* INVESTOR SELECTION SECTION                */}
                {/* ========================================== */}
                <div className="glass-panel rounded-2xl p-5 border border-white/5 bg-slate-950/20 text-left space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                      <Landmark size={18} />
                    </div>
                    <div>
                      <h4 className="text-md font-extrabold text-amber-400">
                        {isEnglish ? "Select Investor to Investigate" : "Chọn cổ đông để điều tra"}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isEnglish
                          ? "Examine the shared ownership structures of global asset managers."
                          : "Khám phá cấu trúc sở hữu của các quỹ tài sản hàng đầu."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {investors.map((investor) => {
                      const isSelected = selectedInvestor?.id === investor.id;
                      return (
                        <motion.div
                          key={investor.id}
                          whileHover={{ scale: 1.02, borderColor: 'rgba(251,191,36,0.3)' }}
                          onClick={() => setSelectedInvestor(investor)}
                          className={`p-4 rounded-xl border glass-panel cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col gap-2 ${isSelected
                              ? 'border-amber-400 bg-amber-950/15 shadow-[0_0_15px_rgba(251,191,36,0.1)]'
                              : 'border-white/5 bg-slate-950/20'
                            }`}
                        >
                          {/* Background subtle flow line if selected */}
                          {isSelected && (
                            <CoinStream color="#fbbf24" direction="horizontal" duration={2.5} count={3} />
                          )}

                          <div className="relative z-10 flex items-center gap-1.5">
                            <Landmark size={13} className="text-amber-400 shrink-0" />
                            <h5 className="text-sm font-extrabold text-white tracking-tight">
                              {investor.name}
                            </h5>
                          </div>

                          <p className="relative z-10 text-[10px] text-gray-400 leading-normal flex-grow">
                            {isEnglish ? investor.desc : investor.desc_vi}
                          </p>

                          <div className="relative z-10 flex flex-col gap-1 mt-1 border-t border-white/5 pt-2">
                            <div className="text-[9px] font-mono font-bold text-amber-400/90 tracking-wide uppercase">
                              {isEnglish ? investor.share : investor.share_vi}
                            </div>
                            <div className="text-[9px] text-gray-400 font-mono">
                              {isEnglish ? "AUM: " : "Tài sản: "}
                              <span className="font-bold text-gray-300">{isEnglish ? investor.aum : investor.aum_vi}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* ========================================== */}
                {/* THE SURPRISE REVEAL BLOCK                  */}
                {/* ========================================== */}
                <div className="max-w-2xl mx-auto w-full">
                  <div className="glass-panel rounded-2xl p-6 border-2 border-amber-500/20 bg-gradient-to-b from-amber-500/5 to-transparent text-center flex flex-col items-center relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 inset-x-0 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex flex-col items-center gap-2 mb-3">
                      <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                        <Sparkles size={18} />
                      </div>
                      <h4 className="text-base font-extrabold text-amber-400 uppercase tracking-wider font-mono">
                        {isEnglish ? "🎭 The Surprise" : "🎭 Sự thật bất ngờ"}
                      </h4>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed mb-6 max-w-lg">
                      {isEnglish
                        ? "Although consumers usually see Coca-Cola and Pepsi as rival competitors in marketing wars, they actually share identical institutional owners. The competition exists at the consumer level, while the profits flow back to the same financial entities."
                        : "Mặc dù người tiêu dùng thường thấy Coca-Cola và Pepsi cạnh tranh khéo liệt trong các chiến dịch marketing, nhưng thực tế cả hai đều được sở hữu lớn bởi chính các định chế tài chính này. Sự đối đầu chỉ diễn ra ở cấp độ tiếp thị, còn lợi nhuận cuối cùng đều chảy về cùng một giỏ."}
                    </p>

                    {/* Animated Shared Ownership Diagram */}
                    <div className="bg-slate-950/60 rounded-xl p-4 border border-white/5 relative flex items-center justify-between min-h-[140px] w-full max-w-md mx-auto">

                      {/* Coca-Cola Node */}
                      <div className="z-10 px-3.5 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 text-[10px] font-bold shadow-sm">
                        Coca-Cola
                      </div>

                      {/* BlackRock Custodian Center */}
                      <div className="z-10 px-4 py-2 rounded-lg border border-amber-500/40 bg-amber-950/30 text-amber-300 text-xs font-extrabold shadow-lg flex flex-col items-center">
                        <Landmark size={12} className="mb-0.5 text-amber-400" />
                        <span>BlackRock</span>
                        <span className="text-[8px] text-gray-400 font-mono mt-0.5">Shared Capital</span>
                      </div>

                      {/* Pepsi Node */}
                      <div className="z-10 px-3.5 py-1.5 rounded-lg border border-blue-500/30 bg-blue-950/20 text-blue-400 text-[10px] font-bold shadow-sm">
                        PepsiCo
                      </div>

                      {/* Connecting particles flow lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path d="M 65 70 Q 150 70 190 70" fill="none" stroke="rgba(239,68,68,0.15)" strokeWidth="1.5" />
                        <path d="M 335 70 Q 250 70 210 70" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="1.5" />

                        {/* Flow particles */}
                        <circle r="1.5" fill="#f87171">
                          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 65 70 Q 150 70 190 70" />
                        </circle>
                        <circle r="1.5" fill="#60a5fa">
                          <animateMotion dur="2.4s" repeatCount="indefinite" path="M 335 70 Q 250 70 210 70" />
                        </circle>
                      </svg>

                    </div>
                  </div>
                </div>

              </motion.div>
            )}

            {/* Bottom Control Bar */}
            <div className="flex justify-between items-center pt-4 border-t border-white/5 z-10">
              <span className="text-xs text-gray-500">
                {isEnglish ? "Interactive Conspiracy Board" : "Bản đồ điều tra tương tác"}
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
                  step === 4 && !selectedInvestor
                )}

                {renderInvestigationStep(
                  4,
                  "Ownership Discovered",
                  "Mạng lưới cổ đông",
                  "Discover the institutional asset managers holding both competitors.",
                  "Khám phá các siêu định chế tài chính đứng đằng sau kiểm soát cả hai thương hiệu.",
                  selectedInvestor !== null,
                  step === 4 && selectedInvestor === null
                )}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {selectedInvestor && (
                <motion.div
                  key={selectedInvestor.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="glass-panel border border-amber-500/20 bg-slate-950/40 p-4 rounded-xl text-left relative overflow-hidden flex flex-col gap-4"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

                  {/* Header: Name and Description */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Landmark size={14} className="text-amber-400 shrink-0" />
                      <h4 className="text-xs font-extrabold uppercase tracking-wider font-mono">
                        {selectedInvestor.name}
                      </h4>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium leading-normal">
                      {isEnglish ? selectedInvestor.desc : selectedInvestor.desc_vi}
                    </p>
                  </div>

                  {/* Asset Size (AUM) */}
                  <div className="relative z-10 bg-slate-900/60 border border-white/5 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                      {isEnglish ? "Asset Size (AUM)" : "Tài sản quản lý (AUM)"}
                    </span>
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {isEnglish ? selectedInvestor.aum : selectedInvestor.aum_vi}
                    </span>
                  </div>

                  {/* Portfolio Visualization */}
                  <div className="relative z-10 flex flex-col gap-2">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                      {isEnglish ? "Portfolio Visualization" : "Trực quan danh mục"}
                    </span>
                    
                    <div className="p-3 bg-slate-950/80 rounded-xl border border-white/5 relative flex flex-col items-center justify-center h-[200px] overflow-hidden">
                      {/* Selected Investor Node */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold shadow-md flex items-center gap-1.5">
                        <Landmark size={11} />
                        {selectedInvestor.name}
                      </div>

                      {/* Connection Flow Lines (SVG) */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 200">
                        {selectedInvestor.companies.map((company, idx) => {
                          const n = selectedInvestor.companies.length;
                          const x = n > 1 ? 30 + (idx * 340) / (n - 1) : 200;
                          const pathId = `dynamic-path-${idx}`;
                          return (
                            <g key={idx}>
                              <path
                                id={pathId}
                                d={`M 200 35 L ${x} 160`}
                                stroke="rgba(251,191,36,0.18)"
                                strokeWidth="1.5"
                                fill="none"
                              />
                              <circle r="2" fill="#fbbf24">
                                <animateMotion dur={`${2 + idx * 0.25}s`} repeatCount="indefinite">
                                  <mpath href={`#${pathId}`} />
                                </animateMotion>
                              </circle>
                            </g>
                          );
                        })}
                      </svg>

                      {/* Connected Companies Row */}
                      <div className="absolute inset-x-0 bottom-4 h-8 pointer-events-none">
                        {selectedInvestor.companies.map((company, idx) => {
                          const n = selectedInvestor.companies.length;
                          const x = n > 1 ? 30 + (idx * 340) / (n - 1) : 200;
                          const percentLeft = (x / 400) * 100;
                          return (
                            <div
                              key={idx}
                              style={{ left: `${percentLeft}%` }}
                              className={`absolute -translate-x-1/2 bottom-0 px-1.5 py-0.5 rounded border text-[8px] font-bold tracking-tight whitespace-nowrap pointer-events-auto transition-all duration-300 ${
                                company === brand.name || (brand.name === 'PepsiCo' && company === 'PepsiCo') || (brand.name === 'Coca-Cola' && company === 'Coca-Cola')
                                  ? 'border-indigo-500/40 bg-indigo-950/45 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]'
                                  : 'border-white/5 bg-slate-900/80 text-gray-400'
                              }`}
                            >
                              {company}
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  </div>

                  {/* Educational Explanation */}
                  <div className="relative z-10 border-t border-white/5 pt-3">
                    <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                      {isEnglish ? "Educational Analysis" : "Phân tích vai trò"}
                    </span>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {isEnglish ? selectedInvestor.detail : selectedInvestor.detail_vi}
                    </p>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

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
