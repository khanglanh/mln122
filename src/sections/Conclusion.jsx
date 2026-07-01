import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, RotateCcw, Home, Award } from 'lucide-react';

export default function Conclusion({ onReset, isEnglish }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="min-h-screen py-20 px-4 md:px-8 bg-[#0B1020] relative flex flex-col justify-center items-center border-t border-white/5 overflow-hidden">
      
      {/* Decorative background lights */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl glow-bg pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl glow-bg pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl w-full text-center relative z-10 glass-panel rounded-3xl p-8 md:p-12 border border-white/10"
      >
        {/* Award/Badge Icon */}
        <motion.div 
          variants={itemVariants}
          className="mx-auto w-16 h-16 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-slate-950 mb-6 shadow-lg shadow-amber-500/10"
        >
          <Award size={32} />
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-300"
        >
          {isEnglish ? "INVESTIGATION COMPLETE" : "HOÀN THÀNH CUỘC ĐIỀU TRA"}
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-gray-400 text-sm md:text-base font-light mb-8"
        >
          {isEnglish 
            ? "You have analyzed the cycle of value distribution under modern global capitalism."
            : "Bạn đã phân tích toàn bộ chu kỳ phân phối giá trị thặng dư dưới chủ nghĩa tư bản toàn cầu hiện đại."}
        </motion.p>

        {/* Learnings list */}
        <motion.div 
          variants={itemVariants}
          className="text-left space-y-4 max-w-xl mx-auto mb-10 bg-slate-950/40 p-6 rounded-2xl border border-white/5"
        >
          <h3 className="text-xs uppercase font-extrabold text-amber-400 tracking-wider mb-2">
            {isEnglish ? "Key Learnings Summary" : "Tóm tắt các phát hiện chính"}
          </h3>

          <ul className="space-y-3 text-xs md:text-sm text-gray-300 leading-relaxed">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <span>
                {isEnglish
                  ? "Consumer spending supports many participants in the economy, from local store clerks to global logistics teams."
                  : "Chi tiêu của người tiêu dùng hỗ trợ nhiều chủ thể trong nền kinh tế, từ nhân viên cửa hàng địa phương đến các chuỗi logistics toàn cầu."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
              <span>
                {isEnglish
                  ? "A substantial portion of corporate surplus values/profits is distributed upward to institutional shareholders."
                  : "Một phần đáng kể giá trị thặng dư/lợi nhuận doanh nghiệp được phân phối ngược lên trên cho các cổ đông tổ chức."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <span>
                {isEnglish
                  ? "Large institutional investors often hold significant shares in multiple competing companies, creating interlocking control systems."
                  : "Các quỹ đầu tư lớn thường đồng thời sở hữu cổ phần khống chế ở nhiều công ty cạnh tranh nhau, hình thành hệ thống kiểm soát chéo."}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {isEnglish
                  ? "Financial capital plays an increasingly autonomous role, potentially decoupling from productive manufacturing."
                  : "Tư bản tài chính ngày càng đóng vai trò tự vận động độc lập, có thể tách rời và lấn át năng lực sản xuất thực tế."}
              </span>
            </li>
          </ul>
        </motion.div>

        {/* Academic conclusion footnote */}
        <motion.p 
          variants={itemVariants}
          className="text-xs text-gray-500 italic max-w-lg mx-auto leading-relaxed mb-10"
        >
          {isEnglish 
            ? "This interactive showcase illustrates core mechanisms of capital concentration, financial networks, and the rise of interest-bearing capital analyzed in Marxist Political Economy."
            : "Ứng dụng tương tác này minh họa cơ chế tích tụ tư bản, mạng lưới tài chính và sự trỗi dậy của tư bản cho vay trong lý thuyết Kinh tế chính trị Mác–Lênin."}
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <button
            onClick={onReset}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <RotateCcw size={14} />
            <span>{isEnglish ? "Restart Investigation" : "Khởi động lại cuộc điều tra"}</span>
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <Home size={14} />
            <span>{isEnglish ? "Back to Home" : "Quay lại Trang chủ"}</span>
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}
