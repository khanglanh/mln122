import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory,
  Users,
  ShoppingBag,
  ArrowDown,
  ChevronDown,
  HelpCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import CanvasParticles from '../components/CanvasParticles';
import cocaImg from '../assets/coca.png';

const scenes = {
  en: [
    {
      text: "", // Stage 0 is the elegant title screen
      visual: "title"
    },
    {
      text: "You bought one can of Coca-Cola.",
      visual: "coke_coin"
    },
    {
      text: "Where does your money actually go?",
      visual: "coin_splitting"
    },
    {
      text: "You probably think... It pays the factory.",
      visual: "factory"
    },
    {
      text: "It pays the workers.",
      visual: "workers"
    },
    {
      text: "It pays the supermarket.",
      visual: "supermarket"
    },
    {
      text: "But is that really the whole story?",
      visual: "darken"
    },
    {
      text: "What if... The largest share of the profits never stops there?",
      visual: "network_forming"
    },
    {
      text: "You see Coca-Cola. You see Pepsi. Both look disconnected.",
      visual: "two_brands"
    },
    {
      text: "But what if... They share the same largest shareholders?",
      visual: "connect_brands"
    },
    {
      text: "", // Stage 10 is Final Hero
      visual: "final_hero"
    }
  ],
  vi: [
    {
      text: "",
      visual: "title"
    },
    {
      text: "Bạn đã mua một lon Coca-Cola.",
      visual: "coke_coin"
    },
    {
      text: "Số tiền đó thực sự đi về đâu?",
      visual: "coin_splitting"
    },
    {
      text: "Bạn có thể nghĩ... Nó dùng để chi trả cho nhà máy.",
      visual: "factory"
    },
    {
      text: "Nó dùng để trả lương cho công nhân.",
      visual: "workers"
    },
    {
      text: "Nó dùng để thanh toán cho siêu thị.",
      visual: "supermarket"
    },
    {
      text: "Nhưng liệu đó có phải là toàn bộ câu chuyện?",
      visual: "darken"
    },
    {
      text: "Điều gì sẽ xảy ra nếu... Phần lớn nhất của lợi nhuận không bao giờ dừng lại ở đó?",
      visual: "network_forming"
    },
    {
      text: "Bạn thấy Coca-Cola. Bạn thấy Pepsi. Cả hai có vẻ không liên quan gì nhau.",
      visual: "two_brands"
    },
    {
      text: "Nhưng điều gì sẽ xảy ra nếu... Họ chia sẻ chung những cổ đông lớn nhất?",
      visual: "connect_brands"
    },
    {
      text: "",
      visual: "final_hero"
    }
  ]
};

