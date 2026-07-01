import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, Code, Cpu, Sparkles, Brain, Bot } from 'lucide-react';
import chatgptLogo from '../assets/chatgpt.jpg';
import antigravityLogo from '../assets/AntigravityLogo.jpg';

export default function AIUsageReport({ isEnglish }) {
  // SVG Google Gemini Logo
  const GeminiIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" fill="url(#gemini-grad)" />
    </svg>
  );

  // SVG GitHub Logo
  const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-slate-100 fill-current" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.07.069-.07 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
    </svg>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="ai-report" className="py-24 px-4 md:px-8 bg-[#0B1020] relative border-t border-white/5 overflow-hidden">
      {/* Decorative cyber grid/lights */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-purple-400"
          >
            {isEnglish ? "AI USAGE REPORT" : "BÁO CÁO SỬ DỤNG AI"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-xs md:text-sm leading-relaxed border-l-2 border-purple-500/40 pl-4 py-1 italic bg-purple-500/[0.02]"
          >
            {isEnglish
              ? "“Every content supported by AI was verified, edited, and perfected by students before being incorporated into the final product.”"
              : "“Mọi nội dung được AI hỗ trợ đều được sinh viên kiểm chứng, chỉnh sửa và hoàn thiện trước khi đưa vào sản phẩm cuối cùng.”"}
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-6 md:pl-12 ml-2 md:ml-8 border-l border-white/10 space-y-12">
          {/* Card 1: ChatGPT */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[#0B1020] shadow-[0_0_10px_rgba(16,185,129,0.5)] z-20" />
            <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-emerald-400 animate-ping opacity-75 z-10" />

            {/* Glass Card */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(16,185,129,0.06)] group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 border border-emerald-500/20">
                    <img src={chatgptLogo} className="w-full h-full object-cover" alt="ChatGPT Logo" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">ChatGPT</h3>
                    <p className="text-[10px] text-emerald-400/80 font-mono tracking-wider">OPENAI MODEL</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {isEnglish ? "AI ASSISTED" : "AI HỖ TRỢ"}
                  </span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* AI Support */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-emerald-400/80 flex items-center gap-1.5">
                    <Cpu size={14} />
                    {isEnglish ? "AI SUPPORT" : "AI HỖ TRỢ"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>
                        <strong>{isEnglish ? "Concept explanation:" : "Giải thích khái niệm:"}</strong> {isEnglish ? "Financial Capital, Financialization, T-H-T', T-T'" : "Tư bản tài chính, Financialization, T-H-T', T-T'"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested website structure & hierarchy" : "Gợi ý cấu trúc website & phân cấp"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested UI/UX features & flows" : "Gợi ý UI/UX và các luồng trải nghiệm"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{isEnglish ? "Generated initial React Components" : "Sinh React Component ban đầu"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested React Flow configuration" : "Gợi ý cấu hình React Flow"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested CSS styles & transitions" : "Gợi ý CSS và chuyển động"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{isEnglish ? "Assisted in code debugging" : "Hỗ trợ gỡ lỗi mã nguồn (debugging)"}</span>
                    </li>
                  </ul>
                </div>

                {/* Student Contribution */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-purple-400 flex items-center gap-1.5">
                    <Check size={14} />
                    {isEnglish ? "STUDENT CONTRIBUTION" : "SINH VIÊN THỰC HIỆN"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span className="text-white font-medium">{isEnglish ? "Verified all theories against official curriculum textbook" : "Kiểm chứng lại toàn bộ lý thuyết theo giáo trình học tập"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Redesigned entire website user flow & storytelling structure" : "Thiết kế lại toàn bộ luồng trang web & cấu trúc kể chuyện"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Rewrote React state, hook & conditional logic" : "Viết lại logic React, quản lý state và các hook điều kiện"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Refined & edited all custom source code" : "Chỉnh sửa, tối ưu hóa toàn bộ source code"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Designed the custom ownership network graph" : "Thiết kế biểu đồ mạng lưới sở hữu (ownership graph)"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Designed customized animations & triggers" : "Thiết kế các chuyển động riêng biệt"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Polished and completed the final User Interface" : "Hoàn thiện, tối ưu hóa trải nghiệm giao diện người dùng"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <span className="text-[10px] text-gray-500 font-mono italic">
                  {isEnglish ? "*“AI Assisted” — NOT “AI Generated”" : "*“AI hỗ trợ” — không phải “AI tạo ra”"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Google Gemini */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0B1020] shadow-[0_0_10px_rgba(59,130,246,0.5)] z-20" />
            <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-purple-500 animate-ping opacity-75 z-10" />

            {/* Glass Card */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(59,130,246,0.06)] group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <GeminiIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-colors">Google Gemini</h3>
                    <p className="text-[10px] text-blue-400/80 font-mono tracking-wider">MULTIMODAL ENGINE</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {isEnglish ? "AI ASSISTED" : "AI HỖ TRỢ"}
                  </span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* AI Support */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-blue-400 flex items-center gap-1.5">
                    <Cpu size={14} />
                    {isEnglish ? "AI SUPPORT" : "AI HỖ TRỢ"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested illustrations and interactive graphic concept ideas" : "Gợi ý các hình minh họa và ý tưởng đồ họa tương tác"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested infographic layouts & structural ideas" : "Gợi ý bố cục và cấu trúc biểu đồ trực quan (infographic)"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{isEnglish ? "Assisted in brainstorm structural page templates" : "Tìm kiếm ý tưởng bố cục tổng thể trang tài liệu"}</span>
                    </li>
                  </ul>
                </div>

                {/* Student Contribution */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-purple-400 flex items-center gap-1.5">
                    <Check size={14} />
                    {isEnglish ? "STUDENT CONTRIBUTION" : "SINH VIÊN THỰC HIỆN"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span className="text-white font-medium">{isEnglish ? "Verified all statistical figures and data points" : "Kiểm chứng toàn bộ các số liệu thống kê và dữ liệu lịch sử"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Redesigned and customized infographic vector styles" : "Thiết kế, vẽ lại toàn bộ infographic & cấu trúc vector"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Synchronized graphics with visual identity (The Puppet Masters)" : "Đồng bộ hóa hình ảnh với hệ thống nhận diện thương hiệu"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <span className="text-[10px] text-gray-500 font-mono italic">
                  {isEnglish ? "*“AI Assisted” — NOT “AI Generated”" : "*“AI hỗ trợ” — không phải “AI tạo ra”"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: GitHub Copilot */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-slate-300 border-4 border-[#0B1020] shadow-[0_0_10px_rgba(255,255,255,0.2)] z-20" />

            {/* Glass Card */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(255,255,255,0.03)] group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <GitHubIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white transition-colors">GitHub Copilot</h3>
                    <p className="text-[10px] text-gray-400 font-mono tracking-wider">CODING COMPANION</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md bg-white/5 text-gray-300 border border-white/10">
                    {isEnglish ? "AI ASSISTED" : "AI HỖ TRỢ"}
                  </span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* AI Support */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-gray-400 flex items-center gap-1.5">
                    <Cpu size={14} />
                    {isEnglish ? "AI SUPPORT" : "AI HỖ TRỢ"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested Javascript statements and function formats" : "Gợi ý cú pháp Javascript và cấu trúc khai báo hàm"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span>{isEnglish ? "Autocompleted common web variables and boilerplate" : "Tự động hoàn thiện (Auto Complete) các biến thông dụng"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span>{isEnglish ? "Accelerated repetitious utility structures code generation" : "Sinh các đoạn mã lặp lại, định dạng mảng dữ liệu"}</span>
                    </li>
                  </ul>
                </div>

                {/* Student Contribution */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-purple-400 flex items-center gap-1.5">
                    <Check size={14} />
                    {isEnglish ? "STUDENT CONTRIBUTION" : "SINH VIÊN THỰC HIỆN"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span className="text-white font-medium">{isEnglish ? "Designed the overall project architecture & file systems" : "Thiết kế toàn bộ kiến trúc & phân mục dự án"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Wrote core business logic, simulation formula calculations" : "Viết logic lõi, thiết lập công thức tính toán mô phỏng"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Tested app rendering & state synchronization loops" : "Kiểm thử kết xuất (rendering) và đồng bộ hóa trạng thái"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Refactored codebase to guarantee reusable modules" : "Tối ưu cấu trúc mã (refactoring) để đảm bảo mô-đun hóa"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Debugged reactive component rendering cycle issues" : "Tìm lỗi và gỡ lỗi (debugging) vòng đời React component"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <span className="text-[10px] text-gray-500 font-mono italic">
                  {isEnglish ? "*“AI Assisted” — NOT “AI Generated”" : "*“AI hỗ trợ” — không phải “AI tạo ra”"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Antigravity */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-purple-500 border-4 border-[#0B1020] shadow-[0_0_10px_rgba(168,85,247,0.5)] z-20" />
            <div className="absolute -left-[31px] md:-left-[55px] top-6 w-4 h-4 rounded-full bg-purple-400 animate-ping opacity-75 z-10" />

            {/* Glass Card */}
            <div className="glass-panel p-6 md:p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(168,85,247,0.08)] group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                    <img src={antigravityLogo} className="w-full h-full object-cover" alt="Antigravity Logo" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Antigravity</h3>
                    <p className="text-[10px] text-purple-400/80 font-mono tracking-wider">AI CODING ASSISTANT</p>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    {isEnglish ? "AI ASSISTED" : "AI HỖ TRỢ"}
                  </span>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* AI Support */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-purple-400 flex items-center gap-1.5">
                    <Cpu size={14} />
                    {isEnglish ? "AI SUPPORT" : "AI HỖ TRỢ"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested visually engaging interactive concepts for the site" : "Gợi ý các ý tưởng tương tác trực quan (concept) độc đáo cho website"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Brainstormed investigative narrative & documentary structure" : "Brainstorm cấu trúc kể chuyện mang màu sắc điều tra tài chính"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested navigation, scroll behavior, and interactive flows" : "Gợi ý các luồng chuyển tiếp, cuộn màn hình và phản hồi UI"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Proposed custom layout ideas for individual chapters" : "Đề xuất bố cục, khung sườn thiết kế chi tiết từng Hồi (Act)"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Suggested animation triggers, canvas ideas, and scene changes" : "Đề xuất ý tưởng diễn hoạt, chuyển cảnh mượt mà"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Assisted in sculpting the visual mystery investigation theme" : "Hỗ trợ xây dựng tuyến câu chuyện hình ảnh (visual narrative)"}</span>
                    </li>
                  </ul>
                </div>

                {/* Student Contribution */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-purple-400 flex items-center gap-1.5">
                    <Check size={14} />
                    {isEnglish ? "STUDENT CONTRIBUTION" : "SINH VIÊN THỰC HIỆN"}
                  </h4>
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-300">
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span className="text-white font-medium">{isEnglish ? "Selected and tailored ideas to align with official course guidelines" : "Chọn lọc, đối chiếu kỹ lưỡng các ý tưởng để đúng yêu cầu bài tập"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Adapted UI mockups to fit the dark 'The Puppet Masters' layout" : "Thiết kế giao diện theo 'The Puppet Masters'"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Modified user pathways to reflect a true cyber investigation journey" : "Điều chỉnh UX sao cho sát thực tế trải nghiệm của người điều tra"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Implemented the code natively via React, Tailwind and Framer Motion" : "Trực tiếp lập trình hệ thống bằng React + Tailwind + Framer Motion"}</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span>{isEnglish ? "Handcrafted customized animations, timeline charts, and slider calculations" : "Tự tay phát triển các hiệu ứng đặc biệt và tính toán tương tác"}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
                <span className="text-[10px] text-gray-500 font-mono italic">
                  {isEnglish ? "*“AI Assisted” — NOT “AI Generated”" : "*“AI hỗ trợ” — không phải “AI tạo ra”"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Summary Card at end of timeline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto glass-panel border border-purple-500/30 p-6 md:p-8 rounded-3xl relative overflow-hidden group shadow-[0_0_40px_rgba(168,85,247,0.05)]"
        >
          {/* Subtle light pulse background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

          <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
            <div className="p-4 bg-purple-500/20 rounded-full border border-purple-500/40 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
              <ShieldCheck size={40} className="animate-pulse" />
            </div>

            <div className="space-y-3 text-center md:text-left flex-1">
              <h3 className="text-lg md:text-xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
                {isEnglish ? "AI is only a supportive instrument" : "AI là công cụ hỗ trợ"}
              </h3>

              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                {isEnglish
                  ? "All AI services only acted as supportive instruments in research, concept discovery, and development. Students are fully accountable for:"
                  : "Toàn bộ AI chỉ đóng vai trò hỗ trợ trong quá trình nghiên cứu, lên ý tưởng và phát triển. Sinh viên chịu trách nhiệm:"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 text-left">
                {[
                  isEnglish ? "Verifying academic theory" : "Kiểm chứng kiến thức",
                  isEnglish ? "Designing UI/UX assets" : "Thiết kế UI/UX",
                  isEnglish ? "Writing application logic" : "Viết logic chương trình",
                  isEnglish ? "Modifying & writing code" : "Chỉnh sửa source code",
                  isEnglish ? "Polishing final presentation" : "Hoàn thiện sản phẩm cuối cùng"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-purple-400 text-base font-bold leading-none">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Footer Quote & Human Verified Badge */}
        <div className="text-center mt-20 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-gray-400 font-serif italic text-base md:text-lg leading-relaxed relative px-8">
              <span className="absolute left-0 top-0 text-4xl text-purple-500/20 font-serif">“</span>
              {isEnglish
                ? "AI accelerates the creative process. But responsibility for content, design, and accuracy always rests with the human creator."
                : "AI giúp tăng tốc quá trình sáng tạo. Nhưng trách nhiệm về nội dung, thiết kế và tính chính xác luôn thuộc về người thực hiện."}
              <span className="absolute right-0 bottom-0 text-4xl text-purple-500/20 font-serif">”</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold font-mono tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.05)]"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            HUMAN VERIFIED ✓
          </motion.div>
        </div>

      </div>
    </section>
  );
}
