import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, TrendingUp, ChevronRight, Scale, HelpCircle } from 'lucide-react';

export default function Act3({ isEnglish }) {
  const [activeCycle, setActiveCycle] = useState(0);

  // Auto cycling nodes in flow simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCycle((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const realSteps = [
    { label: "Money (G-Tư bản)", label_vi: "Tiền (T)" },
    { label: "Factory", label_vi: "Tư liệu sản xuất" },
    { label: "Workers (Labor)", label_vi: "Sức lao động" },
    { label: "Production (Hàng hóa)", label_vi: "Sản xuất hàng hóa" },
    { label: "Consumers", label_vi: "Tiêu dùng" },
    { label: "Profit (T' - Thặng dư)", label_vi: "Lợi nhuận thặng dư" }
  ];

  const financialSteps = [
    { label: "Money (Tư bản)", label_vi: "Tiền (T)" },
    { label: "Financial Assets", label_vi: "Tài sản tài chính" },
    { label: "Stocks / Bonds", label_vi: "Cổ phiếu / Trái phiếu" },
    { label: "Asset Appreciation", label_vi: "Đánh giá lại tài sản" },
    { label: "Market Speculation", label_vi: "Đầu cơ thị trường" },
    { label: "Returns (T' - Tư bản ảo)", label_vi: "Thu nhập tài chính (T')" }
  ];

  const tableData = [
    {
      criteria: "Capital Required",
      criteria_vi: "Vốn yêu cầu",
      real: "High (Factories, machines, land)",
      real_vi: "Lớn (Xây dựng nhà xưởng, máy móc, đất đai)",
      finance: "Flexible (Micro-shares, derivatives)",
      finance_vi: "Linh hoạt (Cổ phiếu lô lẻ, hợp đồng phái sinh)"
    },
    {
      criteria: "Time Cycle",
      criteria_vi: "Chu kỳ thời gian",
      real: "Long-term (Production scale up, logistics)",
      real_vi: "Dài hạn (Chu kỳ sản xuất, tiếp thị, khấu hao)",
      finance: "Short-term / Instant (Arbitrage, liquid trades)",
      finance_vi: "Ngắn hạn / Tức thời (Giao dịch tần số cao)"
    },
    {
      criteria: "Operating Risk",
      criteria_vi: "Rủi ro vận hành",
      real: "High (Supply chain, labor union, obsolescence)",
      real_vi: "Cao (Chuỗi cung ứng, lao động, hư hỏng vật chất)",
      finance: "Volatility Risk (Market trends, fast exit)",
      finance_vi: "Rủi ro biến động (Dễ dàng thoái vốn nhanh)"
    },
    {
      criteria: "Primary Source of Returns",
      criteria_vi: "Nguồn gốc lợi nhuận",
      real: "Surplus Value created by workers in factory",
      real_vi: "Giá trị thặng dư sinh ra từ lao động thực tế",
      finance: "Dividends, arbitrage, asset bubble growth",
      finance_vi: "Cổ tức, chênh lệch giá, thổi phồng bong bóng"
    },
    {
      criteria: "Relationship with Production",
      criteria_vi: "Mối quan hệ với SX",
      real: "Directly embedded (Creates actual items)",
      real_vi: "Nhúng trực tiếp (Tạo ra của cải vật chất)",
      finance: "Decoupled (Autonomous financial circulation)",
      finance_vi: "Tách rời (Tự tuần hoàn trong hệ thống tiền tệ)"
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 bg-[#0B1020] relative flex flex-col justify-center border-t border-white/5">
      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs uppercase font-semibold text-purple-400 tracking-widest bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20"
          >
            {isEnglish ? "Act 3: Real Economy vs Financial Economy" : "Hồi 3: Tại sao lợi nhuận chảy về tài chính?"}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold mt-4 mb-4"
          >
            {isEnglish ? "The Great Decoupling" : "Sự tách rời vĩ đại"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            {isEnglish 
              ? "Marxist Political Economy distinguishes between the real circulation of commodities and the autonomous rotation of interest-bearing capital (T - T')."
              : "Kinh tế chính trị Mác–Lênin phân biệt giữa lưu thông hàng hóa thực tế và sự tự vận động độc lập của tư bản cho vay lấy lãi (công thức T - T')."}
          </motion.p>
        </div>

        {/* Split Screen Flow Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Real Economy */}
          <div className="glass-panel rounded-2xl p-6 border-emerald-500/10 bg-emerald-950/5 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <Factory size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-400">{isEnglish ? "Real Productive Economy" : "Nền kinh tế thực / Sản xuất"}</h3>
                <p className="text-xs text-gray-500">{isEnglish ? "Accumulation through commodities (M - C - M')" : "Tích lũy qua sản xuất hàng hóa (T - H - T')"}</p>
              </div>
            </div>

            {/* Steps loop */}
            <div className="space-y-3">
              {realSteps.map((step, idx) => {
                const isActive = activeCycle === idx;
                return (
                  <motion.div 
                    key={idx}
                    animate={{ 
                      backgroundColor: isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(17, 24, 39, 0.4)',
                      borderColor: isActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                    className="p-3 rounded-xl border flex items-center justify-between transition-all"
                  >
                    <span className={`text-xs font-bold ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}>
                      {isEnglish ? step.label : step.label_vi}
                    </span>
                    {isActive && (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full animate-pulse uppercase">
                        {isEnglish ? "Active Value Creation" : "Đang tạo giá trị"}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Financial Economy */}
          <div className="glass-panel rounded-2xl p-6 border-purple-500/10 bg-purple-950/5 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl" />

            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-400">{isEnglish ? "Financial Economy" : "Nền kinh tế tài chính / Đầu cơ"}</h3>
                <p className="text-xs text-gray-500">{isEnglish ? "Accumulation through money alone (M - M')" : "Tích lũy thuần túy qua tiền tệ (T - T')"}</p>
              </div>
            </div>

            {/* Steps loop */}
            <div className="space-y-3">
              {financialSteps.map((step, idx) => {
                const isActive = activeCycle === idx;
                return (
                  <motion.div 
                    key={idx}
                    animate={{ 
                      backgroundColor: isActive ? 'rgba(168, 85, 247, 0.15)' : 'rgba(17, 24, 39, 0.4)',
                      borderColor: isActive ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.05)'
                    }}
                    className="p-3 rounded-xl border flex items-center justify-between transition-all"
                  >
                    <span className={`text-xs font-bold ${isActive ? 'text-purple-400' : 'text-gray-400'}`}>
                      {isEnglish ? step.label : step.label_vi}
                    </span>
                    {isActive && (
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 font-semibold px-2 py-0.5 rounded-full animate-pulse uppercase">
                        {isEnglish ? "Yield Rotation" : "Vòng xoay lãi suất"}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden mb-12">
          <div className="p-4 bg-slate-900/60 border-b border-white/10 flex items-center gap-2">
            <Scale size={18} className="text-amber-400" />
            <h3 className="text-sm font-bold text-gray-300">{isEnglish ? "Structural Comparison Matrix" : "Bảng so sánh cấu trúc"}</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-slate-950/20 text-xs font-bold text-gray-400 uppercase">
                  <th className="p-4">{isEnglish ? "Criteria" : "Tiêu chí"}</th>
                  <th className="p-4 text-emerald-400">{isEnglish ? "Real Productive Economy" : "Kinh tế sản xuất thực"}</th>
                  <th className="p-4 text-purple-400">{isEnglish ? "Financial Economy (Interest-bearing)" : "Kinh tế tài chính (Tư bản cho vay)"}</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-white/5">
                {tableData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-gray-300">{isEnglish ? row.criteria : row.criteria_vi}</td>
                    <td className="p-4 text-gray-400">{isEnglish ? row.real : row.real_vi}</td>
                    <td className="p-4 text-gray-400">{isEnglish ? row.finance : row.finance_vi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Visual Takeaway */}
        <div className="glass-panel rounded-xl p-5 border border-amber-500/10 bg-amber-500/5 text-center flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="text-left">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1">
              <HelpCircle size={16} />
              {isEnglish ? "What is Financialization?" : "Khái niệm Tài chính hóa là gì?"}
            </h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed max-w-3xl">
              {isEnglish 
                ? "Financialization represents a pattern of accumulation where profit making occurs increasingly through financial channels rather than through trade and commodity production. This can lead to speculation, financial bubbles, and economic crises when decoupled from real labor production."
                : "Tài chính hóa chỉ mô hình tích lũy tư bản mà lợi nhuận ngày càng được tìm kiếm thông qua các kênh tài chính ảo thay vì thương mại và sản xuất hàng hóa thực tế. Hệ quả là tạo ra bong bóng, kích thích đầu cơ và suy yếu năng lực sản xuất gốc."}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
