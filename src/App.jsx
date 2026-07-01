import React, { useState, useRef } from 'react';
import Hero from './sections/Hero';
import Act1 from './sections/Act1';
import Act2 from './sections/Act2';
import Act3 from './sections/Act3';
import Act4 from './sections/Act4';
import Conclusion from './sections/Conclusion';
import { Globe, BookOpen } from 'lucide-react';
import logo from './assets/logo.png';

function App() {
  const [isEnglish, setIsEnglish] = useState(true);
  
  const heroRef = useRef(null);
  const act1Ref = useRef(null);
  const act2Ref = useRef(null);
  const act3Ref = useRef(null);
  const act4Ref = useRef(null);
  const conclusionRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetAll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0B1020] text-gray-100 selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Premium Header HUD */}
      <header className="fixed top-0 left-0 right-0 h-12 glass-panel border-b border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={resetAll}>
          <img src={logo} className="w-6 h-6 object-contain rounded-lg" alt="Logo" />
          <span className="font-extrabold text-sm tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            The Puppet Masters
          </span>
        </div>

        {/* HUD Quick Navigation indicators */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-gray-400">
          <button onClick={() => scrollToRef(act1Ref)} className="hover:text-purple-400 transition-colors cursor-pointer">
            {isEnglish ? "Act 1: Money Flow" : "Hồi 1: Theo dấu dòng tiền"}
          </button>
          <button onClick={() => scrollToRef(act2Ref)} className="hover:text-purple-400 transition-colors cursor-pointer">
            {isEnglish ? "Act 2: Ownership" : "Hồi 2: Ai là ông chủ thật sự"}
          </button>
          <button onClick={() => scrollToRef(act3Ref)} className="hover:text-purple-400 transition-colors cursor-pointer">
            {isEnglish ? "Act 3: Real vs Financial" : "Hồi 3: Tại sao lợi nhuận chảy về tài chính?"}
          </button>
          <button onClick={() => scrollToRef(act4Ref)} className="hover:text-purple-400 transition-colors cursor-pointer">
            {isEnglish ? "Act 4: Simulator" : "Hồi 4: Điều gì xảy ra khi tài chính phát triển quá mức?"}
          </button>
          <button onClick={() => scrollToRef(conclusionRef)} className="hover:text-purple-400 transition-colors cursor-pointer">
            {isEnglish ? "Conclusion" : "Kết luận"}
          </button>
        </nav>

        {/* Controls: Language and Quick Start */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEnglish(!isEnglish)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold text-gray-300 transition-colors cursor-pointer"
          >
            <Globe size={14} className="text-blue-400" />
            <span>{isEnglish ? "VI" : "EN"}</span>
          </button>
          
          <button 
            onClick={() => scrollToRef(act1Ref)}
            className="hidden sm:flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
          >
            <BookOpen size={13} />
            <span>{isEnglish ? "Investigate" : "Điều tra"}</span>
          </button>
        </div>
      </header>

      {/* Sections Scroll Container */}
      <main className="w-full">
        <div ref={heroRef}>
          <Hero onStartClick={() => scrollToRef(act1Ref)} isEnglish={isEnglish} />
        </div>
        <div ref={act1Ref}>
          <Act1 isEnglish={isEnglish} onContinue={() => scrollToRef(act2Ref)} />
        </div>
        <div ref={act2Ref}>
          <Act2 isEnglish={isEnglish} />
        </div>
        <div ref={act3Ref}>
          <Act3 isEnglish={isEnglish} />
        </div>
        <div ref={act4Ref}>
          <Act4 isEnglish={isEnglish} />
        </div>
        <div ref={conclusionRef}>
          <Conclusion onReset={resetAll} isEnglish={isEnglish} />
        </div>
      </main>

      {/* Cinematic bottom copyright */}
      <footer className="py-8 bg-[#090D1A] border-t border-white/5 text-center text-[10px] text-gray-600 font-mono">
        <p>© 2026 The Puppet Masters Project. Built for Marxist Political Economy Coursework. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
