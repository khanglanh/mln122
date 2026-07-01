import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Store, Truck, Factory, TrendingUp, ChevronRight, Check } from 'lucide-react';
import moneyFlowData from '../data/money_flow.json';

export default function MoneyFlowAnimation({ brand, isEnglish }) {
  const [step, setStep] = useState(0); // 0: idle, 1: store, 2: distributor, 3: split/complete
  const [coins, setCoins] = useState([]);
  const [activeTab, setActiveTab] = useState('real'); // real vs profit tab

  // Trigger purchase
  const handleBuy = () => {
    setStep(1);
    setCoins(Array.from({ length: 6 }, (_, i) => ({ id: i, delay: i * 0.15 })));
  };

  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(timer);
    } else if (step === 2) {
      const timer = setTimeout(() => setStep(3), 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const resetFlow = () => {
    setStep(0);
    setCoins([]);
  };

  const steps = moneyFlowData.steps;

  // Render sub-items breakdown
  const renderBreakdown = (items) => {
    return (
      <div className="grid grid-cols-2 gap-2 mt-3">
        {items.map((item, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-white/5 rounded-lg p-2 text-xs flex justify-between items-center">
            <span className="text-gray-400">{isEnglish ? item.label : item.label_vi}</span>
            <span className="text-amber-400 font-semibold">+{item.amount.toLocaleString()}đ</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {step === 0 ? (
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel rounded-2xl p-8 max-w-md w-full border border-white/10 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
              {isEnglish ? "Interactive Simulation" : "Mô phỏng tương tác"}
            </span>
            <h3 className="text-2xl font-bold mb-2">
              {isEnglish ? `Buy a Can of ${brand.name}` : `Mua 1 lon ${brand.name}`}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {isEnglish 
                ? "Simulate a standard 10,000 VND consumer transaction to observe the flow of value through the economic cycle."
                : "Mô phỏng giao dịch tiêu dùng 10.000 Đ thông thường để quan sát dòng chảy giá trị qua chu kỳ kinh tế."}
            </p>
            
            <div className="bg-slate-900/60 rounded-xl p-4 mb-6 border border-white/5 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">{isEnglish ? "Standard Price" : "Giá bán lẻ"}</span>
              <span className="text-2xl font-black text-amber-400">10,000 VND</span>
            </div>

            <button
              onClick={handleBuy}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              <span>{isEnglish ? "Purchase and Track Money Flow" : "Mua & Theo Dõi Dòng Tiền"}</span>
            </button>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Visual Flow Panel */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 relative min-h-[500px] flex flex-col justify-between">
            <div className="absolute top-2 right-2 text-xs text-gray-500">
              {isEnglish ? "Flow Pipeline Visualization" : "Trực quan sơ đồ dòng chảy"}
            </div>

            {/* SVG Connection Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Dynamic Path lines drawing */}
              <line x1="20%" y1="20%" x2="50%" y2="20%" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round" />
              <line x1="50%" y1="20%" x2="80%" y2="20%" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round" />
              
              {step >= 1 && (
                <motion.line 
                  x1="20%" y1="25%" x2="50%" y2="25%" 
                  stroke="url(#flow-grad)" strokeWidth="4" 
                  initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5 }}
                />
              )}
              {step >= 2 && (
                <motion.line 
                  x1="50%" y1="25%" x2="80%" y2="25%" 
                  stroke="url(#flow-grad)" strokeWidth="4" 
                  initial={{ strokeDasharray: "1000", strokeDashoffset: "1000" }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </svg>

            {/* Nodes Container */}
            <div className="relative z-10 grid grid-cols-3 gap-4 items-center text-center mt-8">
              {/* Customer Node */}
              <motion.div 
                animate={{ scale: step === 1 ? 1.05 : 1 }}
                className={`p-4 rounded-xl flex flex-col items-center glass-panel ${step >= 1 ? 'border-blue-500/30' : ''}`}
              >
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 mb-2">
                  <ShoppingCart size={22} />
                </div>
                <div className="text-xs font-semibold text-gray-400">{isEnglish ? "1. Customer" : "1. Khách hàng"}</div>
                <div className="text-sm font-bold mt-1 text-blue-400">10,000 VND</div>
              </motion.div>

              {/* Convenience Store Node */}
              <motion.div 
                animate={{ scale: step === 2 ? 1.05 : 1 }}
                className={`p-4 rounded-xl flex flex-col items-center glass-panel ${step >= 2 ? 'border-purple-500/30' : ''}`}
              >
                <div className="w-12 h-12 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 mb-2">
                  <Store size={22} />
                </div>
                <div className="text-xs font-semibold text-gray-400">{isEnglish ? "2. Store" : "2. Cửa hàng"}</div>
                <div className="text-sm font-bold mt-1 text-purple-400">-3,000 VND</div>
              </motion.div>

              {/* Distributor Node */}
              <motion.div 
                animate={{ scale: step === 3 ? 1.05 : 1 }}
                className={`p-4 rounded-xl flex flex-col items-center glass-panel ${step >= 3 ? 'border-amber-500/30' : ''}`}
              >
                <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center text-amber-400 mb-2">
                  <Truck size={22} />
                </div>
                <div className="text-xs font-semibold text-gray-400">{isEnglish ? "3. Distributor" : "3. NPP"}</div>
                <div className="text-sm font-bold mt-1 text-amber-400">-2,000 VND</div>
              </motion.div>
            </div>

            {/* Split Screen showing Left/Right splits */}
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-8 relative z-10"
              >
                <div className="text-center mb-4">
                  <span className="text-xs uppercase font-semibold text-amber-500 tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {isEnglish ? "Remaining 5,000 VND splits" : "5.000 Đ còn lại được chia đôi"}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Real Economy split */}
                  <div className={`p-4 rounded-xl border transition-all ${activeTab === 'real' ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-white/5 bg-slate-900/25'} cursor-pointer`} onClick={() => setActiveTab('real')}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                        <Factory size={18} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-emerald-400">{isEnglish ? "Real Economy" : "Kinh tế thực"}</h4>
                        <p className="text-[10px] text-gray-500">3,000 VND (30%)</p>
                      </div>
                    </div>
                  </div>

                  {/* Corporate Profit split */}
                  <div className={`p-4 rounded-xl border transition-all ${activeTab === 'profit' ? 'border-amber-500/40 bg-amber-950/20' : 'border-white/5 bg-slate-900/25'} cursor-pointer`} onClick={() => setActiveTab('profit')}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                        <TrendingUp size={18} />
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-amber-400">{isEnglish ? "Corporate Profit" : "Lợi nhuận DN"}</h4>
                        <p className="text-[10px] text-gray-500">2,000 VND (20%)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-breakdown for selected split */}
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 glass-panel rounded-xl border-dashed border-white/10"
                >
                  {activeTab === 'real' ? (
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Factory size={16} />
                        {isEnglish ? "Direct Productive Costs" : "Chi phí sản xuất trực tiếp"}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {isEnglish 
                          ? "This share pays for manufacturing, raw materials, shipping cartons, and physical worker wages." 
                          : "Phần này chi trả trực tiếp cho công xưởng chế tạo, nguyên liệu thô, vỏ hộp và tiền lương của công nhân sản xuất."}
                      </p>
                      {renderBreakdown(steps.find(s => s.id === 'real_economy').breakdown)}
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-1.5">
                        <TrendingUp size={16} />
                        {isEnglish ? "Corporate Allocation & Institutional Shares" : "Phân phối lợi nhuận & Cổ đông tổ chức"}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {isEnglish
                          ? "This representing surplus value/profits, which flows to large institutional asset managers."
                          : "Khoản thặng dư ròng này chảy ngược lại vào thị trường tài chính thông qua cổ tức và phân phối cho các cổ đông tổ chức."}
                      </p>
                      
                      <div className="mt-3 space-y-2">
                        <div className="text-xs text-gray-400 font-semibold">{isEnglish ? "Held primarily by:" : "Được sở hữu lớn bởi:"}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="p-2 bg-slate-900 border border-white/5 rounded text-center">
                            <span className="text-xs font-bold text-gray-300">Vanguard</span>
                          </div>
                          <div className="p-2 bg-slate-900 border border-white/5 rounded text-center">
                            <span className="text-xs font-bold text-gray-300">BlackRock</span>
                          </div>
                          <div className="p-2 bg-slate-900 border border-white/5 rounded text-center">
                            <span className="text-xs font-bold text-gray-300">State Street</span>
                          </div>
                        </div>
                        <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[11px] text-amber-300 leading-relaxed">
                          {isEnglish 
                            ? "Insight: Although consumers can choose different brands, institutional investors hold massive stakes in both competitors simultaneously."
                            : "Ghi chú học thuật: Dù người tiêu dùng có quyền chọn nhãn hàng khác nhau, các quỹ đầu tư tổ chức thường đồng thời nắm giữ cổ phần lớn ở cả hai đối thủ."}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}

            {/* Control Bar */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 z-10">
              <span className="text-xs text-gray-500">
                {isEnglish ? "Value Tracker" : "Trình theo dõi giá trị"}
              </span>
              <button 
                onClick={resetFlow}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-medium text-xs rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                {isEnglish ? "Reset Flow" : "Đặt lại dòng tiền"}
              </button>
            </div>
          </div>

          {/* Explanation / Narrative Sidebar */}
          <div className="glass-panel rounded-2xl p-6 border border-white/10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {isEnglish ? "Tracking Process" : "Tiến trình điều tra"}
              </h3>
              
              <div className="space-y-4">
                {steps.map((s, index) => {
                  // Determine if step is active or completed
                  const isActive = (index === 0 && step >= 1) || (index === 1 && step >= 2) || (index === 2 && step >= 3);
                  const isPast = (index === 0 && step > 1) || (index === 1 && step > 2);
                  
                  if (s.id === 'real_economy' || s.id === 'corporate_profit') return null; // handled separately

                  return (
                    <motion.div 
                      key={s.id}
                      animate={{ opacity: isActive || isPast ? 1 : 0.4 }}
                      className={`p-3 rounded-lg border text-left ${isActive ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-transparent border-white/5'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isPast ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-gray-400'}`}>
                          {isPast ? <Check size={12} /> : index + 1}
                        </div>
                        <h4 className="text-xs font-bold text-gray-200">
                          {isEnglish ? s.name : s.name_vi}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-400 pl-7 leading-relaxed">
                        {isEnglish ? s.details : s.details_vi}
                      </p>
                    </motion.div>
                  );
                })}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 rounded-lg border bg-amber-950/10 border-amber-500/20 text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">
                        4
                      </div>
                      <h4 className="text-xs font-bold text-amber-400">
                        {isEnglish ? "Capital Distribution" : "Phân phối thặng dư"}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-400 pl-7 leading-relaxed">
                      {isEnglish 
                        ? "The transaction demonstrates how 50% of the price is retained by intermediaries, 30% enters actual production, and 20% flows to equity markets."
                        : "Giao dịch này cho thấy 50% giá thành thuộc về trung gian phân phối, 30% đi vào sản xuất thực, và 20% tích lũy thành tư bản tài chính."}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <p className="text-[11px] text-gray-500 italic text-center">
                {isEnglish
                  ? "*Percentages modeled represent typical corporate breakdowns of beverage manufacturing networks."
                  : "*Tỷ lệ được mô phỏng dựa trên cấu trúc phân rã doanh thu tiêu biểu của ngành đồ uống đóng chai."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