export default function Hero({ onStartClick, isEnglish }) {
  const containerRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle mouse movement for subtle parallax
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 12; // -6px to +6px
    const y = (clientY / window.innerHeight - 0.5) * 12; // -6px to +6px
    setMousePos({ x, y });
  };

  // Listen to scrolling to determine active stage
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalHeight = rect.height - viewportHeight;
      if (totalHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));
      const totalStages = 11;
      const stage = Math.min(totalStages - 1, Math.floor(progress * totalStages));
      setActiveStage(stage);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial run

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const langKey = isEnglish ? 'en' : 'vi';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[880vh] bg-[#0B1020] overflow-visible"
    >
      {/* Sticky Frame representing 100vh of viewing space */}
      <section
        onMouseMove={handleMouseMove}
        className={`sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center px-4 md:px-8 py-16 transition-colors duration-1000 z-10 ${activeStage >= 6 ? 'bg-[#05070F]' : 'bg-[#0B1020]'
          }`}
      >
        {/* Dynamic Background Glows */}
        <div
          className="absolute top-1/4 left-1/4 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-indigo-900/10 rounded-full blur-[100px] transition-opacity duration-1000"
          style={{
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            opacity: activeStage >= 6 ? 0.05 : 0.2
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-purple-900/10 rounded-full blur-[100px] transition-opacity duration-1000"
          style={{
            transform: `translate3d(${-mousePos.x}px, ${-mousePos.y}px, 0)`,
            opacity: activeStage >= 6 ? 0.05 : 0.2
          }}
        />

        {/* Ambient Particle Layer */}
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)` }}
        >
          <CanvasParticles stage={activeStage} />
        </div>

        {/* Cinematic Title Layer (Stage 0) */}
        {activeStage === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto h-[70vh] z-10"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.12em] uppercase leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-amber-200 select-none text-center font-mono">
              {isEnglish ? "THE PUPPET" : "NHỮNG KẺ"}
              <br />
              {isEnglish ? "MASTERS" : "GIẬT DÂY"}
            </h1>
            <p className="mt-8 text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase animate-pulse">
              {isEnglish ? "Scroll to begin" : "Cuộn để bắt đầu"}
            </p>
          </motion.div>
        )}

        {/* Narrative & Interactive Visual Canvas (Stages 1-9) */}
        {activeStage > 0 && activeStage < 10 && (
          <div className="flex-grow w-full max-w-4xl flex flex-col justify-center items-center relative z-10 mt-12">

            {/* Visual Screen Container (45vh height) */}
            <div className="relative w-full h-[45vh] flex items-center justify-center overflow-visible">
              <AnimatePresence mode="wait">

                {/* Stage 1: Coke Can and Coin Drop */}
                {activeStage === 1 && (
                  <motion.div
                    key="stage1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <motion.div
                      initial={{ y: -160, opacity: 0, rotate: 0 }}
                      animate={{ y: -45, opacity: 1, rotate: 360 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center justify-center text-amber-950 font-bold text-lg z-20"
                    >
                      $
                    </motion.div>

                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={cocaImg}
                      className="h-28 object-contain filter drop-shadow-[0_10px_15px_rgba(239,68,68,0.2)] mt-2"
                      alt="Coca-Cola"
                    />
                  </motion.div>
                )}

                {/* Stage 2: Coin Splitting */}
                {activeStage === 2 && (
                  <motion.div
                    key="stage2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="relative flex items-center justify-center">
                      <svg className="absolute w-[300px] h-[300px] pointer-events-none overflow-visible">
                        {[
                          "M 150 150 L 50 60",
                          "M 150 150 L 250 60",
                          "M 150 150 L 50 240",
                          "M 150 150 L 250 240",
                          "M 150 150 L 150 30",
                        ].map((pathD, idx) => (
                          <motion.path
                            key={idx}
                            d={pathD}
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            animate={{ strokeDashoffset: [0, -32] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          />
                        ))}
                      </svg>

                      <div className="w-10 h-10 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-300 shadow-[0_0_35px_rgba(251,191,36,0.8)] flex items-center justify-center text-amber-950 font-bold text-lg z-20 animate-ping" />
                      <div className="absolute w-10 h-10 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 border border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center justify-center text-amber-950 font-bold text-lg z-20">
                        $
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Stage 3: Factory Card */}
                {activeStage === 3 && (
                  <motion.div
                    key="stage3"
                    initial={{ scale: 0.8, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ scale: 0.8, opacity: 0, filter: 'blur(8px)' }}
                    className="glass-panel rounded-2xl p-6 flex flex-col items-center gap-4 border border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.1)]"
                  >
                    <div className="p-3 bg-purple-500/10 rounded-full text-purple-400 border border-purple-500/20 shadow-[0_0_12px_rgba(168,85,247,0.25)]">
                      <Factory size={36} />
                    </div>
                    <span className="font-bold text-base uppercase tracking-wider text-purple-200">
                      {isEnglish ? "The Factory" : "Nhà máy Sản xuất"}
                    </span>
                  </motion.div>
                )}

                {/* Stage 4: Workers Card */}
                {activeStage === 4 && (
                  <motion.div
                    key="stage4"
                    initial={{ scale: 0.8, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ scale: 0.8, opacity: 0, filter: 'blur(8px)' }}
                    className="glass-panel rounded-2xl p-6 flex flex-col items-center gap-4 border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.1)]"
                  >
                    <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 border border-blue-500/20 shadow-[0_0_12px_rgba(59,130,246,0.25)]">
                      <Users size={36} />
                    </div>
                    <span className="font-bold text-base uppercase tracking-wider text-blue-200">
                      {isEnglish ? "The Workers" : "Người lao động"}
                    </span>
                  </motion.div>
                )}

                {/* Stage 5: Supermarket Card */}
                {activeStage === 5 && (
                  <motion.div
                    key="stage5"
                    initial={{ scale: 0.8, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ scale: 0.8, opacity: 0, filter: 'blur(8px)' }}
                    className="glass-panel rounded-2xl p-6 flex flex-col items-center gap-4 border border-amber-500/20 shadow-[0_0_25px_rgba(251,191,36,0.1)]"
                  >
                    <div className="p-3 bg-amber-500/10 rounded-full text-amber-400 border border-amber-500/20 shadow-[0_0_12px_rgba(251,191,36,0.25)]">
                      <ShoppingBag size={36} />
                    </div>
                    <span className="font-bold text-base uppercase tracking-wider text-amber-200">
                      {isEnglish ? "The Supermarket" : "Siêu thị & Đại lý"}
                    </span>
                  </motion.div>
                )}

                {/* Stage 6: Dark transition background visual */}
                {activeStage === 6 && (
                  <motion.div
                    key="stage6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest animate-pulse"
                  >
                    <HelpCircle size={28} className="text-purple-500/70" />
                    <span>{isEnglish ? "Diverting path" : "Chuyển đổi lối đi"}</span>
                  </motion.div>
                )}

                {/* Stage 7: Financial network forming */}
                {activeStage === 7 && (
                  <motion.div
                    key="stage7"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
                      <svg className="absolute inset-0 w-full h-full overflow-visible">
                        <g stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1.2">
                          <line x1="140" y1="140" x2="80" y2="60" />
                          <line x1="140" y1="140" x2="200" y2="60" />
                          <line x1="140" y1="140" x2="50" y2="170" />
                          <line x1="140" y1="140" x2="230" y2="170" />
                          <line x1="140" y1="140" x2="140" y2="230" />

                          <line x1="80" y1="60" x2="200" y2="60" />
                          <line x1="50" y1="170" x2="80" y2="60" />
                          <line x1="230" y1="170" x2="200" y2="60" />
                        </g>
                      </svg>

                      <div className="w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/50 shadow-[0_0_20px_#a855f7] flex items-center justify-center animate-pulse">
                        <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                      </div>

                      {[
                        { top: '60px', left: '80px' },
                        { top: '60px', left: '200px' },
                        { top: '170px', left: '50px' },
                        { top: '170px', left: '230px' },
                        { top: '230px', left: '140px' },
                      ].map((pos, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.1, duration: 0.4 }}
                          style={{ top: pos.top, left: pos.left }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Stages 8, 9: Brand Graph & Mystery Connection */}
                {(activeStage === 8 || activeStage === 9) && (
                  <motion.div
                    key="ownership-reveal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full flex flex-col items-center justify-center"
                  >
                    <div className="relative w-full max-w-2xl h-[300px] flex items-center justify-center overflow-visible">

                      {/* SVG Canvas overlay with viewBox */}
                      <svg viewBox="0 0 800 400" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <defs>
                          <linearGradient id="g-line" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>

                        {/* Connection Lines from Mystery Hub in Stage 9 */}
                        {activeStage === 9 && (
                          <g>
                            {/* Central Mystery Hub (400, 95) -> Coca-Cola (200, 310) */}
                            <motion.line x1="400" y1="95" x2="200" y2="310" stroke="url(#g-line)" strokeWidth="2.5" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -32] }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }} />
                            {/* Central Mystery Hub (400, 95) -> PepsiCo (600, 310) */}
                            <motion.line x1="400" y1="95" x2="600" y2="310" stroke="url(#g-line)" strokeWidth="2.5" strokeDasharray="6 6" animate={{ strokeDashoffset: [0, -32] }} transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }} />
                          </g>
                        )}
                      </svg>

                      {/* Central Mystery Node (Stage 9) */}
                      {activeStage === 9 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                          className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-purple-950/50 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center text-purple-300 font-extrabold text-lg z-20 animate-pulse font-mono"
                        >
                          ?
                        </motion.div>
                      )}

                      {/* Company Cards (Stage 8, 9) */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-2 md:px-8 w-full z-20">
                        {/* Left Brand: Coca-Cola */}
                        <motion.div
                          initial={{ x: -40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="glass-panel border-red-500/20 bg-red-950/5 shadow-[0_0_20px_rgba(239,68,68,0.08)] rounded-xl px-4 md:px-6 py-2.5 md:py-3.5 text-red-200 font-bold text-xs md:text-sm flex items-center gap-2.5"
                        >
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_#ef4444]" />
                          Coca-Cola
                        </motion.div>

                        {/* Right Brand: Pepsi */}
                        <motion.div
                          initial={{ x: 40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="glass-panel border-blue-500/20 bg-blue-950/5 shadow-[0_0_20px_rgba(59,130,246,0.08)] rounded-xl px-4 md:px-6 py-2.5 md:py-3.5 text-blue-200 font-bold text-xs md:text-sm flex items-center gap-2.5"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_6px_#3b82f6]" />
                          PepsiCo
                        </motion.div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Narrative text block */}
            <div className="h-[12vh] min-h-[90px] w-full flex items-center justify-center text-center mt-6">
              <AnimatePresence mode="wait">
                {scenes[langKey][activeStage].text && (
                  <motion.p
                    key={`text-${activeStage}-${langKey}`}
                    initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="text-base md:text-xl font-light text-gray-300 tracking-wide max-w-xl leading-relaxed italic drop-shadow"
                  >
                    "{scenes[langKey][activeStage].text}"
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </div>
        )}

        {/* Final Hero Cinematic Reveal Card (Stage 10) */}
        {activeStage === 10 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto h-[70vh] z-10 text-center"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[0.12em] uppercase leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-amber-200 select-none font-mono">
              {isEnglish ? "THE PUPPET" : "NHỮNG KẺ"}
              <br />
              {isEnglish ? "MASTERS" : "GIẬT DÂY"}
            </h2>
            <p className="mt-4 text-xs md:text-sm text-purple-400 font-mono tracking-[0.25em] uppercase">
              {isEnglish ? "Follow the Money." : "Theo dấu Dòng tiền."}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.03, 1],
                boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.3)', '0 0 0px rgba(168,85,247,0)']
              }}
              transition={{
                opacity: { delay: 0.5, duration: 0.8 },
                y: { delay: 0.5, duration: 0.8 },
                scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              className="mt-12"
            >
              <button
                onClick={onStartClick}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600/90 via-indigo-600/90 to-purple-600/90 hover:from-blue-500 hover:to-purple-500 text-white text-xs md:text-sm font-bold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-all flex items-center gap-2 group cursor-pointer border border-white/10 backdrop-blur-sm"
              >
                <span>{isEnglish ? "Begin Investigation" : "Bắt đầu cuộc điều tra"}</span>
                <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform opacity-75" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Floating Side Dot Navigation (Progress Indicator) */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-30">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === activeStage
                ? 'bg-purple-500 scale-150 shadow-[0_0_8px_#a855f7]'
                : 'bg-white/15'
                }`}
            />
          ))}
        </div>

        {/* Bottom Scroll Indicator (Active for Stages 0 to 9) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-500 font-mono text-[9px] uppercase tracking-[0.2em] select-none pointer-events-none opacity-60">
          {activeStage < 10 ? (
            <>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="text-purple-400"
              >
                <ArrowDown size={12} />
              </motion.div>
              <span>{isEnglish ? "Scroll to investigate" : "Cuộn để điều tra"}</span>
            </>
          ) : (
            <span className="text-[8px] text-gray-600">{isEnglish ? "End of introduction" : "Hết phần mở đầu"}</span>
          )}
        </div>

      </section>
    </div>
  );
}
